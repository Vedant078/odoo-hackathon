from datetime import datetime, date
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database import get_session
from app.models import Trip, Vehicle, Driver, MaintenanceLog, TripStatus, VehicleStatus, DriverStatus, MaintenanceStatus, TripUpdate
from app.auth import RoleGuard

router = APIRouter(tags=["Operations Workspaces"])

@router.post("/trips", dependencies=[Depends(RoleGuard(["Fleet Manager", "Dispatcher"]))])
def create_trip(trip: Trip, db: Session = Depends(get_session)):
    # Verify vehicle exists
    vehicle = db.get(Vehicle, trip.vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Vehicle with ID {trip.vehicle_id} not found.")

    # Verify driver exists
    driver = db.get(Driver, trip.driver_id)
    if not driver:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Driver with ID {trip.driver_id} not found.")

    # CSAT validation if provided
    if trip.csat_score is not None and not (1.0 <= trip.csat_score <= 5.0):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="CSAT Score must be between 1.0 and 5.0")

    # General input validations
    if trip.planned_distance <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Planned distance must be greater than zero.")
    if trip.cargo_weight <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cargo weight must be greater than zero.")
    if trip.revenue < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Revenue cannot be negative.")

    db.add(trip)
    db.commit()
    db.refresh(trip)
    return trip

@router.post("/trips/{trip_id}/dispatch", dependencies=[Depends(RoleGuard(["Dispatcher", "Fleet Manager"]))])
def dispatch_trip(trip_id: int, db: Session = Depends(get_session)):
    trip = db.get(Trip, trip_id)
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip record absent.")
    
    if trip.status != TripStatus.DRAFT:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Only trips in Draft status can be dispatched. Current status is: {trip.status}"
        )
    
    vehicle = db.get(Vehicle, trip.vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Associated vehicle not found.")
        
    driver = db.get(Driver, trip.driver_id)
    if not driver:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Associated driver not found.")

    if trip.cargo_weight > vehicle.max_load_capacity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Cargo weight ({trip.cargo_weight} kg) violates maximum vehicle capacity ({vehicle.max_load_capacity} kg)."
        )
    if vehicle.status != VehicleStatus.AVAILABLE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Vehicle is not available. Current status: {vehicle.status}"
        )
    if driver.status != DriverStatus.AVAILABLE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Driver is not available. Current status: {driver.status}"
        )
    if driver.license_expiry < date.today():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Driver license has expired on {driver.license_expiry}."
        )

    trip.status = TripStatus.DISPATCHED
    trip.start_time = datetime.utcnow()
    vehicle.status = VehicleStatus.ON_TRIP
    driver.status = DriverStatus.ON_TRIP

    db.add(trip)
    db.add(vehicle)
    db.add(driver)
    db.commit()
    return {"status": "Dispatched Successfully"}

@router.post("/trips/{trip_id}/complete", dependencies=[Depends(RoleGuard(["Dispatcher", "Fleet Manager"]))])
def complete_trip(trip_id: int, csat_score: float, actual_distance: float, fuel_consumed: float, db: Session = Depends(get_session)):
    trip = db.get(Trip, trip_id)
    if not trip or trip.status != TripStatus.DISPATCHED:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Trip must be currently Dispatched to be completed.")
    
    if not (1.0 <= csat_score <= 5.0):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="CSAT Score must be between 1.0 and 5.0")
    if actual_distance < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Actual distance cannot be negative.")
    if fuel_consumed < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Fuel consumed cannot be negative.")

    vehicle = db.get(Vehicle, trip.vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Associated vehicle not found.")
        
    driver = db.get(Driver, trip.driver_id)
    if not driver:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Associated driver not found.")

    trip.status = TripStatus.COMPLETED
    trip.end_time = datetime.utcnow()
    trip.csat_score = csat_score
    trip.actual_distance = actual_distance
    trip.fuel_consumed = fuel_consumed
    
    vehicle.status = VehicleStatus.AVAILABLE
    vehicle.odometer += actual_distance
    driver.status = DriverStatus.AVAILABLE

    db.add(trip)
    db.add(vehicle)
    db.add(driver)
    db.commit()
    return {"status": "Trip Completed", "csat_score": csat_score}

@router.patch("/trips/{trip_id}", dependencies=[Depends(RoleGuard(["Fleet Manager", "Dispatcher"]))])
def update_trip(trip_id: int, trip_data: TripUpdate, db: Session = Depends(get_session)):
    db_trip = db.get(Trip, trip_id)
    if not db_trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found.")
        
    update_dict = trip_data.dict(exclude_unset=True)
    
    # Validate vehicle existence if updated
    if "vehicle_id" in update_dict:
        vehicle = db.get(Vehicle, update_dict["vehicle_id"])
        if not vehicle:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found.")
            
    # Validate driver existence if updated
    if "driver_id" in update_dict:
        driver = db.get(Driver, update_dict["driver_id"])
        if not driver:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Driver not found.")
            
    # CSAT validation if provided
    if "csat_score" in update_dict and update_dict["csat_score"] is not None:
        if not (1.0 <= update_dict["csat_score"] <= 5.0):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="CSAT Score must be between 1.0 and 5.0")
            
    # General input validations
    if "planned_distance" in update_dict and update_dict["planned_distance"] <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Planned distance must be greater than zero.")
    if "cargo_weight" in update_dict and update_dict["cargo_weight"] <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cargo weight must be greater than zero.")
    if "revenue" in update_dict and update_dict["revenue"] < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Revenue cannot be negative.")
    if "actual_distance" in update_dict and update_dict["actual_distance"] is not None and update_dict["actual_distance"] < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Actual distance cannot be negative.")
    if "fuel_consumed" in update_dict and update_dict["fuel_consumed"] is not None and update_dict["fuel_consumed"] < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Fuel consumed cannot be negative.")

    for key, value in update_dict.items():
        setattr(db_trip, key, value)
        
    db.add(db_trip)
    db.commit()
    db.refresh(db_trip)
    return db_trip

@router.post("/maintenance", dependencies=[Depends(RoleGuard(["Fleet Manager"]))])
def schedule_maintenance(log: MaintenanceLog, db: Session = Depends(get_session)):
    vehicle = db.get(Vehicle, log.vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle absent.")

    if vehicle.status == VehicleStatus.ON_TRIP:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Vehicle is currently on a trip and cannot be scheduled for maintenance."
        )
    if log.maintenance_cost < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Maintenance cost cannot be negative.")

    vehicle.status = VehicleStatus.IN_SHOP
    log.status = MaintenanceStatus.ACTIVE
    
    db.add(log)
    db.add(vehicle)
    db.commit()
    db.refresh(log)
    return log
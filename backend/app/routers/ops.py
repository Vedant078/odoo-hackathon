from datetime import datetime, date
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.database import get_session
from app.models import Trip, Vehicle, Driver, MaintenanceLog, TripStatus, VehicleStatus, DriverStatus, MaintenanceStatus
from app.auth import RoleGuard

router = APIRouter(tags=["Operations Workspaces"])

@router.post("/trips", dependencies=[Depends(RoleGuard(["Fleet Manager", "Dispatcher"]))])
def create_trip(trip: Trip, db: Session = Depends(get_session)):
    if trip.csat_score is not None and not (1.0 <= trip.csat_score <= 5.0):
        raise HTTPException(status_code=400, detail="CSAT Score must be between 1.0 and 5.0")
    db.add(trip)
    db.commit()
    db.refresh(trip)
    return trip

@router.post("/trips/{trip_id}/dispatch", dependencies=[Depends(RoleGuard(["Dispatcher", "Fleet Manager"]))])
def dispatch_trip(trip_id: int, db: Session = Depends(get_session)):
    trip = db.get(Trip, trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip record absent.")
    
    vehicle = db.get(Vehicle, trip.vehicle_id)
    driver = db.get(Driver, trip.driver_id)

    if trip.cargo_weight > vehicle.max_load_capacity:
        raise HTTPException(status_code=400, detail="Cargo weight violates maximum vehicle constraint.")
    if vehicle.status != VehicleStatus.AVAILABLE:
        raise HTTPException(status_code=400, detail="Vehicle is busy or undergoing repairs.")
    if driver.status != DriverStatus.AVAILABLE or driver.license_expiry < date.today():
        raise HTTPException(status_code=400, detail="Driver cannot be dispatched (Check status/license).")

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
        raise HTTPException(status_code=400, detail="Trip must be currently Dispatched to be completed.")
    
    if not (1.0 <= csat_score <= 5.0):
        raise HTTPException(status_code=400, detail="CSAT Score must be between 1.0 and 5.0")

    vehicle = db.get(Vehicle, trip.vehicle_id)
    driver = db.get(Driver, trip.driver_id)

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

@router.post("/maintenance", dependencies=[Depends(RoleGuard(["Fleet Manager"]))])
def schedule_maintenance(log: MaintenanceLog, db: Session = Depends(get_session)):
    vehicle = db.get(Vehicle, log.vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle absent.")

    vehicle.status = VehicleStatus.IN_SHOP
    log.status = MaintenanceStatus.ACTIVE
    
    db.add(log)
    db.add(vehicle)
    db.commit()
    db.refresh(log)
    return log
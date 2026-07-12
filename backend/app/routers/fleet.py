from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database import get_session
from app.models import Vehicle, Driver, VehicleUpdate, DriverUpdate
from app.auth import RoleGuard

router = APIRouter(prefix="/fleet", tags=["Fleet Sub-Module"])

@router.post("/vehicles", dependencies=[Depends(RoleGuard(["Fleet Manager"]))])
def add_vehicle(vehicle: Vehicle, db: Session = Depends(get_session)):
    # Check for duplicate registration number
    existing = db.exec(select(Vehicle).where(Vehicle.registration_number == vehicle.registration_number)).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Vehicle with this registration number already exists."
        )
    
    # Input validation
    if vehicle.max_load_capacity <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Max load capacity must be greater than zero.")
    if vehicle.odometer < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Odometer reading cannot be negative.")
    if vehicle.acquisition_cost < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Acquisition cost cannot be negative.")

    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return vehicle

@router.get("/vehicles")
def list_vehicles(db: Session = Depends(get_session)):
    return db.exec(select(Vehicle)).all()

@router.patch("/vehicles/{vehicle_id}", dependencies=[Depends(RoleGuard(["Fleet Manager"]))])
def update_vehicle(vehicle_id: int, vehicle_data: VehicleUpdate, db: Session = Depends(get_session)):
    db_vehicle = db.get(Vehicle, vehicle_id)
    if not db_vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found.")
    
    update_dict = vehicle_data.dict(exclude_unset=True)
    
    # Check duplicate registration number if updated
    if "registration_number" in update_dict and update_dict["registration_number"] != db_vehicle.registration_number:
        existing = db.exec(select(Vehicle).where(Vehicle.registration_number == update_dict["registration_number"])).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Vehicle with this registration number already exists.")
            
    # Validations
    if "max_load_capacity" in update_dict and update_dict["max_load_capacity"] <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Max load capacity must be greater than zero.")
    if "odometer" in update_dict and update_dict["odometer"] < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Odometer reading cannot be negative.")
    if "acquisition_cost" in update_dict and update_dict["acquisition_cost"] < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Acquisition cost cannot be negative.")
        
    for key, value in update_dict.items():
        setattr(db_vehicle, key, value)
        
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

@router.post("/drivers", dependencies=[Depends(RoleGuard(["Safety Officer", "Fleet Manager"]))])
def hire_driver(driver: Driver, db: Session = Depends(get_session)):
    # Check for duplicate license number
    existing = db.exec(select(Driver).where(Driver.license_number == driver.license_number)).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Driver with this license number already exists."
        )
    
    # Input validation
    if driver.safety_score < 0 or driver.safety_score > 100:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Safety score must be between 0 and 100.")

    db.add(driver)
    db.commit()
    db.refresh(driver)
    return driver

@router.get("/drivers")
def list_drivers(db: Session = Depends(get_session)):
    return db.exec(select(Driver)).all()

@router.patch("/drivers/{driver_id}", dependencies=[Depends(RoleGuard(["Safety Officer", "Fleet Manager"]))])
def update_driver(driver_id: int, driver_data: DriverUpdate, db: Session = Depends(get_session)):
    db_driver = db.get(Driver, driver_id)
    if not db_driver:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Driver not found.")
        
    update_dict = driver_data.dict(exclude_unset=True)
    
    # Check duplicate license number if updated
    if "license_number" in update_dict and update_dict["license_number"] != db_driver.license_number:
        existing = db.exec(select(Driver).where(Driver.license_number == update_dict["license_number"])).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Driver with this license number already exists.")
            
    # Validations
    if "safety_score" in update_dict and not (0 <= update_dict["safety_score"] <= 100):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Safety score must be between 0 and 100.")
        
    for key, value in update_dict.items():
        setattr(db_driver, key, value)
        
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    return db_driver
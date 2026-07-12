from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database import get_session
from app.models import Vehicle, Driver, User  # Added User import
from app.auth import RoleGuard

router = APIRouter(tags=["Fleet Sub-Module"])

# ==========================================
# VEHICLE ENDPOINTS
# ==========================================

@router.post("/vehicles", dependencies=[Depends(RoleGuard(["Fleet Manager"]))])
def add_vehicle(vehicle: Vehicle, db: Session = Depends(get_session)):
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return vehicle

@router.get("/vehicles")
def list_vehicles(db: Session = Depends(get_session)):
    return db.exec(select(Vehicle)).all()

@router.patch("/vehicles/{vehicle_id}", dependencies=[Depends(RoleGuard(["Fleet Manager"]))])
def update_vehicle(vehicle_id: int, vehicle_data: dict, db: Session = Depends(get_session)):
    vehicle = db.get(Vehicle, vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    # Dynamically unpack incoming dictionary fields
    for key, value in vehicle_data.items():
        if hasattr(vehicle, key):
            setattr(vehicle, key, value)
            
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return vehicle

@router.delete("/vehicles/{vehicle_id}", dependencies=[Depends(RoleGuard(["Fleet Manager"]))])
def delete_vehicle(vehicle_id: int, db: Session = Depends(get_session)):
    vehicle = db.get(Vehicle, vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    # Human Hack: Change status to "Retired" instead of wiping rows to preserve chart data!
    vehicle.status = VehicleStatus.RETIRED
    db.add(vehicle)
    db.commit()
    return {"message": "Vehicle successfully retired from active fleet", "id": vehicle_id}

@router.delete("/drivers/{driver_id}", dependencies=[Depends(RoleGuard(["Fleet Manager"]))])
def delete_driver(driver_id: int, db: Session = Depends(get_session)):
    driver = db.get(Driver, driver_id)
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    
    # Human Hack: Change status to "Suspended" or "Off Duty" to safeguard historical data
    driver.status = DriverStatus.SUSPENDED
    db.add(driver)
    db.commit()
    return {"message": "Driver status set to Suspended successfully", "id": driver_id}
# ==========================================
# DRIVER ENDPOINTS
# ==========================================

@router.post("/drivers", dependencies=[Depends(RoleGuard(["Safety Officer", "Fleet Manager"]))])
def hire_driver(driver: Driver, db: Session = Depends(get_session)):
    db.add(driver)
    db.commit()
    db.refresh(driver)
    return driver

@router.get("/drivers")
def list_drivers(db: Session = Depends(get_session)):
    return db.exec(select(Driver)).all()

@router.patch("/drivers/{driver_id}", dependencies=[Depends(RoleGuard(["Fleet Manager"]))])
def update_driver(driver_id: int, driver_data: dict, db: Session = Depends(get_session)):
    driver = db.get(Driver, driver_id)
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    
    for key, value in driver_data.items():
        if hasattr(driver, key):
            setattr(driver, key, value)
            
    db.add(driver)
    db.commit()
    db.refresh(driver)
    return driver

@router.delete("/drivers/{driver_id}", dependencies=[Depends(RoleGuard(["Fleet Manager"]))])
def delete_driver(driver_id: int, db: Session = Depends(get_session)):
    driver = db.get(Driver, driver_id)
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    db.delete(driver)
    db.commit()
    return {"message": "Driver deleted successfully", "id": driver_id}

# ==========================================
# SYSTEM USERS ENDPOINT
# ==========================================

@router.get("/users", dependencies=[Depends(RoleGuard(["Fleet Manager"]))])
def get_all_users(db: Session = Depends(get_session)):
    return db.exec(select(User)).all()
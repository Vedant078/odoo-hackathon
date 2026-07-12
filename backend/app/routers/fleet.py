from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.database import get_session
from app.models import Vehicle, Driver
from app.auth import RoleGuard

router = APIRouter(tags=["Fleet Sub-Module"])

@router.post("/vehicles", dependencies=[Depends(RoleGuard(["Fleet Manager"]))])
def add_vehicle(vehicle: Vehicle, db: Session = Depends(get_session)):
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return vehicle

@router.get("/vehicles")
def list_vehicles(db: Session = Depends(get_session)):
    return db.exec(select(Vehicle)).all()

@router.post("/drivers", dependencies=[Depends(RoleGuard(["Safety Officer", "Fleet Manager"]))])
def hire_driver(driver: Driver, db: Session = Depends(get_session)):
    db.add(driver)
    db.commit()
    db.refresh(driver)
    return driver

@router.get("/drivers")
def list_drivers(db: Session = Depends(get_session)):
    return db.exec(select(Driver)).all()
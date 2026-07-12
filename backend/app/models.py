from datetime import date, datetime
from enum import Enum
from typing import Optional
from sqlmodel import Field, SQLModel

# ==========================================
# STATUS ENUMS
# ==========================================

class VehicleStatus(str, Enum):
    AVAILABLE = "Available"
    ON_TRIP = "On Trip"
    IN_SHOP = "In Shop"
    RETIRED = "Retired"

class DriverStatus(str, Enum):
    AVAILABLE = "Available"
    ON_TRIP = "On Trip"
    OFF_DUTY = "Off Duty"
    SUSPENDED = "Suspended"

class TripStatus(str, Enum):
    DRAFT = "Draft"
    DISPATCHED = "Dispatched"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"

class MaintenanceStatus(str, Enum):
    ACTIVE = "Active"
    COMPLETED = "Completed"

# ==========================================
# DATABASE ENTITIES
# ==========================================

class Role(SQLModel, table=True):
    __tablename__ = "roles"
    id: Optional[int] = Field(default=None, primary_key=True)
    role_name: str = Field(unique=True, index=True)

class User(SQLModel, table=True):
    __tablename__ = "users"
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    role_id: int = Field(foreign_key="roles.id")
    status: str = Field(default="Active")

class Vehicle(SQLModel, table=True):
    __tablename__ = "vehicles"
    id: Optional[int] = Field(default=None, primary_key=True)
    registration_number: str = Field(unique=True, index=True)
    vehicle_name: str
    vehicle_type: str
    max_load_capacity: float
    odometer: float
    acquisition_cost: float
    status: VehicleStatus = Field(default=VehicleStatus.AVAILABLE)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Driver(SQLModel, table=True):
    __tablename__ = "drivers"
    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str
    license_number: str = Field(unique=True, index=True)
    license_category: str
    license_expiry: date
    phone: str
    safety_score: float = Field(default=100.0)
    status: DriverStatus = Field(default=DriverStatus.AVAILABLE)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Trip(SQLModel, table=True):
    __tablename__ = "trips"
    id: Optional[int] = Field(default=None, primary_key=True)
    source: str
    destination: str
    vehicle_id: int = Field(foreign_key="vehicles.id")
    driver_id: int = Field(foreign_key="drivers.id")
    cargo_weight: float
    planned_distance: float
    actual_distance: Optional[float] = None
    revenue: float = Field(default=0.0)
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    fuel_consumed: Optional[float] = None
    csat_score: Optional[float] = Field(default=None, description="Customer Satisfaction Score (1.0 to 5.0)")
    status: TripStatus = Field(default=TripStatus.DRAFT)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MaintenanceLog(SQLModel, table=True):
    __tablename__ = "maintenance_logs"
    id: Optional[int] = Field(default=None, primary_key=True)
    vehicle_id: int = Field(foreign_key="vehicles.id")
    maintenance_type: str
    description: Optional[str] = None
    maintenance_cost: float
    start_date: date
    end_date: Optional[date] = None
    status: MaintenanceStatus = Field(default=MaintenanceStatus.ACTIVE)

class FuelLog(SQLModel, table=True):
    __tablename__ = "fuel_logs"
    id: Optional[int] = Field(default=None, primary_key=True)
    vehicle_id: int = Field(foreign_key="vehicles.id")
    liters: float
    fuel_cost: float
    fuel_date: date = Field(default_factory=date.today)

class Expense(SQLModel, table=True):
    __tablename__ = "expenses"
    id: Optional[int] = Field(default=None, primary_key=True)
    vehicle_id: int = Field(foreign_key="vehicles.id")
    expense_type: str
    amount: float
    expense_date: date = Field(default_factory=date.today)
    description: Optional[str] = None
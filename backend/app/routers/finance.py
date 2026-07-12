from datetime import date
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, func
from app.database import get_session
from app.models import FuelLog, Expense, Vehicle, MaintenanceLog, Trip, TripStatus

router = APIRouter(tags=["Financial Insights & Metrics"])

@router.post("/fuel-logs")
def add_fuel_receipt(log: FuelLog, db: Session = Depends(get_session)):
    db.add(log)
    db.commit()
    db.refresh(log)
    return log

@router.post("/expenses")
def add_general_expense(expense: Expense, db: Session = Depends(get_session)):
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense

@router.get("/analytics/fleet/performance")
def get_fleet_performance_summary(db: Session = Depends(get_session)):
    fuel_costs = db.exec(select(func.sum(FuelLog.fuel_cost))).first() or 0.0
    maint_costs = db.exec(select(func.sum(MaintenanceLog.maintenance_cost))).first() or 0.0
    other_expenses = db.exec(select(func.sum(Expense.amount))).first() or 0.0
    total_revenue = db.exec(select(func.sum(Trip.revenue)).where(Trip.status == TripStatus.COMPLETED)).first() or 0.0

    total_costs = fuel_costs + maint_costs + other_expenses
    net_profit = total_revenue - total_costs

    avg_csat = db.exec(select(func.avg(Trip.csat_score)).where(Trip.status == TripStatus.COMPLETED)).first()
    completed_trips_count = db.exec(select(func.count(Trip.id)).where(Trip.status == TripStatus.COMPLETED)).first()

    return {
        "financials": {
            "total_revenue": total_revenue,
            "total_operational_costs": total_costs,
            "net_profit": net_profit
        },
        "customer_satisfaction": {
            "average_fleet_csat": round(avg_csat, 2) if avg_csat is not None else 0.0,
            "total_evaluated_trips": completed_trips_count
        }
    }

# --- Asset Profitability Metrics ---

@router.get("/analytics/vehicle/{vehicle_id}/roi")
def get_vehicle_roi_analysis(vehicle_id: int, db: Session = Depends(get_session)):
    vehicle = db.get(Vehicle, vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle asset not found.")

    fuel_sum = db.exec(select(func.sum(FuelLog.fuel_cost)).where(FuelLog.vehicle_id == vehicle_id)).first() or 0.0
    maint_sum = db.exec(select(func.sum(MaintenanceLog.maintenance_cost)).where(MaintenanceLog.vehicle_id == vehicle_id)).first() or 0.0
    expense_sum = db.exec(select(func.sum(Expense.amount)).where(Expense.vehicle_id == vehicle_id)).first() or 0.0
    revenue_sum = db.exec(select(func.sum(Trip.revenue)).where(Trip.vehicle_id == vehicle_id, Trip.status == TripStatus.COMPLETED)).first() or 0.0

    total_running_costs = fuel_sum + maint_sum + expense_sum
    net_asset_return = revenue_sum - total_running_costs

    roi_percentage = 0.0
    if vehicle.acquisition_cost > 0:
        roi_percentage = (net_asset_return / vehicle.acquisition_cost) * 100

    return {
        "vehicle_id": vehicle.id,
        "registration_number": vehicle.registration_number,
        "acquisition_cost": vehicle.acquisition_cost,
        "total_revenue_generated": revenue_sum,
        "total_maintenance_and_running_costs": total_running_costs,
        "net_profit": net_asset_return,
        "return_on_investment_pct": round(roi_percentage, 2)
    }

# --- Chart Breakdown Metrics ---

@router.get("/analytics/expenses/breakdown")
def get_cost_distribution_breakdown(db: Session = Depends(get_session)):
    fuel_total = db.exec(select(func.sum(FuelLog.fuel_cost))).first() or 0.0
    maint_total = db.exec(select(func.sum(MaintenanceLog.maintenance_cost))).first() or 0.0
    
    misc_breakdown = db.exec(
        select(Expense.expense_type, func.sum(Expense.amount))
        .group_by(Expense.expense_type)
    ).all()

    formatted_misc = {item[0]: item[1] for item in misc_breakdown}

    return {
        "fuel_expenses": fuel_total,
        "maintenance_expenses": maint_total,
        "miscellaneous_expenses_breakdown": formatted_misc,
        "grand_total_expenses": fuel_total + maint_total + sum(formatted_misc.values())
    }
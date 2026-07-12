from datetime import date
from fastapi import APIRouter, Depends, HTTPException
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
    """
    Computes critical financial totals alongside operational Customer Satisfaction Metrics.
    """
    fuel_costs = db.exec(select(func.sum(FuelLog.fuel_cost))).first() or 0.0
    maint_costs = db.exec(select(func.sum(MaintenanceLog.maintenance_cost))).first() or 0.0
    other_expenses = db.exec(select(func.sum(Expense.amount))).first() or 0.0
    total_revenue = db.exec(select(func.sum(Trip.revenue)).where(Trip.status == TripStatus.COMPLETED)).first() or 0.0

    total_costs = fuel_costs + maint_costs + other_expenses
    net_profit = total_revenue - total_costs

    # Customer Satisfaction Aggregation
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
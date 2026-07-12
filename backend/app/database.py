import os
from sqlmodel import SQLModel, create_engine, Session
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    # Import all models to register them on SQLModel.metadata
    from app.models import Role, User, Vehicle, Driver, Trip, MaintenanceLog, FuelLog, Expense
    
    SQLModel.metadata.create_all(engine)
    
    from sqlmodel import select, Session
    from passlib.context import CryptContext
    
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    default_roles = [
        "Fleet Manager",
        "Safety Officer",
        "Dispatcher",
        "operator",
        "viewer",
        "admin",
        "super_admin"
    ]
    
    with Session(engine) as session:
        # Seed roles
        role_map = {}
        for r_name in default_roles:
            existing = session.exec(select(Role).where(Role.role_name == r_name)).first()
            if not existing:
                role = Role(role_name=r_name)
                session.add(role)
                session.commit()
                session.refresh(role)
                role_map[r_name] = role.id
            else:
                role_map[r_name] = existing.id
                
        # Seed default users
        default_users = [
            ("admin@transitops.com", "admin123", "Fleet Manager"),
            ("dispatcher@transitops.com", "dispatch123", "Dispatcher"),
            ("safety@transitops.com", "safety123", "Safety Officer"),
            ("operator@transitops.com", "operator123", "operator"),
        ]
        
        for email, plain_password, r_name in default_users:
            existing_user = session.exec(select(User).where(User.email == email)).first()
            if not existing_user:
                hashed_pwd = pwd_context.hash(plain_password)
                role_id = role_map.get(r_name)
                if role_id:
                    new_user = User(
                        email=email,
                        hashed_password=hashed_pwd,
                        role_id=role_id,
                        status="Active"
                    )
                    session.add(new_user)
        session.commit()

def get_session():
    with Session(engine) as session:
        yield session
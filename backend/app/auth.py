import os
from datetime import datetime, timedelta, timezone
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select, func
import jwt
from jwt import PyJWTError as JWTError
from passlib.context import CryptContext
from dotenv import load_dotenv
from pydantic import BaseModel, EmailStr

from app.database import get_session
from app.models import User, Role

load_dotenv()

router = APIRouter(prefix="/auth", tags=["Authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY", "CHANGE_ME_BEFORE_DEMO")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
try:
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "480"))
except ValueError:
    ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 8


class UserRegister(BaseModel):
    email: EmailStr
    password: str
    role_name: str


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    role_name: Optional[str] = None
    status: Optional[str] = None


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(email: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode({"sub": email, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_session)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.exec(select(User).where(User.email == email)).first()
    if not user:
        raise credentials_exception
    if user.status != "Active":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="This account has been deactivated.")
    return user


class RoleGuard:
    def __init__(self, allowed_roles: list[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, current_user: User = Depends(get_current_user), db: Session = Depends(get_session)):
        user_role = db.get(Role, current_user.role_id)
        if not user_role or user_role.role_name not in self.allowed_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied by RBAC rule safety guard.")
        return current_user


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, db: Session = Depends(get_session)):
    existing_user = db.exec(select(User).where(User.email == user_data.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered."
        )
    
    # Check if role exists (case-insensitive)
    role = db.exec(select(Role).where(func.lower(Role.role_name) == user_data.role_name.lower())).first()
    if not role:
        role = Role(role_name=user_data.role_name)
        db.add(role)
        db.commit()
        db.refresh(role)

    hashed_pwd = get_password_hash(user_data.password)
    new_user = User(
        email=user_data.email,
        hashed_password=hashed_pwd,
        role_id=role.id,
        status="Active"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully", "user_id": new_user.id}


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_session)):
    user = db.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if user.status != "Active":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="This account has been deactivated.")
    token = create_access_token(user.email)
    return {"access_token": token, "token_type": "bearer"}


@router.patch("/users/{user_id}", dependencies=[Depends(RoleGuard(["Fleet Manager", "admin", "super_admin"]))])
def update_user(user_id: int, user_data: UserUpdate, db: Session = Depends(get_session)):
    db_user = db.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
        
    update_dict = user_data.dict(exclude_unset=True)
    
    # Check duplicate email if updated
    if "email" in update_dict and update_dict["email"] != db_user.email:
        existing = db.exec(select(User).where(User.email == update_dict["email"])).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered.")
            
    # If role_name is updated, map it to role_id
    if "role_name" in update_dict and update_dict["role_name"] is not None:
        role_name = update_dict.pop("role_name")
        role = db.exec(select(Role).where(func.lower(Role.role_name) == role_name.lower())).first()
        if not role:
            role = Role(role_name=role_name)
            db.add(role)
            db.commit()
            db.refresh(role)
        db_user.role_id = role.id
        
    for key, value in update_dict.items():
        setattr(db_user, key, value)
        
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
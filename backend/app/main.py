from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_db
from app.auth import router as auth_router
from app.routers import fleet, ops, finance


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="TransitOps Prototype Server", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(fleet.router, prefix="/api/v1")
app.include_router(ops.router, prefix="/api/v1")
app.include_router(finance.router, prefix="/api/v1")


@app.get("/health")
def health_check():
    return {"status": "ok"}
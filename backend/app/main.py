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

app = FastAPI(
    title=" TransitOps Core API Engine",
    description="Automated system managing vehicle life cycles, logistics task sequences, and core fleet cost diagnostics.",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url=None
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cleaned Router Mounting (Tags are managed inside each router file to prevent duplication)
app.include_router(auth_router, prefix="/api/v1")
app.include_router(fleet.router, prefix="/api/v1")
app.include_router(ops.router, prefix="/api/v1")
app.include_router(finance.router, prefix="/api/v1")

@app.get("/health", tags=["SYSTEM_CONTROLS"])
def health_check():
    return {"status": "healthy"}
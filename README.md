# TransitOps

TransitOps is a high-performance fleet logistics and operations dashboard designed to eliminate operational inefficiencies, compliance safety risks, maintenance oversights, and financial blind spots.

---

## 🚀 Tech Stack

*   **Frontend**: React.js (Vite, Tailwind CSS, Lucide Icons, Recharts)
*   **Backend**: FastAPI (Python 3.10+, SQLModel, SQLite/PostgreSQL)
*   **Database & ORM**: SQLModel (SQLAlchemy) & PostgreSQL

---

## 🛠️ Key Features

*   **Role-Based Access Control (RBAC)**: Custom permissions and interfaces tailored for Fleet Managers, Drivers, Dispatchers, and Safety Officers.
*   **Asset Management**: Real-time tracking of trucks, delivery vans, and logistics transport assets.
*   **Operations Engine**: Strict automated status transition workflows for dispatching and completing trips.
*   **Maintenance Workspaces**: Tracking of active and scheduled vehicle diagnostic repairs.
*   **Financial Analytics**: Automatic calculation of vehicle ROI, operational expense distributions, and fleet performance insights.

---

## 📦 Project Structure

```
├── backend/                  # FastAPI app codebase
│   └── app/
│       ├── database.py       # DB engine and session configuration
│       ├── models.py         # DB entity models and enums
│       ├── auth.py           # JWT security & user administration
│       ├── routers/          # Route modules (fleet, ops, finance)
│       └── main.py           # Application entrypoint
└── FRONTEND_1/               # React + Vite frontend
    ├── src/
    │   ├── app/              # Router, providers, and layout structure
    │   ├── components/       # Reusable UI & Chart components
    │   ├── features/         # Page modules (booking, assets, reports, etc.)
    │   └── utils/            # API client and constants
    └── package.json
```

---

## 🔧 Setup & Installation

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Set up a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install fastapi sqlmodel uvicorn python-jose[cryptography] passlib[bcrypt] python-dotenv
   ```
3. Create a `.env` file in `backend/` and configure:
   ```env
   DATABASE_URL=sqlite:///./database.db
   SECRET_KEY=your-super-secret-key-change-it
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=60
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd FRONTEND_1
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```

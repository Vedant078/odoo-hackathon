




# TransitOps

TransitOps is a high-performance fleet logistics and operations dashboard designed to eliminate operational inefficiencies, compliance safety risks, maintenance oversights, and financial blind spots[cite: 1].

---

## 👥 Development Team

*   **Vedant Limbasiya**
*   **Daksh Modi**
*   **Shlok Varu**
*   **Laksh Patel**

---

## 🚀 Tech Stack

*   **Frontend**: React.js (Vite, Tailwind CSS, Lucide Icons, Recharts)
*   **Backend**: FastAPI (Python 3.10+, SQLModel, PostgreSQL)
*   **Database & ORM**: SQLModel (SQLAlchemy) & PostgreSQL

---

## 🛠️ Key Features

*   **Role-Based Access Control (RBAC)**: Custom permissions and interfaces tailored for Fleet Managers, Drivers, Safety Officers, and Financial Analysts[cite: 1].
*   **Asset Management**: Real-time master list tracking of registration numbers, status, and load constraints for logistics transport assets[cite: 1].
*   **Operations Engine**: Strict automated status transition workflows for dispatching, completing, or cancelling trips[cite: 1].
*   **Maintenance Workspaces**: Automatic vehicle lockout tracking ("In Shop") for scheduled diagnostic repairs[cite: 1].
*   **Financial Analytics**: Automatic calculation of vehicle ROI, operational fuel efficiency metrics, and live cost distributions[cite: 1].

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

### Database Pre-requisite
Ensure your local PostgreSQL service is active and create the target system database:
```sql
CREATE DATABASE transitops;

```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend

```


2. Set up a virtual environment and install your core database and security dependencies:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi sqlmodel uvicorn python-jose[cryptography] passlib[bcrypt] python-dotenv psycopg2-binary

```


3. Start the FastAPI runtime engine using the isolated environment hook:
```bash
python -m uvicorn app.main:app --app-dir . --reload --port 8000

```



### Frontend Setup

1. Navigate to the frontend workspace:
```bash
cd FRONTEND_1

```


2. Install client package dependencies:
```bash
npm install

```


3. Spin up the Vite interface live loader:
```bash
npm run dev

```






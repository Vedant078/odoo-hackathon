


# Odoo Hackathon 2026

Welcome to the project repository for the Odoo Hackathon 2026 virtual round. This application is built using a modern, high-performance stack optimized for rapid feature delivery and robust data handling.

---

## The Team
* **Vedant Limbasiya** (Team Leader)
* **Daksh Modi**
* **Laksh Patel**
* **Shlok Varu**

**Assigned Evaluator:** Dhruvkumar Rajendrasinh Chauhan

---

## Tech Stack
* **Frontend:** React.js (Tailwind CSS)
* **Backend:** FastAPI (Python)
* **Database & ORM:** PostgreSQL & SQLModel

---

## Problem Statement & Solution

* **Selected Problem:** 
Logistics companies frequently rely on fragmented spreadsheets and manual logbooks to track their operations. This manual approach introduces critical operational inefficiencies:
1) **Scheduling Conflicts & Low Utilization:** Inefficient tracking leads to double-booked assets or underutilized vehicles.
2)   **Compliance & Safety Risks:** High risk of assigning drivers with expired licenses or suspended statuses.
3)   **Maintenance Oversights:** Lack of automated status tracking results in missed vehicle servicing and unexpected breakdowns.
4)  **Financial Blind Spots:** Inaccurate logging of fuel, maintenance, and toll expenses makes calculating accurate vehicle ROI impossible.
 ### Our Solution: 
Key Features:
*   **Role-Based Access Control (RBAC):** Tailored interfaces and permissions for Fleet Managers, Drivers, Safety Officers, and Financial Analysts.
*   **Automated State Management:** Strict status transitions (e.g., dispatching a trip instantly updates both driver and vehicle to `On Trip`; logging maintenance pushes a vehicle to `In Shop` and removes it from the dispatch pool).
*   **Automated Business Rule Enforcement:** Built-in validation checks for cargo weight limits, license expirations, and asset availability prior to dispatch.
*   **Financial & Operational Intelligence:** A comprehensive dashboard tracking key metrics like Fleet Utilization and automated Vehicle ROI calculations:
    $$\text{Vehicle ROI} = \frac{\text{Revenue} - (\text{Maintenance} + \text{Fuel})}{\text{Acquisition Cost}}$$

---

## Team Git Workflow (Read Before Coding!)

To prevent merge conflicts and ensure our main branch remains clean and runnable, please follow this strict workflow:

### 1. Synchronize Local Code
Before beginning any new feature or task, always pull the latest updates from GitHub:
```bash
git checkout main
git pull

```

### 2. Feature-Based Branching

Never write code directly on the main branch. Create a descriptive feature branch for your work:

```bash
# For backend development tasks:
git checkout -b backend-feature-name

# For frontend UI/UX tasks:
git checkout -b frontend-feature-name

```

### 3. Push and Open a Pull Request

When your feature is complete and runs locally without errors, push your branch and open a Pull Request (PR) on GitHub:

```bash
git add .
git commit -m "feat: short description of what you added"
git push -u origin your-branch-name

```

*Notify the team leader to review, resolve any conflicts, and merge your code into main.*

---



# Frontend — React + Tailwind + CRUD

This React app runs at **http://localhost:5173** and performs CRUD against the Django API on **http://localhost:8000**.

## Run

1. **Start Django** (from project root):
   ```bash
   python manage.py runserver
   ```
2. **Start the frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
3. Open **http://localhost:5173** in your browser.

## CRUD on localhost

- **Customers**: list, create, edit, delete (name).
- **Products**: list, create, edit, delete (product name, price).

API requests from the app go to `/api/...` and are proxied to `http://localhost:8000` by Vite, so all CRUD runs against your local Django backend.

## Stack

- **Vite** + **React**
- **Tailwind CSS** (v4)
- Fetch to Django REST API (`/api/customers/`, `/api/products/`)

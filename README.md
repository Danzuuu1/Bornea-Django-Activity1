# Django Orders API (DRF)

CRUD API for Customer, Order, Product, and Order_Product based on your ERD.

## Setup

```bash
# Create and activate a virtual environment (recommended)
python -m venv venv
venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Create DB and tables
python manage.py makemigrations orders
python manage.py migrate

# Optional: create superuser for /admin
python manage.py createsuperuser

# Run server
python manage.py runserver
```

## API Endpoints (base: `http://127.0.0.1:8000/api/`)

| Resource       | List (Read) | Create | Read one | Update | Delete |
|----------------|-------------|--------|----------|--------|--------|
| **Customers**  | `GET /api/customers/` | `POST /api/customers/` | `GET /api/customers/{id}/` | `PUT|PATCH /api/customers/{id}/` | `DELETE /api/customers/{id}/` |
| **Products**   | `GET /api/products/`  | `POST /api/products/`  | `GET /api/products/{id}/`  | `PUT|PATCH /api/products/{id}/`  | `DELETE /api/products/{id}/`  |
| **Orders**     | `GET /api/orders/`    | `POST /api/orders/`    | `GET /api/orders/{id}/`    | `PUT|PATCH /api/orders/{id}/`    | `DELETE /api/orders/{id}/`    |
| **Order items**| `GET /api/order-products/` | `POST /api/order-products/` | `GET /api/order-products/{id}/` | `PUT|PATCH /api/order-products/{id}/` | `DELETE /api/order-products/{id}/` |

- **Browsable API:** open `http://127.0.0.1:8000/api/` in a browser.
- **Admin:** `http://127.0.0.1:8000/admin/` (after `createsuperuser`).

## Example requests

**Create customer**
```http
POST /api/customers/
Content-Type: application/json

{"name": "Jane Doe"}
```

**Create product**
```http
POST /api/products/
Content-Type: application/json

{"product_name": "Widget", "price": "19.99"}
```

**Create order** (use existing `customer_id`)
```http
POST /api/orders/
Content-Type: application/json

{"order_date": "2026-02-08", "customer": 1}
```

**Add product to order (Order_Product)**
```http
POST /api/order-products/
Content-Type: application/json

{"order": 1, "product": 1, "quantity": 3}
```

## Models (ERD)

- **Customer** → one-to-many **Order**
- **Order** ↔ **Product** many-to-many via **OrderProduct** (orderproduct_id, order_id, product_id, quantity)


# Pearl Promise

Responsive skincare e-commerce application with a React/Vite frontend, FastAPI
backend, and MongoDB database.

## Features

- Product browsing, search, category filters, product details, and combos
- Account registration, login, email OTP flows, and optional Google sign-in
- User-specific cart, wishlist, profile, and saved shipping address
- Checkout, order history, order cancellation, and return requests
- Product reviews and admin product, user, and order management
- Responsive layouts for mobile, tablet, and desktop

## Technology

| Area | Stack |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, React Router, Framer Motion |
| Backend | Python, FastAPI, Pydantic, Motor |
| Database | MongoDB |
| Authentication | JWT access/refresh tokens, Argon2 password hashing |

## Project Structure

```text
Frontend/   React application
Backend/    FastAPI application, tests, and product seed script
```

## Requirements

- Node.js 20.19+ or 22.12+
- Python 3.13+
- MongoDB running locally or a reachable MongoDB Atlas cluster

## Local Setup

### 1. Configure the backend

Create `Backend/.env` using `Backend/.env.example` as a reference. Set at least
`MONGODB_URI` and a strong, unique `JWT_SECRET_KEY`. Do not commit `.env`.

```powershell
cd Backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

The API is available at `http://localhost:8000`; interactive API docs are at
`http://localhost:8000/docs`.

### 2. Configure and run the frontend

Set `VITE_API_URL` in `Frontend/.env.local` to the backend base URL:

```env
VITE_API_URL=http://localhost:8000
```

Then run:

```powershell
cd Frontend
npm install
npm run dev
```

Vite prints the local frontend URL when it starts.

### 3. Seed the product catalog

The frontend includes a local product catalog. The API catalog reads product
documents from MongoDB; import the catalog before using those endpoints:

```powershell
cd Backend
.\.venv\Scripts\python.exe scripts\seed_products.py
```

The seed script upserts by product slug and can be run again without creating
duplicate product records.

## Environment Variables

Backend settings are read from `Backend/.env` locally and from the hosting
provider's environment configuration after deployment.

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `MONGODB_DATABASE` | Database name; defaults to `pearl_promise` |
| `JWT_SECRET_KEY` | Secret used to sign tokens; use a unique random value |
| `FRONTEND_ORIGIN` | Exact frontend origin allowed by CORS |
| `ENVIRONMENT` | Set to `production` for deployment |
| `GOOGLE_CLIENT_ID` | Optional Google sign-in client ID |
| `EMAIL_HOST`, `EMAIL_PORT` | Optional SMTP server settings |
| `EMAIL_USERNAME`, `EMAIL_PASSWORD` | Optional SMTP credentials |
| `EMAIL_FROM`, `EMAIL_USE_TLS` | Optional sender address and TLS setting |
| `OTP_EXPIRE_MINUTES`, `OTP_MAX_ATTEMPTS` | Optional email OTP policy |

The frontend uses `VITE_API_URL` at build time. Set it to the deployed API base
URL when the frontend and backend use different origins. If left unset in a
production build, frontend API requests use the same origin and the web host
must proxy those requests to the API.

Never commit `.env` files or expose database, JWT, SMTP, or OAuth credentials.

## Production Deployment

Deploy the frontend and backend as separate services, or configure a reverse
proxy for a shared origin.

### Backend

1. Set `ENVIRONMENT=production`.
2. Set a remote, reachable `MONGODB_URI` and a unique random `JWT_SECRET_KEY`
   with at least 32 characters.
3. Set `FRONTEND_ORIGIN` to the deployed frontend's public HTTPS origin.
4. Configure the platform's `PORT` and start command:

   ```text
   uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

5. Ensure the API host can reach MongoDB, then run the product seed script once.
6. Configure HTTPS. Restrict `/docs` at the hosting or gateway layer if public
   API documentation is not desired.

Production startup rejects the development JWT secret, local MongoDB hosts, and
non-HTTPS frontend origins.

### Frontend

1. Set `VITE_API_URL` to the deployed API's HTTPS base URL, unless requests are
   routed through the frontend origin.
2. Build with `npm run build`.
3. Deploy `Frontend/dist`.
4. Configure the static host to serve `index.html` for client-side routes.

## API Overview

- Authentication: `/auth`
- User profile: `/users`
- Products and categories: `/products`, `/categories`
- Cart and wishlist: `/cart`, `/wishlist`
- Orders and returns: `/orders`
- Reviews: `/reviews`
- Admin operations: `/admin`
- Health check: `GET /health`

See `/docs` on a running development API for request and response schemas.

## Demo and Production Limitations

- **Payments are not production-ready.** UPI and card flows are mock/test-only:
  they do not collect or verify real payments. Do not accept real card or UPI
  payments until a payment provider, server-side verification, and
  reconciliation are implemented. A COD launch also needs a verified order
  fulfillment and collection process.
- **Delivery tracking is simulated.** New order statuses advance every three
  seconds from order placement through delivery. The timestamp-based simulation
  catches up when an order is fetched after the browser or API was stopped; it
  is not carrier tracking. Integrate a shipping provider for real shipment
  updates.
- Configure Google sign-in and SMTP credentials before offering those features
  in production.

## Validation

Run backend tests:

```powershell
cd Backend
.\.venv\Scripts\python.exe -m pytest -q
```

Build the frontend:

```powershell
cd Frontend
npm run build
```
=======
# Pearl-Promise
Pearl Promise is a skincare e-commerce platform built with React, Tailwind CSS, FastAPI, and MongoDB Atlas. It offers product browsing, user authentication, shopping cart, wishlist, and order management through a modern, responsive interface.

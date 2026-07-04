# 🎮 GameStore — Full-Stack E-Commerce Web App

A full-stack online **video game store** where users can browse games, add them to a cart, and check out with real **VNPay** online payments. Built with the **MERN stack** (MongoDB, Express, React, Node.js) and shipped with Docker.

> A personal full-stack project built to practice end-to-end web development: REST API design, JWT authentication, role-based access control, third-party payment integration, and containerized deployment.

<p align="left">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white" alt="Docker" />
</p>

---

## ✨ Features

### 👤 Customer
- Browse the full catalogue, plus **New** and **Hot / featured** collections
- Filter games by **platform** (PC / Windows, Playstation, …)
- View a detailed product page for each game
- **Register / Login** with JWT-based authentication (passwords hashed with bcrypt)
- Add to **cart**, adjust quantities, and remove items
- Checkout and pay online through the **VNPay** payment gateway (sandbox)
- View personal **order history**

### 🛠️ Admin
- Protected **admin dashboard** (route guarded on both frontend and backend)
- Manage **games** — create, update, delete products
- Manage **orders** — view all orders and update their status
- View all registered **users**

---

## 🧱 Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, Vite, React Router 7, Bootstrap 5 / React-Bootstrap, Axios, Lucide / React-Icons |
| **Backend** | Node.js, Express 5 (ESM), Mongoose 8 |
| **Database** | MongoDB |
| **Auth** | JSON Web Tokens (`jsonwebtoken`) + `bcrypt` |
| **Payments** | VNPay (HMAC-SHA512 signed requests) |
| **Tooling** | Docker & Docker Compose, Nginx (static frontend), ESLint |

---

## 📁 Project Structure

```
TMDT-Gamestore/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── Components/      # Reusable UI (Header, Footer, Carousel, Item, …)
│   │   ├── Context/         # React Context providers (Game, Cart, Admin, Order)
│   │   ├── Pages/           # Route pages (Home, Login, Cart, Admin, …)
│   │   ├── api/axios.js     # Pre-configured Axios instance
│   │   └── utils/           # Helpers (price formatting, discount calc)
│   └── Dockerfile           # Multi-stage build → served by Nginx
│
├── server/                 # Express + Mongoose backend
│   ├── controller/          # Route handlers (game, cart, order, user, admin)
│   ├── model/               # Mongoose schemas (Game, User, Cart, Order, Genre, Platform)
│   ├── routes/              # Express routers
│   ├── middleware/          # authUser.js (verify + adminOnly)
│   ├── config/default.json  # VNPay merchant config
│   ├── seed.js              # Sample-data seeder
│   ├── index.js             # App entry point
│   └── Dockerfile
│
└── docker-compose.yml      # Orchestrates MongoDB + server (+ client)
```

---

## 🗂️ Data Models

- **Game** — `gameName`, `platform[]` → Platform, `genres[]` → Genre, `price`, `discount` (%), `description`, `image`, `isFeatured`, `isNewGame`
- **Platform** — `platformName`
- **Genre** — `genreName`
- **User** — `userName`, `email` (unique), `password` (hashed), `isAdmin`
- **Cart** — `userId` → User, `items[]` (`gameId`, `quantity`)
- **Order** — `userId` → User, `items[]` (snapshot of game + `quantity`), `status`, `totalAmount`

> `discount` is stored as a **percentage**. Final price = `price − (price × discount ÷ 100)`.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ and npm
- [MongoDB](https://www.mongodb.com/) (local instance or Docker)
- A [VNPay sandbox](https://sandbox.vnpayment.vn/) account (for payments) — a demo config is already included

### Option 1 — Run with Docker (recommended)

The fastest way to get everything running:

```bash
git clone https://github.com/TerryNguyen1403/TMDT-Gamestore.git
cd TMDT-Gamestore
docker compose up -d --build
```

This starts MongoDB and the backend. To (optionally) load sample data:

```bash
docker compose run --rm \
  -e MONGO_URI=mongodb://mongo:27017/gamestoredb \
  -v "$PWD/server/seed.js:/app/seed.js" \
  server node seed.js
```

### Option 2 — Run locally (dev mode)

**1. Backend**
```bash
cd server
npm install
# create server/.env (see Environment Variables below)
npm run dev        # or: nodemon index.js  →  http://localhost:3000
```

**2. Frontend**
```bash
cd client
npm install
npm run dev        # Vite dev server  →  http://localhost:5173
```

> From the repo root you can also use the shortcuts `npm run server` and `npm run client`.

---

## 🔑 Environment Variables

Create a `server/.env` file:

```env
# Server
PORT=3000

# Database
MONGO_URI=mongodb://localhost:27017/gamestoredb

# Auth
JWT_SECRET=your_super_secret_key

# Frontend URL (used for the VNPay return redirect)
CLIENT_URL=http://localhost:5173
```

VNPay merchant credentials live in **`server/config/default.json`** (`vnp_TmnCode`, `vnp_HashSecret`, `vnp_Url`, `vnp_ReturnUrl`, …).

---

## 📡 API Reference

Base URL: `http://localhost:3000/api` · 🔒 = requires JWT · 👑 = admin only

### Games — `/game`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/game/all` | All games |
| GET | `/game/new` | New releases |
| GET | `/game/hot` | Featured / hot games |
| GET | `/game/id/:gameId` | Single game by ID |
| GET | `/game/platform/:platformName` | Games by platform |
| GET | `/game/platforms/list/all` | List all platforms |
| GET | `/game/genres/list/all` | List all genres |

### Auth — `/user`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/register` | Create an account |
| POST | `/user/login` | Log in, returns a JWT |
| GET | `/user/order/all` 🔒 | Current user's orders |

### Cart — `/cart` 🔒
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | Get the current cart |
| POST | `/cart/add` | Add a game to the cart |
| PATCH | `/cart/increase` | Increase item quantity |
| PATCH | `/cart/decrease` | Decrease item quantity |
| DELETE | `/cart/delete` | Remove an item |
| GET | `/cart/total` | Cart total amount |

### Orders & Payment — `/orders`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders/create_payment_url` | Create an order + VNPay payment URL |
| GET | `/orders/vnpay_return` | VNPay browser return handler |
| GET | `/orders/vnpay_ipn` | VNPay IPN (server-to-server) |
| GET | `/orders/:orderId` 🔒 | Get an order by ID |
| GET | `/orders/all` 👑 | All orders |
| PUT | `/orders/:orderId/status` 👑 | Update order status |

### Admin — `/admin` 👑
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/all-users` | List all users |
| POST | `/admin/games` | Create a game |
| PUT | `/admin/games/:gameId` | Update a game |
| DELETE | `/admin/games/:gameId` | Delete a game |

---

## 💳 Payment Flow (VNPay)

1. User checks out → backend builds an **Order** (`status: 0`, unpaid) from their cart.
2. Backend generates an **HMAC-SHA512 signed** VNPay payment URL and returns it.
3. User pays on the VNPay sandbox page and is redirected back to `/vnpay_return`.
4. Backend **verifies the signature**, marks the order **paid** (`status: 1`), and clears the cart.

---

## 🧩 Order Status Codes

| Code | Meaning |
|------|---------|
| `0` | Created / awaiting payment |
| `1` | Paid |
| `2`–`4` | Processing / shipped / completed *(reserved)* |

---

## 🗺️ Roadmap / Ideas

- [ ] Product search & sorting
- [ ] Product reviews & ratings
- [ ] Wishlist
- [ ] Move VNPay secrets fully into environment variables
- [ ] Automated tests (Jest / Vitest)
- [ ] CI/CD pipeline

---

## 👨‍💻 Author

**Terry Nguyen** — [@TerryNguyen1403](https://github.com/TerryNguyen1403)

> 🎓 A learning project — feedback and suggestions are always welcome!

---

## 📄 License

Released under the ISC License. Free to use for learning purposes.

# 🛍️ VK Group Company — Premium E-Commerce Platform

A production-ready, full-stack e-commerce application built with **React + Vite** (frontend) and **Spring Boot + MySQL** (backend). Features a premium Amazon-like design with advanced animations, real-time order tracking, and a full admin dashboard.

---

## 🌐 Live App

> Run locally: `http://localhost:5175`

---

## ✨ Features

### 🎨 Frontend (React + Vite + TypeScript)
- **Homepage** — Hero section, animated category cards, product grid with filtering
- **Product Cards** — Animated add-to-cart, image zoom, rating display, badge labels
- **Cart & Checkout** — 3-step checkout modal (Cart → Address → Payment), order confirmation with tracking ID
- **Order Tracking** — Live animated truck on route map, city-to-city updates every 4s, shipment activity log
- **User Profile** — 6 tabs: Account, Orders, Addresses, Payment, Security, Notifications
- **Dashboard** — Stats overview, recent orders, notifications, quick actions, recommended products
- **Wishlist** — Save items, move all to cart, animated empty state
- **Login/Signup** — Combined page with tabs, demo credentials, localStorage auth
- **Admin Panel** — 5-tab admin: Overview, Products (CRUD), Orders, Users, Settings
- **Category Navigation** — Click category → smooth scroll + filter products
- **Footer** — Social media links (Instagram, Twitter, YouTube, GitHub), real navigation links

### 🔧 Backend (Spring Boot + MySQL)
- JWT Authentication with RBAC (User/Admin roles)
- Product, Category, Cart, Order management APIs
- User profile & address management
- Email notification service
- RESTful API with proper exception handling
- MySQL database with JPA/Hibernate ORM

---

## 🚀 Getting Started

### Frontend Setup

```bash
cd stellar-cart-main
npm install
npm run dev
```

> Frontend runs at: **http://localhost:5175**

### Backend Setup

```bash
cd e-commerace
./mvnw.cmd spring-boot:run
```

> Backend API runs at: **http://localhost:8080**

### Database Setup

1. Create a MySQL database named `ecommerce`
2. Update credentials in `e-commerace/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| User | `alex@vkgroup.com` | `demo123` |
| Admin | `admin@vkgroup.com` | `admin123` |

---

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with categories + products |
| `/login` | Login/Signup | Combined auth page |
| `/profile` | Profile | Edit account details, orders, addresses |
| `/dashboard` | Dashboard | User activity overview |
| `/wishlist` | Wishlist | Saved items |
| `/track-order` | Order Tracking | Live shipment tracker |
| `/admin` | Admin Panel | Store management (admin only) |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite** (blazing-fast bundler)
- **Framer Motion** (animations)
- **Tailwind CSS** + **ShadCN UI**
- **Lucide React** (icons)
- **React Router v6** (routing)
- **Sonner** (toast notifications)

### Backend
- **Java 21** + **Spring Boot 3**
- **Spring Security** + **JWT**
- **JPA / Hibernate** + **MySQL**
- **Maven** build tool
- **Lombok** (boilerplate reduction)

---

## 📂 Project Structure

```
project on e-commerace website 12/
├── stellar-cart-main/          # React Frontend
│   ├── src/
│   │   ├── pages/              # Route pages (Index, Login, Profile, Admin...)
│   │   ├── components/         # Reusable UI components
│   │   ├── data/               # Static product & category data
│   │   └── config/             # API endpoint config
│   └── vite.config.ts
├── e-commerace/                # Spring Boot Backend
│   ├── src/main/java/
│   │   ├── controller/         # REST controllers
│   │   ├── service/            # Business logic
│   │   ├── model/              # JPA entities
│   │   ├── dto/                # Data transfer objects
│   │   └── security/           # JWT & auth
│   └── pom.xml
└── README.md
```

---

## 📸 Key UX Features

- ✅ Smooth category scroll-to-grid navigation
- ✅ Animated moving truck in order tracking
- ✅ Auto-track from profile → order tracking page
- ✅ Live city location updates every 4s
- ✅ Notification toggles in profile
- ✅ Payment card visual in profile
- ✅ Product catalog CRUD in admin
- ✅ Currency displayed in ₹ (Indian Rupee)
- ✅ Full empty states for wishlist and product grid
- ✅ Dark premium theme with glassmorphism

---

## 👤 VK Group Company

*Engineered for Excellence.*

© 2026 VK Group Company. All rights reserved.

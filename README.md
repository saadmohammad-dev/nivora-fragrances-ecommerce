
# Nivora Fragrances — Luxury E-Commerce Web Platform

Nivora Fragrances is a full-stack, responsive luxury e-commerce web platform built with React and Node.js/Express. Designed to offer a premium scent-shopping experience, the application features an interactive fragrance discovery quiz, localized order tracking, membership tier subscriptions, dynamic product filtering, and persistent state management via the React Context API.

---

## 📌 Project Overview & Scope

* **Objective:** Develop a modern, end-to-end e-commerce solution bridging intuitive frontend UI/UX design with lightweight RESTful API backend services.
* **Scope:**
  * **Interactive Discovery:** Guided scent quiz recommending tailored fragrances based on customer preferences.
  * **Dynamic Catalog:** Real-time search, category filtering, and sorting across perfume families.
  * **Order Management:** Live tracking portal powered by unique order IDs.
  * **Subscription System:** Multi-tier membership plans with customizable benefits.
  * **State & Persistence:** Seamless handling of shopping carts, light/dark themes, and toast notifications stored in `localStorage`.
  * **REST API:** Express backend managing products, dynamic order creation, and subscription submissions via JSON persistence.

---

## ✨ Key Features Implemented

* **Product Filtering & Sorting:** Filter products by target gender or scent family (Woody, Oriental, Fresh, Floral), search by keywords, and sort by price or customer rating.
* **Interactive Scent Quiz:** A 5-step interactive quiz providing personalized perfume recommendations.
* **Live Order Tracking:** Customer order status lookup using tracking identifiers (e.g., `NIV-PNTZ4W`).
* **Cart & Wishlist Engine:** Add/remove items, toggle subscriptions for discounts, update quantities, and calculate totals dynamically.
* **Membership Plans:** Browse and subscribe to membership tiers (Essence, Signature, Prestige) detailing exclusive perks.
* **Global Theme & Notification System:** Dark/Light mode toggle paired with interactive toast alerts for user feedback.
* **Assistant Widget & Support:** Floating virtual assistant modal for quick navigation and customer inquiries.

---

## 🛠 Tech Stack & Dependencies

### **Frontend**
* **Framework:** React.js
* **Routing:** React Router DOM
* **State Management:** React Context API (`CartContext`, `ThemeContext`, `ToastContext`)
* **Styling & Assets:** CSS3 Modules, Lucide React Icons

### **Backend**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Data Storage:** JSON File Storage (`orders.json`, `subscribers.json`, `products.js`)
* **Utilities:** `cors`, `uuid`, `fs`

---

## 📁 Repository Structure


```

web-project/
├── backend/               # Express REST API Server
│   ├── data/              # JSON databases (orders, subscribers, products)
│   ├── routes/            # Route handlers (contact, orders, products, subscribe)
│   ├── package.json       # Backend dependencies
│   └── server.js          # API server entry point
├── src/                   # React Frontend App
│   ├── components/        # Reusable UI components & modals
│   ├── context/           # React Context Providers (Cart, Theme, Toast)
│   ├── pages/             # Page views (Home, Shop, ProductDetails, Quiz, etc.)
│   ├── api.js             # API service integration
│   ├── App.js             # Main application router
│   └── index.js           # Frontend entry point
├── public/                # Static assets & HTML template
├── .gitignore             # Ignored files & folders
└── package.json           # Frontend dependencies & scripts

```

---

## 🚀 Installation & Setup Guide

### **Prerequisites**
Ensure **Node.js** (v14 or higher) and **npm** are installed on your machine.

### **1. Clone the Repository**
```bash
git clone [https://github.com/saadmohammad-dev/nivora-fragrances-ecommerce.git](https://github.com/saadmohammad-dev/nivora-fragrances-ecommerce.git)
cd nivora-fragrances-ecommerce

```

### **2. Run Backend Server**

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start Express server
node server.js

```

> The API server will run on `http://localhost:5000`

### **3. Run Frontend App**

Open a second terminal tab or window in the root directory:

```bash
# Install frontend dependencies
npm install

# Start React development server
npm start

```

> The web app will launch on `http://localhost:3000`

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/products` | Fetch all products (supports gender, family, search, and sort queries) |
| `GET` | `/api/products/:id` | Fetch specific product by ID |
| `POST` | `/api/orders` | Place a new customer order |
| `GET` | `/api/orders/tracking/:id` | Retrieve live order tracking info |
| `POST` | `/api/subscribe` | Process newsletter and membership registrations |
| `POST` | `/api/contact` | Submit contact form message |

---

## 📜 License

This project was developed for academic final semester web development evaluation.

```

```

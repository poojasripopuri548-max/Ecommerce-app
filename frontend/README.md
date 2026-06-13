# 🛒 E-Commerce Web Application

> A modern full-stack e-commerce platform built with React, Node.js, Express, and MongoDB, featuring secure authentication, product management, shopping cart functionality, and order tracking.

![GitHub](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

---

## 🚀 Project Overview

This project is a complete e-commerce solution designed to simulate a real-world online shopping experience. It demonstrates full-stack development skills including frontend development, backend API creation, database management, authentication, and deployment.

Users can browse products, create accounts, manage their shopping cart, and place orders, while administrators can manage inventory and monitor orders.

---

## ✨ Key Features

### 👤 User Features

* Secure User Registration & Login
* JWT Authentication & Authorization
* Browse Product Catalog
* Add Products to Cart
* Place Orders
* View Order History
* Responsive User Interface

### 🛠️ Admin Features

* Add New Products
* Update Existing Products
* Delete Products
* Manage Customer Orders

### 🔒 Security Features

* Password Hashing using bcryptjs
* JWT Token-Based Authentication
* Protected Routes
* Secure API Access

---

## 🏗️ System Architecture

Frontend (React.js)
⬇
REST API (Express.js)
⬇
MongoDB Database
⬇
Authentication (JWT)

---

## 💻 Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Context API
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* CORS

### Database

* MongoDB Atlas
* Mongoose ODM

### Deployment

* Netlify (Frontend)
* Render (Backend)

---

## 📂 Project Structure

ecommerce-app/

├── backend/

│ ├── models/

│ ├── routes/

│ ├── middleware/

│ ├── controllers/

│ └── server.js

│

├── frontend/

│ ├── src/

│ ├── public/

│ └── package.json

│

└── README.md

---

## 🔄 Application Workflow

1. User creates an account.
2. User logs into the platform.
3. Products are fetched from MongoDB.
4. User adds products to cart.
5. User places an order.
6. Order details are stored in the database.
7. User can view order history.

---

## 📡 REST API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

### Products

GET /api/products

GET /api/products/:id

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id

### Orders

POST /api/orders

GET /api/orders/myorders

---

## 🎯 Learning Outcomes

Through this project I gained practical experience in:

* Full-Stack Web Development
* REST API Design
* Authentication & Authorization
* MongoDB Database Design
* State Management in React
* Backend Security Practices
* Deployment & Production Hosting
* Git & GitHub Workflow

---

## 🌟 Future Enhancements

* Online Payment Integration (Stripe/Razorpay)
* Product Search & Filtering
* Wishlist Functionality
* Product Reviews & Ratings
* Admin Dashboard Analytics
* Image Upload Support
* Email Notifications
* Order Tracking System

---

## 👩‍💻 Author

**Pooja Sripopuri**

Aspiring Full Stack Developer passionate about building scalable web applications and creating impactful digital experiences.

GitHub: https://github.com/poojasripopuri548-max

---

## 📜 License

This project is developed for educational, learning, and portfolio purposes.

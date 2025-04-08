# Forever

Forever is a clothing ecommerce website which allows user to add their products and have them purchased by others.

![s1](https://github.com/AkramExp/forever-ecommerce/blob/main/frontend/public/screenshot.png)

#### Live Site : https://forever-akramexp.vercel.app

## Features

Forever provides user a bunch of features in the website which are listed below

- **Authentication system allows sign up and login**
- **Browse and filter clothing by categories and subcategories**
- **Select product size and add items to cart**
- **Checkout with Razorpay, Stripe, or Cash on Delivery**
- **Place orders and view them in the orders page**
- **Track order status after purchase**
- **Add reviews and ratings to products**
- **Admin panel for managing the website**
- **Admin can add, update, or remove products with categories and subcategories**
- **Admin can track and update order statuses (e.g., Order Placed, Shipped, Out for Delivery)**

## Tech Stack

- **HTML**
- **Tailwind CSS**
- **Javascript**
- **Typescript**
- **React**
- **MongoDB**
- **Express**
- **Stripe**
- **Razorpay**

## Installation

### Start the frontend server

Add these env variables to your .env file in the root directory of frontend

```
VITE_BACKEND_URL = ""
VITE_RAZORPAY_KEY_ID = ""
```

Install Dependencies

```bash
npm install
```

Run the server

```bash
npm run dev
```

### Start the admin server

Add these env variables to your .env file in the root directory of frontend

```
VITE_BACKEND_URL = ""
```

Install Dependencies

```bash
npm install
```

Run the server

```bash
npm run dev
```

### Start the backend server

Add these env variables to your .env file in the root directory of backend

```
MONGO_URI = ""

CLOUDINARY_API_KEY = ""
CLOUDINARY_SECRET_KEY = ""
CLOUDINARY_NAME = ""

JWT_SECRET = ""

ADMIN_EMAIL = ""
ADMIN_PASSWORD = ""

STRIPE_SECRET_KEY = ""

RAZORPAY_KEY_ID = ""
RAZORPAY_KEY_SECRET = ""

```

Install Dependencies

```bash
npm install
```

Run the server

```bash
npm run dev
```

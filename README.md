# Product API  

## **Project Purpose & Overview**  
This project is designed to provide a robust API for managing e-commerce products using MongoDB and Mongoose. It supports CRUD operations on products, product category and includes user authentication via JWT for secure access. The API enables efficient e-commerce management by allowing users to create, retrieve, update, and delete products while ensuring data consistency and security.  

---

## **Current Progress**  
- Implemented core CRUD operations for products.  
- Implemented core CRUD operations for products category. 
- Added user authentication with JWT for secure access.  
- Included product quantity management and availability checks.  
- API is functional and can be tested via Postman or an integrated frontend.  

---

## **Next Steps for Project Completion**  
- Implement Product adding option for Product Type, Product Cart.  
- Creating, Updating the Product Cart.  
- Adding product search APIs.  
- Adding Payment Integration System.
- Implemented Back-End and Front-End Integration for the e-commerce app.   
  

---

## **Installation & Setup**  

1. **Clone the Repository:**  
   ```sh
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install Dependencies:**  
   ```sh
   npm install
   ```

3. **Set Up Environment Variables:**  
   Create a `.env` file and add your database connection string:  
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Server:**  
   ```sh
   npm start
   ```
   The API will be available at `http://localhost:5000`.

---

## **API Endpoints**  

### **1. Get All Products**  
**GET** `/api/products`  
- **Description:** Fetches all products from the database.  
- **Response:**  
  ```json
  [
    {
      "_id": "660b8f",
      "product_id": "101",
      "productName": "Laptop",
      "quantity": 50,
      "price": 1000
    }
  ]
  ```
- **Status Codes:**  
  - `200 OK` - Successfully fetched products.  
  - `500 Internal Server Error` - Database query failed.  

---

### **2. Get Product by ID**  
**GET** `/api/products/:id`  
- **Description:** Fetches a single product by its `product_id`.  
- **Example Request:**  
  ```sh
  GET /api/products/101
  ```
- **Response:**  
  ```json
  {
    "_id": "660b8f",
    "product_id": "101",
    "productName": "Laptop",
    "quantity": 50,
    "price": 1000
  }
  ```
- **Status Codes:**  
  - `200 OK` - Product found.  
  - `404 Not Found` - No product with the given ID.  
  - `500 Internal Server Error` - Query failed.  

---

### **3. Create a New Product**  
**POST** `/api/products`  
- **Description:** Adds a new product.  
- **Request Body:**  
  ```json
  {
    "product_id": "102",
    "productName": "Smartphone",
    "quantity": 100,
    "price": 700
  }
  ```
- **Response:**  
  ```json
  {
    "message": "Product Created Successfully.",
    "data": {
      "_id": "661b9f",
      "product_id": "102",
      "productName": "Smartphone",
      "quantity": 100,
      "price": 700
    }
  }
  ```
- **Status Codes:**  
  - `201 Created` - Product successfully added.  
  - `400 Bad Request` - Missing required fields.  

---

### **4. User Authentication (JWT)**  

This API provides user authentication using JWT (JSON Web Token). Users can register and log in to obtain a token for secure access.

#### **Register User**  
**POST** `/api/auth/register`  
- **Description:** Registers a new user.  
- **Request Body:**  
  ```json
  {
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**  
  ```json
  {
    "message": "User registered successfully"
  }
  ```
- **Status Codes:**  
  - `201 Created` - User registered successfully.  
  - `400 Bad Request` - Invalid input.  

#### **Login User**  
**POST** `/api/auth/login`  
- **Description:** Logs in a user and returns a JWT token.  
- **Request Body:**  
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**  
  ```json
  {
    "token": "your_jwt_token"
  }
  ```
- **Status Codes:**  
  - `200 OK` - Successfully logged in.  
  - `401 Unauthorized` - Invalid credentials.  
  - `500 Internal Server Error` - Server error.  

---

## **Technologies Used**  
- **Node.js** - Server-side JavaScript runtime.  
- **Express.js** - Web framework for Node.js.  
- **MongoDB** - NoSQL database for storing products and users.  
- **Mongoose** - ODM for MongoDB.  
- **JWT** - Authentication and authorization using JSON Web Token.  

---

## **Author**  
Developed by **[Your Name]**.  
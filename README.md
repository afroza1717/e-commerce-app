# e-commerce-app

📌 Installation & Setup

# Product API  

This API provides endpoints for managing products in a database using MongoDB and Mongoose. It includes operations for creating, retrieving, updating, deleting, and checking product quantity.  

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
   PORT=3000
   ```

4. **Run the Server:**  
   ```sh
   npm start
   ```
   The API will be available at `http://localhost:3000`.

---

## **API Endpoints**  

### **1. Get All Products**  
**GET** `/api/products`  
- **Description:** Fetches all products from the database.  
- **Response:**  
  ```json
  [
    {
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

### **4. Update Product**  
**PUT** `/api/products/:id`  
- **Description:** Updates a product's details.  
- **Example Request:**  
  ```sh
  PUT /api/products/102
  ```
- **Request Body:**  
  ```json
  {
    "productName": "Updated Smartphone",
    "quantity": 80
  }
  ```
- **Response:**  
  ```json
  {
    "_id": "661b9f",
    "product_id": "102",
    "productName": "Updated Smartphone",
    "quantity": 80,
    "price": 700
  }
  ```
- **Status Codes:**  
  - `200 OK` - Successfully updated.  
  - `404 Not Found` - Product does not exist.  
  - `500 Internal Server Error` - Database update failed.  

---

### **5. Delete Product**  
**DELETE** `/api/products/:id`  
- **Description:** Deletes a product.  
- **Example Request:**  
  ```sh
  DELETE /api/products/102
  ```
- **Response:**  
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```
- **Status Codes:**  
  - `200 OK` - Successfully deleted.  
  - `404 Not Found` - Product does not exist.  
  - `500 Internal Server Error` - Query failed.  

---

### **6. Update Product Quantity**  
**PATCH** `/api/products/:id/quantity`  
- **Description:** Updates the stock quantity of a product.  
- **Request Body:**  
  ```json
  {
    "quantity": 90
  }
  ```
- **Response:**  
  ```json
  {
    "product_id": "102",
    "productName": "Updated Smartphone",
    "quantity": 90,
    "price": 700
  }
  ```
- **Status Codes:**  
  - `200 OK` - Quantity updated.  
  - `404 Not Found` - Product does not exist.  
  - `500 Internal Server Error` - Query failed.  

---

### **7. Check Product Quantity**  
**GET** `/api/products/checkProductQuantity/:id/:givenQuantity`  
- **Description:** Checks if the given quantity is available in stock.  
- **Example Request:**  
  ```sh
  GET /api/products/102/check/50
  ```
- **Response (if quantity is available):**  
  ```json
  {
    "message": "Products Available"
  }
  ```
- **Response (if quantity is not available):**  
  ```json
  {
    "message": "Products Unavailable, Given quantity is greater than Total quantity"
  }
  ```
- **Status Codes:**  
  - `200 OK` - Sufficient quantity available.  
  - `404 Not Found` - Product does not exist or insufficient stock.  
  - `500 Internal Server Error` - Query failed.  

---

## **Technologies Used**  
- **Node.js** - Server-side JavaScript runtime.  
- **Express.js** - Web framework for Node.js.  
- **MongoDB** - NoSQL database for storing products.  
- **Mongoose** - ODM for MongoDB.  

---

## **Author**  
Developed by **[Syeda Afroza Hossain]**.  

## **License**  
This project is open-source.


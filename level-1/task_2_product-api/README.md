# Coveda Internship - Level 1: Task 2

A lightweight, robust RESTful API built with Node.js and Express to manage a product inventory resource. This task fulfills all Level 1 requirements including server deployment, CRUD routing initialization, request validation, and structured error handling.

## 🚀 Objectives Achieved

1. **Express Server Architecture:** Configured and deployed an active web server instance running locally on Port `3000`.
2. **RESTful CRUD Implementation:** Built endpoints to create, retrieve, update, and delete product records dynamically.
3. **Input Validation & Filtering:** Protected routes against invalid or malformed request payloads.
4. **Dynamic Product Mapping:** Automatically generates incremental product IDs.
5. **API Client Integration:** Successfully tested all endpoints using Thunder Client and Postman.
6. **Resilient Error Handling:** Returns clean HTTP `400 Bad Request` and `404 Not Found` responses for invalid operations.

---

## 📂 Project Workspace Structure

```text
coveda_internship/
└── level-1/
    └── task_2-product-api/
        ├── package.json
        └── server.js
```

---

## 🛠️ Installation & Setup

Follow these steps to run the environment locally:

1. Navigate directly into the task directory:

   ```bash
   cd level-1/task_2-product-api
   ```

2. Install required dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   node server.js
   ```

   _Terminal output:_

   ```bash
   SERVER_RESTARTED_SUCCESSFULLY
   ```

4. The API will now run locally at:

   ```text
   http://localhost:3000
   ```

---

## 📦 Product Resource Structure

Each product object contains:

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 999.99
}
```

---

# 🧪 API Test Specifications (Thunder Client / Postman)

## 1. Read All Products

- **Method:** `GET`
- **URL:** `http://localhost:3000/api/products`

### Expected Response

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 999.99
  },
  {
    "id": 2,
    "name": "Smartphone",
    "price": 499.99
  }
]
```

### Status Code

```text
200 OK
```

---

## 2. Create New Product

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/products`

### Headers

```json
{
  "Content-Type": "application/json"
}
```

### Body (raw JSON)

```json
{
  "name": "Wireless Mouse",
  "price": 25.5
}
```

### Expected Response

```json
{
  "id": 3,
  "name": "Wireless Mouse",
  "price": 25.5
}
```

### Status Code

```text
201 Created
```

---

## 3. Read Single Product

- **Method:** `GET`
- **URL:** `http://localhost:3000/api/products/1`

### Expected Response

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 999.99
}
```

### Status Code

```text
200 OK
```

---

## 4. Update Existing Product

- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/products/1`

### Body (raw JSON)

```json
{
  "name": "Gaming Laptop",
  "price": 1200
}
```

### Expected Response

```json
{
  "id": 1,
  "name": "Gaming Laptop",
  "price": 1200
}
```

### Status Code

```text
200 OK
```

---

## 5. Delete Product

- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/products/2`

### Expected Response

```json
{
  "message": "Product deleted successfully",
  "product": {
    "id": 2,
    "name": "Smartphone",
    "price": 499.99
  }
}
```

### Status Code

```text
200 OK
```

---

## 6. Failure Mode Handling Verification

### Missing Required Fields

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/products`

### Body

```json
{}
```

### Expected Response

```json
{
  "error": "Name and price are required"
}
```

### Status Code

```text
400 Bad Request
```

---

## 7. Invalid Price Validation

- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/products/1`

### Body

```json
{
  "name": "Monitor",
  "price": "abc"
}
```

### Expected Response

```json
{
  "error": "Price must be a valid number"
}
```

### Status Code

```text
400 Bad Request
```

---

## 8. Product Not Found Verification

- **Method:** `GET`
- **URL:** `http://localhost:3000/api/products/999`

### Expected Response

```json
{
  "error": "Product not found"
}
```

### Status Code

```text
404 Not Found
```

---

## 🧰 Technologies Used

- Node.js
- Express.js
- JavaScript
- RESTful API Architecture
- JSON Request Handling
- HTTP Methods (`GET`, `POST`, `PUT`, `DELETE`)
- Thunder Client
- Postman
- Visual Studio Code

---

## 📘 Learning Outcomes

Through this task, I learned how to:

- Configure and run an Express server
- Implement RESTful API routing
- Handle JSON request payloads safely
- Build CRUD operations for backend resources
- Validate incoming data before processing
- Return structured HTTP responses and status codes
- Test API endpoints using Thunder Client
- Organize backend projects for future frontend integration

---

## ✅ Task Completion Status

✔ Express Server Configured Successfully  
✔ CRUD Endpoints Functional  
✔ Input Validation Added  
✔ Error Handling Implemented  
✔ API Tested Successfully  
✔ Ready for Frontend Integration Later On

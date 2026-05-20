# Product API

A lightweight, robust RESTful API built with Node.js and Express to manage a production inventory resource.

## 🚀 Features

- **Express Server**: Web server running on Port 3000
- **RESTful CRUD Operations**: Query and manage product records with fields (id, name, price, availability)
- **API Testing**: Compatible with Thunder Client and Postman
- **Error Handling**: Resilient error handling with clean HTTP responses

## 📂 Project Structure

```
├── package.json
├── server.js
├── node_modules/
└── package-lock.json
```

## 🛠️ Installation & Setup

1. Install Node.js dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   node server.js
   ```
   The terminal will output: `Clean deployment running on port 3000`

## 📋 API Endpoints

- `GET /products` - Retrieve all products
- `POST /products` - Add a new product
- `GET /products/:id` - Get a specific product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

## 📦 Dependencies

- **express**: ^5.2.1
- **nodemon**: ^3.1.14 (dev)

## 📝 License

ISC

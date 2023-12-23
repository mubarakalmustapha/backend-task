# Full-Stack Engineer Take-Home Task: Backend Focus Overview.

## Table of Contents

User Authentication
Product Management
Testing
Project Structure

1:User Authentication

### Register User

Endpoint: POST /api/register
Description: Register a new user.
Parameters: name (string, required), email (string, required), password (string, required), userType (string, required).

### User Login

Endpoint: POST /api/login
Description: Authenticate user and generate JWT token.
Parameters: email (string, required), password (string, required).

## 2:Product Management

### Retrieve All Product Categories

Endpoint: GET /api/products
Description: Get all product categories available on the platform.

### Retrieve Products by Category

Endpoint: GET /api/products/:categoryId
Description: Get all products within a specific category.

### Create New Product (Vendor Only)

Endpoint: POST /api/products
Description: Create a new product.
Parameters: name (string, required), description (string, required), ingredients (string, required), categoryId (number, integer, required), defaultPrice (number, required), salesPrice (number, optional), productImage (string, optional), requiredOptions (array of objects, optional).

## 4:Testing Strategy and Instructions

### Jest for Unit Testing

### Unit Test Structure:

Each test file should correspond to a specific API endpoint or related functionalities.
Use Jest's describe and it blocks to clearly define test groups and individual tests.
Utilize assertion libraries like expect from Jest to verify expected outcomes from my code.

## 5: Project Structure

backend/
│
├── config/
│ ├── default.json
│ └── test.json
│
├── middleware/
│ ├── auth.js
│ ├── error.js
│ ├── vendor.js
│ └── validateObjectId.js
│
├── models/
│ ├── category.js
│ ├── product.js
│ └── user.js
│
├── routes/
│ ├── categories.js
│ ├── products.js
│ ├── users.js
│ └── auth.js
│
├── startup/
│ ├── db.js
│ ├── loggings.js
│ └── routes.js
│
├── tests/
│ └── unit/
│ ├── models/
│ │ ├── user.js
│ │ ├── category.js
│ │ └── product.js
│ └── ...
│
├── utils/
│ └── cloudinary.js
│
├── .env
├── index.js
├── README.md
└── sampleData.js

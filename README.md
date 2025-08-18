# User Management System (CRUD + Basic Authentication)

This is a basic User Management System built using **Node.js**, **Express.js** and **MongoDB** (via Mongoose), where we can:
-  Register users
-  Login using ID and password (password is hashed using bcrypt)
-  Manage employees (CRUD)

---

##  How to Run the App Locally

### 1. Clone the repo
```bash
git clone https://github.com/your-username/user_management_system.git
cd user_management_system
```

### 2. Install dependencies
```bash
# Install runtime dependencies
npm install express mongoose bcryptjs dotenv

# Install development dependencies (optional)
npm install --save-dev nodemon
```

### 3. Set up `.env` file
Create an `.env` file add:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/user_management_system
JWT_SECRET=mySecretJWTKey123!
```

> Note: JWT is not used in current version but kept for future expansion.

### 4. Start the server
```bash
npm start
```

---

##  API Endpoints (Use Thunder Client)

###  1. Register an User
```
POST /api/auth/register
```
**Body (JSON):**
```json
{
  "id": "emp001",
  "email": "ram001@gmail.com",
  "password": "Ram@0123",
  "firstName": "Ram",
  "lastName": "Kumar",
  "department": "IT",
  "salary": 60000
}
```

---

###  2. Login
```
POST /api/auth/login
```
**Body (JSON):**
```json
{
  "id": "rahul", // Example of unregistered user
  "password": "rahul@123" // / to test invalid login response
}
```

---

###  3. Get All Employees
```
GET /api/employees
```

---

###  4. Update Employee
```
PUT /api/employees/:employeeId
```
**Body (JSON):**
```json
{
  "department": "Cybersecurity",
  "salary": 70000,
  "firstName": "Ram",
  "lastName": "K"
}

```

---

###  5. Delete Employee
```
DELETE /api/employees/:employeeId
```

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs (for password hashing)
- dotenv (for environment variables)

---

##  Project Structure

```
- **index.js** - Main server file that starts the app
- **.env** - Stores environment variables like MONGO URI and port
- **config/**
  - **db.js** - Connects to MongoDB using Mongoose
- **models/**
  - **Employee.js** - Mongoose schema for employee records
- **routes/**
  - **auth.js** - Routes for user registration and login
  - **employee.js** - Routes for employee CRUD operations
- **middleware/**
  - **auth.js** - Middleware for JWT authentication (future use)
```

---

##  Status

 - Completed basic version with user registration, login and employee CRUD operations.
 - We can also view or verify users/employees in **MongoDB Compass** under the "user_management_system" database.

---

// loading .env variables
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db"); // database connection

// creating express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import and use routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);  // All routes inside auth.js will be prefixed with /api/auth

// Connecting to MongoDB
connectDB();


//  Test route for confirmation of server running
app.get("/", (req, res) => {
  res.send("User Management System Running" );
});

// adding employee routes
const employeeRoutes=require("./routes/employee");
app.use("/api/employees", employeeRoutes);

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

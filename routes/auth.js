const express=require("express");
const bcrypt=require("bcryptjs"); // password hashing
const router=express.Router();
const Employee=require("../models/Employee");

// POST /register
router.post("/register", async (req, res) => {
  const { id, email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await Employee.findOne({ email });// checking whether user already exists
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" }); // 400 bad request status code
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password,10); // salting technique and 10 = salt rounds

    // creating new employee with hashed password
    const newEmployee = new Employee({ id, email, password:hashedPassword, firstName, lastName}); // stored the hashed password

    await newEmployee.save();
    res.status(201).json({ message: "User registered successfully" }); // 201 created status code
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ message: "Server error"}); // 500 - Internal server error status code
  }
});

// POST/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // id is used as username for login purpose

  try{
    //checking whether user exists or not by id
    const user = await Employee.findOne({ email });
    if (!user ) {
      return res.status(401).json({ message: "Invalid email or password"}); // 401 unauthorized status code
    }

    // comparing the hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(200).json({ message: "Login successful"}); // 200 OK status code
    }
    else {
      return res.status(401).json({ message: "Invalid email or password"}); // 401 unauthorized status code
    }
  }
  catch (err) {
  console.error("Login Error:", err.message);
  res.status(500).json({message: "Server Error"}); // 500 Internal server error status code
  }
});

module.exports = router;

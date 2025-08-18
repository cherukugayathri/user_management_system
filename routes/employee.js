const express=require("express");
const bcrypt = require("bcryptjs");
const router=express.Router();
const Employee=require("../models/Employee");

// POST /employees - create a new employee (with dept & salary)
router.post("/", async (req, res) => {
    const { id, email, password, firstName, lastName, department, salary} = req.body;

    try {
        // checking whether employee already exists
        const existingEmployee = await Employee.findOne({ email });
        if(existingEmployee) {
            return res.status(400).json({ message: "Employee already exixts" });
        }

        // hashing password before saving
        const hashedPassword = await bcrypt.hash(password,10);

        // creating new employee
        const newEmployee = new Employee({ id, email, password:hashedPassword, firstName, lastName, department, salary});

        //saving employee in db
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee); // 201 - Created
    } catch (err) {
        console.error("POST Error:", err.message);
        res.status(500).json({ message: "Server Error" }); // 500 - Internal server error
    }
});
// GET /employees-get all registered employees
router.get("/",async(req,res) => {
    try {
        const employees=await Employee.find();
        res.json(employees);
    } catch(err) {
        console.error("GET ERROR:",err.message);
        res.status(500).json({message:"Server Error"}); // 500 - Internal server error status code
    }
});

//PUT /employees/:id - updating an employee
router.put("/:id",async(req,res) => {
    const {department, salary, firstName, lastName} =req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id, // gets employeeID from URL
            {department, salary, firstName, lastName},
            {new:true} // returns updated document
        );
        if (!updatedEmployee) {
            return res.status(404).json({message:"Employee not found"}); // 404 - not found status code
        }

        res.json(updatedEmployee);
    } catch(err) {
        console.error("PUT Error:", err.message);
        res.status(500).json({message:"Server Error"}); // 500 - Internal server error status code
    }
});

// DELETE /employees/:id - delete employee
router.delete("/:id", async(req,res) => {
    try {
        const deletedEmployee=await Employee.findByIdAndDelete(req.params.id);
        if(!deletedEmployee) {
            return res.status(404).json({message:"Employee not found"}); // 404 - not found status code
        }
        res.json({message:"Employee deleted"});
    } catch (err) {
        console.error("DELETE Error:",err.message);
        res.status(500).json({message: "Server error"}); // 500 - Internal server error status code
    }
});

module.exports=router;
const express=require("express");
const router=express.Router();
const Employee=require("../models/Employee");

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
    const {username, department, salary} =req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id, // gets employeeID from URL
            {username, department, salary},
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
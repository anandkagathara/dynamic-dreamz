const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.post("/register",authMiddleware, createEmployee);
router.get("/list", authMiddleware,getEmployees);
router.get("/get/:id",authMiddleware, getEmployeeById);
router.patch("/update/:id",authMiddleware, updateEmployee);
router.delete("/delete/:id",authMiddleware, deleteEmployee);

module.exports = router;

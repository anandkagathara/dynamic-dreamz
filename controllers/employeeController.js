const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const EmployeeValidator = require("../validators/employeeValidator");
const EmployeeService = require("../services/employeeService");

exports.createEmployee = async (req, res) => {
  try {
    await EmployeeValidator.createEmployeeValidator(req.body);
    const data = await EmployeeService.createEmployee(req.body, req.company.id);
    res.status(200).json({
      message: "Employee created successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    let { name, surname, position, salary } = req.query;

    //If no search criteria are provided, get all employees
    if (!name && !surname && !position && !salary) {
      name = surname = position = salary;
    }

    const employees = await EmployeeService.getEmployees(
      name,
      surname,
      position,
      salary
    );

    res.status(200).json({
      message: "Employee list retrieved successfully",
      employees: employees,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    await EmployeeValidator.updateEmployeeValidator(req.body);
    const employee = await EmployeeService.updateEmployee(
      req.params.id,
      req.body
    );
    res.status(200).json({
      message: "Employee updated successfully",
      employee: employee,
    });
  } catch (error) {
    if (error.message === "Employee not found") {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await EmployeeValidator.deleteEmployeeValidator(req.params);
    await EmployeeService.deleteEmployee(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

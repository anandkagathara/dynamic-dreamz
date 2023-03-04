const Joi = require("joi");
const Employee = require("../models/Employee");

const createEmployee = async (employeeData) => {
  const newEmployee = new Employee({
    name: employeeData.name,
    email: employeeData.email,
    surname: employeeData.surname,
    position: employeeData.position,
    department: employeeData.department,
    salary: employeeData.salary,
  });

  return await newEmployee.save();
};

const getEmployees = async (name, surname, position, salary) => {
  try {
    const query = {};

    if (name && typeof name === "string") {
      query.name = { $regex: name, $options: "i" };
    }
    if (surname && typeof surname === "string") {
      query.surname = { $regex: surname, $options: "i" };
    }
    if (position && typeof position === "string") {
      query.position = { $regex: position, $options: "i" };
    }
    if (salary && typeof salary === "number") {
      query.salary = salary;
    }

    const employees = await Employee.find(query);

    return employees;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving employees");
  }
};

const getEmployeeById = async (employeeId) => {
  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new Error("Employee not found");
  }
  return employee;
};

const updateEmployee = async (employeeId, employeeData) => {
  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new Error("Employee not found");
  }
  await Employee.findByIdAndUpdate(employeeId, employeeData);
  return await Employee.findById(employeeId);
};

const deleteEmployee = async (employeeId) => {
  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new Error("Employee not found");
  }
  return await employee.deleteOne();
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

const Joi = require("joi");
const Employee = require("../models/Employee");

const createEmployee = async (employeeData, companyId) => {
  const newEmployee = new Employee({
    name: employeeData.name,
    email: employeeData.email,
    surname: employeeData.surname,
    position: employeeData.position,
    department: employeeData.department,
    salary: employeeData.salary,
    company_id: companyId,
  });

  return await newEmployee.save();
};

const getEmployees = async (name, surname, position,salary) => {
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
    if (salary && typeof salary ) {
      query.salary = { $eq: salary };
    }

    const employees = await Employee.find(query);
    if (employees.length == 0) {
      return { message: "No Employee" };
    }
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
  const { name, surname, position, department, salary } = employeeData;
  if (name) {
    employee.name = name;
  }
  if (surname) {
    employee.surname = surname;
  }
  if (position) {
    employee.position = position;
  }
  if (department) {
    employee.department = department;
  }
  if (salary) {
    employee.salary = salary;
  }
  await employee.save();
  return employee;
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

const Joi = require("joi");
const Employee = require("../models/Employee");

const createEmployeeValidator = (employeeData) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    position: Joi.string().required(),
    department: Joi.string().required(),
    salary: Joi.number().required(),
  });

  const { error } = schema.validate(employeeData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};

const getEmployeeValidator = (employeeData) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    surname: Joi.string().optional(),
    position: Joi.string().optional(),
    salary: Joi.number().optional(),
  });

  const { error } = schema.validate(employeeData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};

const updateEmployeeValidator = (employeeData) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    surname: Joi.string().optional(),
    position: Joi.string().optional(),
    department: Joi.string().optional(),
    salary: Joi.number().optional(),
  });

  const { error } = schema.validate(employeeData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};

const deleteEmployeeValidator = (employeeData) => {
  const schema = Joi.object({
    id: Joi.string().optional(),
  });

  const { error } = schema.validate(employeeData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};

module.exports = {
  createEmployeeValidator,
  getEmployeeValidator,
  updateEmployeeValidator,
  deleteEmployeeValidator,
};

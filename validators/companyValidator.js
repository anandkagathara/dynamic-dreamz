const Joi = require("joi");

const registerCompanyValidator = (companyData) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.number().required(),
  });

  const { error } = schema.validate(companyData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};

const loginCompanyValidator = (companyData) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(companyData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};




module.exports = {
  registerCompanyValidator,
  loginCompanyValidator,
};

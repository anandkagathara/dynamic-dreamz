const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Company = require("../models/company");

const registerCompany = async (companyData) => {
  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(companyData.password, saltRounds);

  const newCompany = new Company({
    name: companyData.name,
    address: companyData.address,
    email: companyData.email,
    phone: companyData.phone,
    password: hashedPassword,
  });

  return await newCompany.save();
};

const loginCompany = async (loginData) => {
  const { email, password } = loginData;
  const company = await Company.findOne({ email });
  if (!company) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, company.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  function generateToken(company) {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: company._id }, jwtSecret, {
      expiresIn: "30d",
    });
    return token;
  }

  const token = generateToken(company);
  company.loggedIn = true;
  await company.save();
  return token;
};

const logoutCompany = async (companyId) => {
  await Company.findByIdAndUpdate(
    { _id: companyId },
    { loggedIn: false },
    { new: true }
  );
};

module.exports = {
  registerCompany,
  logoutCompany,
  loginCompany,
};

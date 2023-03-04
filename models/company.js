const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  loggedIn: { type: Boolean, default: false }
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
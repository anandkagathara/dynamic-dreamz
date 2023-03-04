const {
  registerCompany,
  logoutCompany,
  loginCompany,
} = require("../services/companyService");
const CompanyValidator = require("../validators/companyValidator");

exports.register = async (req, res) => {
  try {
    await CompanyValidator.registerCompanyValidator(req.body);
    const data = await registerCompany(req.body);
    res.json({ data, message: "Company registered successfully" });
  } catch (error) {
    const statusCode = error.statusCode || 500; // Internal Server Error
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message });
  }
};

exports.login = async (req, res) => {
  try {
    await CompanyValidator.loginCompanyValidator(req.body);
    const token = await loginCompany(req.body);

    res.status(200).json({
      status: "success",
      message: "Company login successfully",
      data: {
        token,
      },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500; // Internal Server Error
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message });
  }
};

exports.logout = async (req, res) => {
  try {
    await logoutCompany(req.params.id);
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

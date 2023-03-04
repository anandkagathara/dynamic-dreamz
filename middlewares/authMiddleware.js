const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Company = mongoose.model('Company');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findOne({_id: decodedToken.id ,loggedIn : true});

    if (!company) {
      throw new Error('Company not found');
    }
    req.company = company;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized access',
    });
  }
};

module.exports = authMiddleware;

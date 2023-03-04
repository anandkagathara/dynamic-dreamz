const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const companyRoutes = require('./routes/companyRoute');
const employeeRoutes = require('./routes/employeeRoute');

const app = express();

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dynamic-dreamz', { useNewUrlParser: true, useUnifiedTopology: true });

// Use routes
app.use('/company', companyRoutes);
app.use('/employee', employeeRoutes);

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});

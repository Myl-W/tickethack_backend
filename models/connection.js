require("dotenv").config();
const mongoose = require('mongoose');
const connectionString = process.env.DB_CONNECTION;

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
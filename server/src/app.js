const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cloudinary = require('cloudinary');

const apiRoute = require('./route/api.route');

const app = express();

require('dotenv').config();
app.use(cors());
app.use(morgan('common'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./helpers/db');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const buildPath = path.join(__dirname, '..', '..', 'build');
app.use('/', express.static(buildPath));

app.use('/api', apiRoute);

app.use(function (req, res, next) {
  const notFoundUrl = req.originalUrl;

  next({
    message: `${notFoundUrl} - not found!`,
    status: 404,
  });
});

app.use(function (e, req, res, next) {
  // const errorMessage = e.message || "Internal server error";
  // const errorStatus = e.status || 500;

  res.status(e.status || 400).json({
    error: e,
    // status: errorStatus,
  });
});

app.listen(process.env.PORT, function () {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});

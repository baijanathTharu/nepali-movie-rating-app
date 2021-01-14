const cloudinary = require('cloudinary');
const path = require('path');

const ENV = process.env.ENVIRONMENT;
const buildPath = path.join(__dirname, '..', '..', '..', 'build');

module.exports = function (req, res, next) {
  if (ENV === 'production') {
    cloudinary.v2.uploader.upload(
      path.join(buildPath, '/', req.file.filename),
      { folder: 'movie-rating-app-github/movie-images' },
      function (err, result) {
        if (err) {
          return next({ message: 'Image not uploaded!', status: 500 });
        }
        req.movie_image_url = result.url;
        next();
      }
    );
  } else {
    cloudinary.v2.uploader.upload(
      path.join(process.cwd(), `uploads/images/${req.file.filename}`),
      { folder: 'movie-rating-app-github/movie-images' },
      function (err, result) {
        if (err) {
          return next({ message: 'Image not uploaded!', status: 500 });
        }
        req.movie_image_url = result.url;
        next();
      }
    );
  }
};

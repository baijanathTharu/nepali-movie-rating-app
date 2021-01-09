const fs = require('fs');
const cloudinary = require('cloudinary');
const path = require('path');

module.exports = function (req, res, next) {
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
};

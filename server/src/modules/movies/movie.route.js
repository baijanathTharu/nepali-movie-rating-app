const router = require('express').Router();
const paginate = require('../../middlewares/paginate');

const movieController = require('./movie.controller');
const imageUploader = require('../../middlewares/image.uploader');
const cloudinaryUploader = require('../../middlewares/image.cloudinary.uploader');

router
  .route('/')
  .get(paginate, movieController.get)
  .post(
    imageUploader.single('image'),
    cloudinaryUploader,
    movieController.create
  );

router
  .route('/search')
  .post(movieController.search)
  .get(movieController.search);

router
  .route('/:id')
  .get(movieController.getById)
  .put(
    imageUploader.single('image'),
    cloudinaryUploader,
    movieController.update
  )
  .delete(movieController.remove);

module.exports = router;

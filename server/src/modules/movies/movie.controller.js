const fs = require('fs');
const path = require('path');

const MovieQuery = require('./movie.query');

function get(req, res, next) {
  let condition = {};
  const { page, limit } = req;
  MovieQuery.fetch(condition, page, limit)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (e) {
      next(e);
    });
}

function getById(req, res, next) {
  let condition = {
    _id: req.params.id,
  };
  MovieQuery.fetch(condition)
    .then(function (data) {
      res.json(data.movie[0]);
    })
    .catch(function (e) {
      next(e);
    });
}

function create(req, res, next) {
  const data = req.body;

  // if error in filetype
  if (req.fileTypeError)
    return next({
      message: 'Invalid File Format',
      status: 400,
    });

  // if image is uploaded
  if (req.file) data.images = [req.file.filename];

  // get image url from cloudinary
  if (!req.movie_image_url)
    return next({ message: 'Image not uploaded!', status: 402 });

  data.imageUrl = req.movie_image_url;

  MovieQuery.insert(data)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (e) {
      next(e);
    });
}

function update(req, res, next) {
  const data = req.body;

  // if error in filetype
  if (req.fileTypeError)
    return next({
      message: 'Invalid File Format',
      status: 400,
    });

  // if image is uploaded
  if (req.file) {
    data.images = [req.file.filename];
  }

  // get image url from cloudinary
  if (!req.movie_image_url)
    return next({ message: 'Image not uploaded!', status: 402 });

  data.imageUrl = req.movie_image_url;

  MovieQuery.update(req.params.id, data)
    .then(function (data) {
      if (data.oldImageName) {
        fs.unlink(
          path.join(process.cwd(), `uploads/images/${data.oldImageName}`),
          function (e, done) {
            if (e) return next(e);
            console.log(`${data.oldImageName} has been deleted.`);
          }
        );
      }
      res.json(data.updated);
    })
    .catch(function (e) {
      next(e);
    });
}

function remove(req, res, next) {
  MovieQuery.remove(req.params.id)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (e) {
      next(e);
    });
}

function search(req, res, next) {
  const searchCondition = {};
  MovieQuery.fetch(searchCondition)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (e) {
      next(e);
    });
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  search,
};

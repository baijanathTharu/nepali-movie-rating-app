const MovieModel = require('./movie.model');

function mapMovieReqData(movieDetails, movie) {
  if (movieDetails.title) movie.title = movieDetails.title;
  if (movieDetails.description) movie.description = movieDetails.description;
  if (movieDetails.duration) movie.duration = movieDetails.duration;
  if (movieDetails.releaseDate) movie.releaseDate = movieDetails.releaseDate;
  if (movieDetails.trailerLink) movie.trailerLink = movieDetails.trailerLink;
  if (movieDetails.genre) movie.genre = movieDetails.genre.split(',');
  if (movieDetails.tags) movie.tags = movieDetails.tags.split(',');
  if (movieDetails.castCrew) movie.castCrew = movieDetails.castCrew.split(',');
  if (movieDetails.directors)
    movie.directors = movieDetails.directors.split(',');
  if (movieDetails.awards) movie.awards = movieDetails.awards.split(',');
  if (movieDetails.songs) movie.songs = movieDetails.songs.split(',');
  if (movieDetails.images) movie.images = movieDetails.images;
  if (movieDetails.imageUrl) movie.imageUrl = movieDetails.imageUrl;
}

function mapRatingData(rating, ratingData) {
  if (ratingData.point) rating.point = ratingData.point;
  if (ratingData.message) rating.message = ratingData.message;
  if (ratingData.user) rating.user = ratingData.user;
  return rating;
}

function fetch(condition, page, limit) {
  return new Promise(function (resolve, reject) {
    MovieModel.find(condition, function (e, movie) {
      if (e) return reject(e);
      if (movie.length === 0)
        return reject({ message: 'Movie not found', status: 404 });
      MovieModel.count(function (e, count) {
        if (e) return reject(e);
        let moviesCount = count;
        resolve({
          movie: movie,
          totalPages: Math.ceil(moviesCount / limit),
          currentPage: page,
        });
      });
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
  });
}

function insert(data) {
  const movie = new MovieModel();
  mapMovieReqData(data, movie);

  return movie.save();
}

function update(id, data) {
  return new Promise(function (resolve, reject) {
    MovieModel.findById(id, function (e, movie) {
      if (e) return reject(e);
      if (!movie) return reject({ message: 'Movie not found', status: 404 });

      // finding old image name
      let oldImageName = '';
      if (movie.images[0]) {
        oldImageName = movie.images[0];
      }

      mapMovieReqData(data, movie);

      movie.save(function (e, updated) {
        if (e) return reject(e);
        return resolve({ updated, oldImageName });
      });
    });
  });
}

function remove(id) {
  return new Promise(function (resolve, reject) {
    MovieModel.findById(id, function (e, movie) {
      if (e) return reject(e);
      if (!movie) return reject({ message: 'Movie not found', status: 404 });

      movie.remove(function (e, deleted) {
        if (e) return reject(e);
        return resolve(deleted);
      });
    });
  });
}

function addRating(id, ratingData) {
  return new Promise(function (resolve, reject) {
    MovieModel.findById(id, function (err, movie) {
      if (err) {
        return reject(err);
      }
      if (!movie) {
        return reject({
          msg: 'Movie Not Found',
          status: 404,
        });
      }
      const rating = mapRatingData({}, ratingData);
      movie.ratings.push(rating);
      movie.save(function (err, done) {
        if (err) {
          return reject(err);
        }
        resolve(done);
      });
    });
  });
}

function searchQuery(condition, page, limit) {
  return new Promise(function (resolve, reject) {
    MovieModel.find(condition, function (e, data) {
      if (e) return reject(e);
      if (!data.length)
        return reject({
          msg: 'Nothing found',
          status: 404,
        });
      MovieModel.countDocuments(function (e, count) {
        if (e) return reject(e);
        resolve({
          data: data,
          totalPages: condition.title
            ? Math.ceil(data.length / limit)
            : Math.ceil(count / limit),
          currentPage: page,
        });
      });
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
  });
}

module.exports = {
  fetch,
  insert,
  update,
  remove,
  addRating,
  searchQuery,
};

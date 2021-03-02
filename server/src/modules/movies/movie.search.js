const searchQuery = require('./movie.query').searchQuery;

module.exports = function (req, res, next) {
  const { name, id, genre, page = 1, limit = 5 } = req.query;
  let condition = {};
  if (name) {
    condition.title = name;
  }

  if (genre) {
    condition.genre = genre;
  }

  if (id) {
    condition._id = id;
  }

  searchQuery(condition, page, limit)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (e) {
      next(e);
    });
};

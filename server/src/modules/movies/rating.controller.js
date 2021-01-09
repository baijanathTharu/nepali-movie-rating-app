const rateQuery = require('./movie.query').addRating;

module.exports = function (req, res, next) {
  var ratingData = req.body;
  ratingData.user = req.userId;

  rateQuery(req.params.id, ratingData)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
};

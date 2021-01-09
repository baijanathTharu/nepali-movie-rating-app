module.exports = function (req, res, next) {
  const { page = 1, limit = 10 } = req.query;
  req.page = page;
  req.limit = limit;
  next();
};

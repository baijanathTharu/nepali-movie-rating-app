const UserModel = require('../modules/users/user.model');

module.exports = function (req, res, next) {
  UserModel.findById(req.userId, function (e, user) {
    if (e) return next(e);
    if (user.status === 'active') {
      return next();
    }
    next({
      msg: 'Please verify your email to start rating movie!',
      status: 403,
    });
  });
};

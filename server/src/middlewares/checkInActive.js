const UserModel = require('../modules/users/user.model');

module.exports = function (req, res, next) {
  UserModel.findById(req.params.userId, function (e, user) {
    if (e) return next(e);
    if (user.status === 'active') {
      return next({
        msg: 'Your email is already verified!',
        status: 200,
      });
    }
    next();
  });
};

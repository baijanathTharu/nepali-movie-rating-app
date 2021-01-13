const UserModel = require('../modules/users/user.model');
const SecretModel = require('../modules/users/secret/secret.model');

module.exports = function (req, res, next) {
  const { userId, code } = req.params;

  SecretModel.find({ code: code }, function (err, secretDoc) {
    if (err)
      return next({ msg: 'Verification details do not match!', status: 400 });
    UserModel.findById(userId, function (err, user) {
      if (user.status === 'inactive') {
        user.status = 'active';

        user.save(function (err, updatedUser) {
          if (err) return next({ msg: 'Something went wrong!', status: 400 });
          res.json({
            msg: 'Your email is verified! You can start rating movies now.',
          });
        });
      }
    });
  });
};

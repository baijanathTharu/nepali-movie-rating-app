const UserModel = require('../user.model');
const checkPassword = require('../../../helpers/securePassword').checkPassword;
const signToken = require('../../../helpers/tokenAuth').signToken;

function login(req, res, next) {
  const data = req.body;
  UserModel.findOne(
    { $and: [{ username: data.username }, { email: data.email_address }] },
    function (e, user) {
      if (e) return next(e);
      if (!user)
        return next({
          message: 'Username or email not registered.',
          status: 404,
        });
      checkPassword(data.password, user.password)
        .then(function (isMatched) {
          if (!isMatched)
            next({
              message: 'Username or password do not match.',
              status: 403,
            });
          if (isMatched) {
            signToken(user._id)
              .then(function (token) {
                res.json({ user, token });
              })
              .catch(function (e) {
                next(e);
              });
          }
        })
        .catch(function (e) {
          next(e);
        });
    }
  );
}

module.exports = {
  login,
};

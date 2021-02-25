const verifyToken = require('../helpers/tokenAuth').verifyToken;
const UserModel = require('../modules/users/user.model');

module.exports = function (req, res, next) {
  let token;
  if (req.headers['authorization']) token = req.headers['authorization'];
  if (req.headers['x-acces-token']) token = req.headers['x-acces-token'];
  if (req.headers['token']) token = req.headers['token'];
  if (req.query['token']) token = req.query['token'];

  if (!token) return next({ message: 'Not authenticated', status: 400 });

  if (token) {
    verifyToken(token)
      .then(function (decoded) {
        UserModel.findOne({ _id: decoded.id }, function (e, data) {
          if (e) return next(e);
          if (data) {
            req.userId = data._id;
            next();
          }
        });
      })
      .catch(function (e) {
        next(e);
      });
  }
};

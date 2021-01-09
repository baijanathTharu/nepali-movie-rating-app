const UserModel = require("../modules/users/user.model");

module.exports = function (req, res, next) {
  UserModel.findById(req.userId).then(function (user) {
    if (!user) return next({ message: "User not found" });
    if (user.role != 0) return next({ message: "Unauthorized", status: 401 });
    if (user.role === 0) {
      req.role = 0;
      return next();
    }
  });
};

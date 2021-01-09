const jwt = require("jsonwebtoken");

function signToken(data) {
  return new Promise(function (resolve, reject) {
    jwt.sign({ id: data }, process.env.SECRET_KEY, function (e, token) {
      if (e) reject(e);
      resolve(token);
    });
  });
}

function verifyToken(data) {
  return new Promise(function (resolve, reject) {
    jwt.verify(data, process.env.SECRET_KEY, function (e, decoded) {
      if (e) reject(e);
      resolve(decoded);
    });
  });
}

module.exports = {
  signToken,
  verifyToken,
};

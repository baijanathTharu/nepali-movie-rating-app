const bcrypt = require('bcrypt');

function encryptPassword(data) {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(5, function (e, salt) {
      if (e) return reject(e);
      bcrypt.hash(data, salt, function (e, hashed) {
        if (e) return reject(e);
        return resolve(hashed);
      });
    });
  });
}

function checkPassword(plainPassword, hashedPassword) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(plainPassword, hashedPassword, function (e, isMatched) {
      if (e) return reject(e);
      return resolve(isMatched);
    });
  });
}

module.exports = { encryptPassword, checkPassword };

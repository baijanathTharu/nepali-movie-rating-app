const SecretModel = require('./secret.model');

function mapDataToSecret(data, secret) {
  if (data.email) secret.email = data.email;
  if (data.code) secret.code = data.code;
}

function insertSecret(data) {
  const newSecret = new SecretModel({});

  mapDataToSecret(data, newSecret);

  return new Promise(function (resolve, reject) {
    newSecret.save(function (e, doc) {
      if (e) return reject(e);

      resolve(doc);
    });
  });
}

module.exports = insertSecret;

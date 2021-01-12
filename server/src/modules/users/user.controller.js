const path = require('path');
const fs = require('fs');

const UserQuery = require('./user.query');
const encryptPassword = require('../../helpers/securePassword').encryptPassword;
const insertSecret = require('./secret/secret.query');
const generateCode = require('../../helpers/generateCode');

function get(req, res, next) {
  const condition = {};

  UserQuery.fetch(condition)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (e) {
      next(e);
    });
}

function getById(req, res, next) {
  const condition = { _id: req.params.id };

  UserQuery.fetch(condition)
    .then(function (data) {
      res.json(data[0]);
    })
    .catch(function (e) {
      next(e);
    });
}

function create(req, res, next) {
  const data = req.body;

  // console.log('data registering: ', data);

  function query() {
    UserQuery.insert(data)
      .then(function (data) {
        const secretObj = {};
        secretObj.email = req.body.email_address;
        secretObj.code = generateCode(req.body.username);
        console.log('secretCode: ', secretObj);
        insertSecret(secretObj).then(function (doc) {
          // TODO:: sanitize data before sending
          res.json(data);
        });
      })
      .catch(function (e) {
        if (e.name === 'MongoError') {
          return next({ message: e.keyValue, status: 403 });
        }
        next(e);
      });
  }

  if (req.fileTypeError) {
    return next({
      message: 'Invalid File Format',
      status: 400,
    });
  }

  if (req.file) data.image = req.file.filename;

  // encrypt the password
  if (data.password) {
    encryptPassword(data.password)
      .then(function (hashed) {
        data.password = hashed;
        query();
      })
      .catch(function (e) {
        next(e);
      });
  }

  if (!data.password) {
    query();
  }
}

function update(req, res, next) {
  const data = req.body;

  // Query function
  function query() {
    UserQuery.update(req.params.id, data)
      .then(function (data) {
        // if an image is not uploaded, no need to delete image
        if (!req.file) return res.json(data.updated);

        // delete image
        if (data.oldImageName) {
          fs.unlink(
            path.join(process.cwd(), `uploads/images/${data.oldImageName}`),
            function (e, done) {
              if (e) return next(e);
              console.log(`${data.oldImageName} has been deleted.`);
              res.json(data.updated);
            }
          );
        }
      })
      .catch(function (e) {
        next(e);
      });
  }

  if (req.fileTypeError) {
    return next({
      message: 'Invalid File Format',
      status: 400,
    });
  }

  if (req.file) data.image = req.file.filename;

  // encrypt the password
  if (data.password) {
    encryptPassword(data.password)
      .then(function (hashed) {
        data.password = hashed;
        // call query to update
        query();
      })
      .catch(function (e) {
        next(e);
      });
  }

  if (!data.password) {
    query();
  }
}

function remove(req, res, next) {
  UserQuery.remove(req.params.id)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (e) {
      next(e);
    });
}

function search(req, res, next) {
  const searchCondition = {};

  UserQuery.fetch(searchCondition)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (e) {
      next(e);
    });
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  search,
};

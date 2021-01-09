const UserModel = require("./user.model");

function mapUserReqData(userDetails, user) {
  if (userDetails.username) user.username = userDetails.username;
  if (userDetails.fullname) user.fullname = userDetails.fullname;
  if (userDetails.email_address) user.email = userDetails.email_address;
  if (userDetails.password) user.password = userDetails.password;
  if (userDetails.dob) user.dob = userDetails.dob;
  if (userDetails.gender) user.gender = userDetails.gender;
  if (userDetails.permanent_address)
    user.address.permAddress = userDetails.permanent_address;
  if (userDetails.temp_address)
    user.address.tempAddress = userDetails.temp_address.split(",");
  if (userDetails.image) user.image = userDetails.image;
  if (userDetails.role) user.role = userDetails.role;
  // TODO:: status
}

function insert(data) {
  const user = new UserModel({});

  mapUserReqData(data, user);

  return user.save();
}

function fetch(condition) {
  return new Promise(function (resolve, reject) {
    UserModel.find(condition, function (e, user) {
      if (e) return reject(e);
      if (user.length === 0)
        return reject({ message: "User not found", status: 404 });
      resolve(user);
    });
  });
}

function update(id, data) {
  return new Promise(function (resolve, reject) {
    UserModel.findById(id, function (e, user) {
      if (e) return reject(e);
      if (!user) return resolve({ message: "User not found", status: 404 });

      // finding old image name
      let oldImageName = "";
      if (user.image) {
        oldImageName = user.image;
      }

      // user found update it
      mapUserReqData(data, user);

      user.save(function (e, updated) {
        if (e) return reject(e);
        return resolve({ updated, oldImageName });
      });
    });
  });
}

function remove(id) {
  return new Promise(function (resolve, reject) {
    UserModel.findById(id, function (e, user) {
      if (e) return reject(e);
      if (!user) return reject({ message: "User not found", status: 404 });

      // user found, delete it
      // TODO:: delete his images also
      user.remove(function (e, deleted) {
        if (e) return reject(e);
        return resolve(deleted);
      });
    });
  });
}

module.exports = {
  insert,
  fetch,
  update,
  remove,
};

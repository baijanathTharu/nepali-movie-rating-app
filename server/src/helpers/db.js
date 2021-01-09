const mongoose = require("mongoose");

function connectDb() {
  return mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
}

connectDb()
  .then(function (data) {
    console.log("connected to database");
  })
  .catch(function (e) {
    console.log("Error connecting to database: ", e);
  });

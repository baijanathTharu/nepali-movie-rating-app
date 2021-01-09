const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads/images"));
  },
});

// if file type is image then upload
function imageFilter(req, file, cb) {
  const mimeType = file.mimetype.split("/")[0];

  if (mimeType === "image") {
    cb(null, true);
  } else {
    req.fileTypeError = true;
    cb(null, false);
  }
}

const imageUploader = multer({
  storage: diskStorage,
  fileFilter: imageFilter,
});

module.exports = imageUploader;

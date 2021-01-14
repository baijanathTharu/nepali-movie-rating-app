const multer = require('multer');
const path = require('path');

const ENV = process.env.ENVIRONMENT;

const buildPath = path.join(__dirname, '..', '..', '..', 'build');

const diskStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
  destination:
    ENV === 'production'
      ? function (req, file, cb) {
          cb(null, buildPath);
        }
      : function (req, file, cb) {
          cb(null, path.join(process.cwd(), 'uploads/images'));
        },
});

// if file type is image then upload
function imageFilter(req, file, cb) {
  const mimeType = file.mimetype.split('/')[0];

  if (mimeType === 'image') {
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

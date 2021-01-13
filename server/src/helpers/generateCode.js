const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY_FOR_VERIFICATION_CODE;

function generateCode(username, secret = SECRET_KEY) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(username)
    .digest('hex');
  // console.log('hash: ', hash);
  return hash;
}

module.exports = generateCode;

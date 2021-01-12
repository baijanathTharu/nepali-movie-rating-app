const crypto = require('crypto');

const SECRET_KEY =
  process.env.SECRET_KEY_FOR_VERIFICATION_CODE || 'generate12345_code';

function generateCode(username, secret = SECRET_KEY) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(username)
    .digest('hex');
  console.log('hash: ', hash);
  return hash;
}

module.exports = generateCode;

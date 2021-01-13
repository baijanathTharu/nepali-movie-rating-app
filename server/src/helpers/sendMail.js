const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const senderMailAddress = process.env.SENDER_MAIL_ADDRESS;
const senderMailAddressPass = process.env.SENDER_MAIL_ADDRESS_PASS;

function sendMail(receiverAddress, verificationLink) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderMailAddress,
      pass: senderMailAddressPass,
    },
  });

  const mailOptions = {
    from: '"Nepali Movie Rating" <nepalimovierating@gmail.com>', // sender address
    to: receiverAddress, // list of receivers
    subject: 'Verify Your Email Account', // Subject line
    html: `
    <table cellspacing="2" cellpadding="0" border="0" width="100%">
      <tr>
        <td style="margin: 20px 10px;" bgcolor="wheat">
          <h1 style="color: orangered; margin-left: 20px;">Nepali Movie Rating</h1>
          <h3 style="font-size: 14px; margin-left: 20px">Please Verify Your Account</h3>
          <a href=${verificationLink} style="text-decoration: none; margin-left: 20px">
            <span
              style="
                padding: 10px 15px;
                cursor: pointer;
                background-color: black;
                color: wheat;
                font-size: 14px;
                font-weight: bold;
                border: 0;
                outline: none;
              "
            >
              Verify
            </span>
          </a>
        </td>
      </tr>
    </table>
    `, // html body
  };

  // let info = transporter.sendMail(mailOptions);

  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailOptions, function (err, mailSentInfo) {
      if (err) {
        console.log('mailerr: ', err);
        return reject('Sending mail failed!');
      }
      resolve(mailSentInfo.messageId);
    });
  });

  // console.log('Message sent: %s', info.messageId);
}

module.exports = sendMail;

// Testing function
// sendMail(
//   'bnchaudhary.tharu@gmail.com',
//   'https://nepalimovierating.herokuapp.com'
// )
//   .then(function (data) {
//     console.log('data: ', data);
//   })
//   .catch(function (e) {
//     console.log('err: ', e);
//   });

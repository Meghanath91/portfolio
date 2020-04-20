function nodeMailer(msg) {

  const nodemailer = require("nodemailer");
  /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
here we are using gmail as our service
In Auth object , we specify our email and password
*/
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL, //replace with your email
      pass: process.env.ADMIN_PASSWORD, //replace with your password
    },
  });

  const adminMail =`
  <h2>Contact details</h2>
  <h5> name:${msg.fullName} </h5><br>
  <h5> Email:${msg.Email} </h5><br>
  <h5> subject: ${msg.Subject} </h5>
  <p>${msg.Message}</p>
  ` ;

  const clientMail = `
  <h4>Thank you ${msg.fullName} for reaching out !</h4><br>
  <p> I will get back to you within 1-2 business days. You can also reach out to me on +1 647-528-7504 for urgent enquiries.</p>
  <br>
  <p>Regards,</p>
  <h5>Meghanath </h5>
  `

  const mailClient = {
    from: process.env.ADMIN_EMAIL, //replace with your email
    to: msg.Email, //replace with your email
    subject: `Thank you `,
    html: clientMail
  };

  const mailAdmin = {
    from: process.env.ADMIN_EMAIL, //replace with your email
    to: process.env.MY_EMAIL, //replace with your email
    subject: msg.Subject,
    html: adminMail
  };

  transporter.sendMail(mailAdmin, function (res, error, info) {
    if (error) {
      console.log(error);
      // res.send("error"); // if error occurs send error as response to client
    } else {
      console.log("Email sent: ");
      // res.send("Sent Successfully"); //if mail is sent successfully send Sent successfully as response
    }
  });

  transporter.sendMail(mailClient, function (res, error, info) {
    if (error) {
      console.log(error);
      // res.send("error"); // if error occurs send error as response to client
    } else {
      console.log("Email sent: ");
      // res.send("Sent Successfully"); //if mail is sent successfully send Sent successfully as response
    }
  });

  // app.listen(1234);
}

module.exports = nodeMailer;

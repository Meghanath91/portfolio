function nodeMailer(msg) {
  const nodemailer = require("nodemailer");
  /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
here we are using gmail as our service
In Auth object , we specify our email and password
*/
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "meghanath.balaji@gmail.com", //replace with your email
      pass: "SANju9495*", //replace with your password
    },
  });

  const mailClient = {
    from: "meghanath.balaji@gmail.com", //replace with your email
    to: msg.Email, //replace with your email
    subject: `Thank you `,
    html: `<h4>Thank you ${msg.fullName} for reaching me out !<h2>
    <p> I will get back to you within 1-2 business days</p>`
  };

  const mailAdmin = {
    from: "meghanath.balaji@gmail.com", //replace with your email
    to: "meghanath.balaji@gmail.com", //replace with your email
    subject: msg.Subject,
    html: `<h2>Contact details</h2>
    <h5> name:${msg.fullName} </h5><br>
    <p>${msg.Message}</p>`,
  };

  transporter.sendMail(mailAdmin, function (res, error, info) {
    if (error) {
      console.log(error);
      res.send("error"); // if error occurs send error as response to client
    } else {
      console.log("Email sent: " + info.response);
      res.send("Sent Successfully"); //if mail is sent successfully send Sent successfully as response
    }
  });

  transporter.sendMail(mailClient, function (res, error, info) {
    if (error) {
      console.log(error);
      res.send("error"); // if error occurs send error as response to client
    } else {
      console.log("Email sent: " + info.response);
      res.send("Sent Successfully"); //if mail is sent successfully send Sent successfully as response
    }
  });

  // app.listen(1234);
}

module.exports = nodeMailer;

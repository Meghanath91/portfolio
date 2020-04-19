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

  const adminMail =`
  <style>
  body {
    background-image:url("https://images.unsplash.com/photo-1509641498745-13c26fd1ed89?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")
  }
  </style>
  <body>
  <h2>Contact details</h2>
  <h5> name:${msg.fullName} </h5><br>
  <h5> subject: ${msg.Subject} </h5>
  <p>${msg.Message}</p>
  </body>
  ` ;

  const clientMail = `

  <h4>Thank you ${msg.fullName} for reaching out !</h4><br>
  <img src="https://images.unsplash.com/photo-1509641498745-13c26fd1ed89?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60">
  <p> I will get back to you within 1-2 business days. You can also reach out to me on +1 647-528-7504 for urgent enquiries. </p>
  `

  const mailClient = {
    from: "meghanath.balaji@gmail.com", //replace with your email
    to: msg.Email, //replace with your email
    subject: `Thank you `,
    html: clientMail
  };

  const mailAdmin = {
    from: "meghanath.balaji@gmail.com", //replace with your email
    to: "meghanath.balaji@gmail.com", //replace with your email
    subject: msg.Subject,
    html: adminMail
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

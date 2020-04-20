const { createServer } = require("http");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
// const normalizePort = (port) => parseInt(port, 10);
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const dev = app.get("env") !== "production";
const nodeMailer = require("./apis/nodeMailer");
const server = createServer(app);

app.use(cors({ origin: true, credentials: true }));
if (!dev) {
  app.disable("x-powered-by");
  app.use(compression());
  app.use(morgan("common"));

  app.use(express.static(path.resolve(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  app.post("/contact", (req, res) => {
    const msgInfo=req.body;
    nodeMailer(msgInfo)
    console.log("email sent");
    res.json("success");
  });
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Server started");
  });
}

if (dev) {
  app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/contact", (req, res) => {
  const msgInfo=req.body;
  nodeMailer(msgInfo)
  console.log("email sent");
  res.json("success");
});

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server started");
});
}
require('./models/User')
require('./models/Track')
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require('./routes/trackRoutes')
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth")

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes)

const mongoUri =
  "mongodb+srv://admin:games1@cluster0-t3dl3.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});

mongoose.connection.on("error", err => {
  console.log("error", err);
});
app.get("/",requireAuth, (req, res) => {
  res.send({ tanaka:    `yurrr ${req.user.email}` });
});

app.listen(3000, () => {
  console.log("listening on 3000");
});

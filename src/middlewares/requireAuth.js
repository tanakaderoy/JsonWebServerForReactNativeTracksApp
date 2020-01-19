const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }
  const token = authorization.replace('Bearer ', '');
  console.log('token: ',token);
  
  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
      console.log('error: ' , err);
      
    if (err) {
      return res
        .status(401)
        .send({ error: "You must be logged in.", invalid: "invalid token" });
    }
    const { userId } = payload;
    console.log('userId',userId);
    
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};

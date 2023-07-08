const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const requireAuth = async (req, res, next) => {
  //authentication verification, get authorization header from req headers
  const { authorization } = req.headers;

  //if authorization failed
  if (!authorization) {
    res.status(401).json({ error: "Authorization failed" });
  }

  //authorization returns a string "Bearer + jwt", so we retrieve the token from it
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWTSECRET); //returns the token/payload from token, so we grab the id from it

    //use id to find user in the database
    req.user = await User.findOne({ _id }).select("_id"); //returns a slimmed down doc with just the id
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "User not authorized." });
  }
};

module.exports = requireAuth;

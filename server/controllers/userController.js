const jwt = require('jsonwebtoken')
const User = require("../models/UserModel");

//generates jwt, takes id prop of user from mongoDB
const createToken = (_id) => {
   return jwt.sign({_id}, process.env.JWTSECRET, {expiresIn: '3d'})
}

const userSignUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    //new user created in database
    const user = await User.signup(email, password);

    //creating token for user with createToken f/n
    const token = createToken(user._id)

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLogIn = async (req, res) => {
  const {email, password} = req.body

  try {
      const user = await User.login(email, password)

      const token = createToken(user._id)
      res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

module.exports = { userSignUp, userLogIn };

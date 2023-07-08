const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema 

//user document template
const userSchema = new Schema({
     email: {
        type: String,
        unique: true,
        required: true
     },
     password: {
        type: String,
        required: true
     } 
})

//STATIC SIGNUP METHOD
userSchema.statics.signup = async function (email, password) {

   //email and password validation
   if(!email || !password){
      throw Error('Please enter an email and password.')
   }
   if(!validator.isEmail(email)){
      throw Error('Email is not valid')
   }
   if(!validator.isStrongPassword(password)){
      throw Error('Weak Password')
   }

   //check if email exists before creating a user
   const emailExists = await this.findOne({ email }) 
   if(emailExists){
      throw Error("Email already exists.")
   }

   //brcypt salt
   const salt = await bcrypt.genSalt(12)
   const hash = await bcrypt.hash(password, salt)

   //creating user document in database
   const user = await this.create({email, password: hash})
   return user

}

//STATIC LOGIN METHOD
userSchema.statics.login = async function(email, password){
   if(!email || !password){
      throw Error("Please enter an email and password")
   }

   const user = await this.findOne({email})
   //if email doesnt exist in database
   if(!user){
      throw Error("Incorrect Email")
   }

   //compares password user enters with hashed password stored in database
   const matchingPasswords = await bcrypt.compare(password, user.password)

   //if passwords dont match.
   if(!matchingPasswords){
      throw Error("Incorrect password")
   }

   //if passwords do match
   return user
}

module.exports = mongoose.model('User', userSchema)
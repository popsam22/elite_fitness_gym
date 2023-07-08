const mongoose = require('mongoose')

const Schema = mongoose.Schema

//workout document template
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    repititions: {
        type: Number,
        required: true
    },
    load: { 
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }

}, {timestamps: true}) 


//creating our model
module.exports = mongoose.model("Workout", workoutSchema)
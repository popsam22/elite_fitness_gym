const Workout = require("../models/WorkoutModel");
const mongoose = require('mongoose')

//GET ALL WORKOUTS
const getWorkouts = async(req, res) => {
    const user_id = req.user._id 

    const workouts = await Workout.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//GET SINGLE WORKOUT
const getWorkout = async(req, res) => {
    const id = req.params.id 
    //checks if id matches mongoose standard 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout found."})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: "No workout found."})
    }

    res.status(200).json(workout)
}


//CREATE NEW WORKOUT
const createWorkout = async(req, res) => {
    const {title, repititions, load} = req.body

    //used for displaying error message when field(s) are not filled
    let containerForEmptyFileds = []
    if(!title){
        containerForEmptyFileds.push('title')
    }
    if(!repititions){
        containerForEmptyFileds.push('repititions')
    }
    if(!load){ 
        containerForEmptyFileds.push('load')
    }
    if(containerForEmptyFileds.length > 0){
        return res.status(400).json({error: 'All fields must be filled.', containerForEmptyFileds})
    }

    //add workout document to database
    try{
        const user_id = req.user._id
        const workout = await Workout.create({title, repititions, load, user_id})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error: "Couldn't create workout"})
    }
}

//DELETE A WORKOUT
const deleteWorkout = async(req, res) => {
    const id = req.params.id

    //checks if id matches mongoose standard 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout found."})
    }

    const workout = await Workout.findByIdAndDelete({_id: id})

    if(!workout){
        return res.status(400).json({error: "No workout found."})
    }
    res.status(200).json(workout)
} 

//UPDATE A WORKOUT
const updateWorkout = async(req, res) => {
    const id = req.params.id

    //checks if id matches mongoose standard 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout found."})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        res.status(400).json({error: "No workout found."})
    }
    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}
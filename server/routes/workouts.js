const express = require("express");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//use middleware function which protects all workouts routes
router.use(requireAuth);

//Retrieve all workouts
router.get("/", getWorkouts);

//Retrieve single workout
router.get("/:id", getWorkout);

//Post new workout
router.post("/", createWorkout);

//Delete single Workout
router.delete("/:id", deleteWorkout);

//Update single workout
router.patch("/:id", updateWorkout);

module.exports = router;

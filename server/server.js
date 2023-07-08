require("dotenv").config();

const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express();

//middlewares
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//connection to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`app is connected to database and listening on port ${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.log(error)
  })

//route handler 
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes) 



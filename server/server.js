require("dotenv").config();

const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path');
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express();

//middlewares
const buildPath = path.join(__dirname, 'client', 'build');
app.use(express.static(buildPath));

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
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



const router = require('express').Router();
let Exercise = require('../models/exercise-model');

// First endpoint that handles the GET request
router.route('/').get((req,res) => {
  Exercise.find() // Mongoose method that gets users from MongoDB Atlas database
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Second endpoint that handles the POST request
router.route('/add').post((req, res) => {
  
  // Store username, and other data, from the request body
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  
  // SAVE username to database
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });
  newExercise.save()
    .then(() => res.json('Exercises added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Find by ID
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete by ID
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update by ID, then SAVE
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
      
      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;
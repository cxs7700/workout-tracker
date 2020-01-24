const router = require('express').Router();
let User = require('../models/user-model');

// First endpoint that handles the GET request
router.route('/').get((req,res) => {
  User.find() // Mongoose method that gets users from MongoDB Atlas database
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ', err));
});

// Second endpoint that handles the POST request
router.route('/add').post((req, res) => {
  
  // Store username, and other data, from the request body
  const username = req.body.username;
  
  // Save username to database
  const newUser = new User({ username });
  
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Find by ID
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete by ID
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update by ID, then SAVE
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      
      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
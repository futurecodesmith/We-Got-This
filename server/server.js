const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const userController = require('./UserController');

const PORT = 3000;

mongoose.connect('mongodb://nmd:resume@ds113580.mlab.com:13580/nmd_resume');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/..'));

const userRouter = express.Router();


// Create a user in the database
// localhost://3000/
app.post('/', userController.createUser);

// Get a user from the database
// localhost://3000//"username"
app.get('/:username', userController.getUser);

// Change a user's name
// localhost://3000/"username"
app.patch('/:username', userController.updateUser);

// Delete a user from the database
// localhost://3000/"username"
app.delete('/:username', userController.deleteUser);



app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

const User = require('./authModel');
const cookieController = require('./../util/cookieController');
const sessionController = require('./../session/sessionController');
const bcrypt = require('bcryptjs');
const authController = {};

/**
* getAllUsers
*
* @param next - Callback Function w signature (err, users)
*/
authController.getAllUsers = (next) => {
  User.find({}, next);
};

/**
* createUser - create a new User model and then save the user to the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
authController.createUser = (req, res, next) => {
  var user = new User({username: req.body.username, password: req.body.password});
  user.save((err) => {
    // console.log(err);
    if (err) {
      res.redirect('/signup');
    } else {
      cookieController.setSSIDCookie(req, res, next);
      sessionController.startSession(user);
    }
  });
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
authController.verifyUser = (req, res, next) => {
  User.findOne({username: req.body.username}, function(err, user) {
       if (err) throw err;
      //  console.log(user);
      //  console.log(bcrypt.compareSync(req.body.password, user.password));
       if (user === null || !bcrypt.compareSync(req.body.password, user.password)) {
         res.redirect('/signup');
        //  next();
       } else {
         sessionController.startSession(user);
         res.redirect('/resume');
        //  next();
       }
   });
};

module.exports = AuthController;

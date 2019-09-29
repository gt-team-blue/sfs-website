/* Project: Stories For Sustainability Website
 * File: server.js
 * Description: All the server functions required to run SFS
 */ 

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('server.aidancbrady.com', ['storiesForSustainability']);
var bodyParser = require('body-parser');
var Promise = require('promise');
var path = require('path');
const cors = require('cors');

var idleTimeoutSeconds = 1800; // AUTOMATICALLY LOG OUT AFTER 31 MINUTES

// For image loading
app.use(bodyParser.json({limit: '16mb'}));
app.use(bodyParser.urlencoded({extended: false }));

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(cors()); // enable all cors requests

var cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  keys: ['sefueiuseiushiuehsiue'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


app.get('*', function (req, res) {
  console.log('I received a GET request');
  res.sendFile(path.join(__dirname, './dist/StoriesForSustainability/index.html'));
});

app.post('/logout', function (req, res) {
  
});


app.post('/getLoginCredentials', function (req, res) {
});

//idk if this works yet
app.post('/authenticate', function (req, res) {
  db.users.findOne({"username": req.body['username'], "password": req.body['password']}, function(err, doc){
    if(doc){
      res.json({"user": doc});
    } else {
      console.log(err);
      res.json({"error": "no users found"})
    }
  });
});

// Returns info for a UserObject
app.post('/getUserInfo', function (req, res) {
  // return res.json({isAuthenticated : req.session.isAuthenticated, username : req.session.username, 
  //   email : req.session.email, givenName : req.session.loggedInUserGivenName, displayName : req.session.displayName });
  });

app.post('/getUserStories', function(req,res) {
  db.stories.find({ $or:[{creator: req.body.username}, {editAccess: req.body.username}]}).toArray(function(err, userPlans) {
    res.json({"userPlans" : userPlans});
  });
});




app.listen(3000);
console.log("Server running on port 3000");

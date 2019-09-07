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
var ActiveDirectory = require('activedirectory');
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
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.post('/logout', function (req, res) {
  req.session.isAuthenticated = false;
  res.json({isAuthenticated :req.session.isAuthenticated, loggedInUsername :req.session.loggedInUserGivenName});
});


app.post('/getLoginCredentials', function (req, res) {
   return res.json({isAuthenticated : req.session.isAuthenticated,
    loggedInUserGivenName : req.session.loggedInUserGivenName, 
    loggedInUserRole : req.session.loggedInUserRole, 
    loggedInUserSAMAccountName : req.session.loggedInUserSAMAccountName,
    sAMAccountName : req.session.sAMAccountName
  });
});

app.post('/authenticate', function (req, res) {
  this.sentOnce = false;
  if (req.body.currentUsername == '' || req.body.currentPassword == ''){
    res.json({isAuthenticated :'false',message :'Username or password cannot be blank. Please try again.'});
  } else {
    authenticateUsernameAndPassword(req, res, authenticateDnAndUserPassword);
  }
});

// Returns info for a UserObject
app.post('/getUserInfo', function (req, res) {
  return res.json({isAuthenticated : req.session.isAuthenticated, username : req.session.username, 
    email : req.session.email, givenName : req.session.loggedInUserGivenName, displayName : req.session.displayName });
  });


app.post('/removeCreator', function(req, res) {
  db.adminList.remove(req.body, function(err, doc) {
    if (err) {
      console.log('ERROR: ' +JSON.stringify(err));
      res.json(err)
    } else {
      console.log(doc);
      if(doc.deletedCount > 0){
        res.json({"message" : "Creator Removed Successfully"});
      }
      else{
        res.json({"message" : "User is not in Admin List"});
      }
    }
  });
})

app.post('/getAllAdmins', function(req, res) {
  db.adminList.find({"isCreator": { $exists: false}}, {adminUsername : 1}, function(err, currAdminList) {
    res.send(currAdminList);
  });
})

// Updates editLock for all plans you have been editing before user is logged out
app.post('/logoutPlans', function(req,res) {
  db.planList.update(
    { currentEditor : req.body['username'] },
    {
      $set: { "currentEditor" : "", "editLock" : false }
    }, function(err, doc) {
      if (err) {
        res.json({"doc":""});
      } else {
        res.json({"doc":doc});
      }
    }
  )
});

function serverLogoutPlans(username) {
  db.planList.update(
    { currentEditor : username },
    {
      $set: { "currentEditor" : "", "editLock" : false }
    }, function(err, doc) {
      if (err) {
        console.log("ERROR");
      } else {
        console.log(doc);
      }
    }
  )
};

// Searches LDAP for Viasat usernames and returns suggestions
app.post('/getAutoCompleteSuggestionsForViaSatEmployees', function (req, res) {
  var config = {
    url: 'ldap://10.8.20.42:389',
    baseDN: 'OU=Provisioned,OU=Accounts,DC=hq,DC=corp,DC=viasat,DC=com',
    username: 'CN=svc_cmcentral_dev,OU=Openstack,OU=Special Applications,OU=Accounts,DC=hq,DC=corp,DC=viasat,DC=com',
    password: 'yv2c6NPyK*WRp78'
  }
  if(req.body.currentSearchBoxEntry != undefined){
  var trimmedSearchBoxEntry = req.body.currentSearchBoxEntry.replace(/[^a-zA-Z, ]/g, "");
  var searchQuery = trimmedSearchBoxEntry.split(" ");
  if(searchQuery[0].indexOf(',') > -1) {
    var query = 'cn=*'+trimmedSearchBoxEntry+'*';
  } else {
    if((searchQuery[1] != undefined)&&(searchQuery[1] != "")){
      trimmedSearchBoxEntry = searchQuery[1]+", "+searchQuery[0];
      var query = '(&(givenName=*'+searchQuery[0]+'*)(sn=*'+searchQuery[1]+'*))'; 
    } 
    else {
      trimmedSearchBoxEntry = searchQuery[0];
      var query = 'cn=*'+trimmedSearchBoxEntry+'*';
    } 
  }
  var ad = new ActiveDirectory(config);
  if(trimmedSearchBoxEntry.trim() != ''){
  ad.findUsers(query, function(err, users) {
    //  console.log(users);
    if (err) {
      console.log('ERROR: ' +JSON.stringify(err));
      res.json({"message" : "No Users found"});
    }
    if ((! users) || (users.length == 0)) {
      suggestUsernamesIfSAMAccountNameExists(ad, trimmedSearchBoxEntry, res);
    }
    else {
      console.log('findUsers: '+JSON.stringify(users));
      res.json(users.slice(0,4)); // Shows 4 suggested users
    }
  });
 } else {
  res.json({"message" : "No Users found"});
 }
} else {
  res.json({"message" : "No Users found"});
}
});

function suggestUsernamesIfSAMAccountNameExists(ad, trimmedSearchBoxEntry, res){
  var queryforchecking_sAMAccountName = 'sAMAccountName=*'+trimmedSearchBoxEntry+'*';
  ad.findUsers(queryforchecking_sAMAccountName,function(err,users){
    if (err) {
      console.log('ERROR: ' +JSON.stringify(err));
      res.json({"message" : "No Users found"});
    }
    if ((! users) || (users.length == 0)) {
      res.json({"message" : "No Users found"});
    }
    else {
      console.log('findUsers: '+JSON.stringify(users));
      res.json(users.slice(0,10));
    }
  }); 
}

app.post('/checkIfUserExists', function(req, res){
  var config = {
    url: 'ldap://10.8.20.42:389',
    baseDN: 'OU=Provisioned,OU=Accounts,DC=hq,DC=corp,DC=viasat,DC=com',
    username: 'CN=svc_cmcentral_dev,OU=Openstack,OU=Special Applications,OU=Accounts,DC=hq,DC=corp,DC=viasat,DC=com',
    password: 'yv2c6NPyK*WRp78'
  } 
  var activeDirectory = new ActiveDirectory(config);
  activeDirectory.findUser(req.body['usernameToAdd'], function(err, user) {
    if (err) {
      console.log('ERROR: ' +JSON.stringify(err));
      res.json({doeExist:false, message :err});
    }
    if(!user){
      console.log('User: ' + req.body['usernameToAdd'] + ' not found.');
      res.json({doesExist :false,message :'ViaSat username not found. Please try again.'});
    }
    else {
      console.log(JSON.stringify(user));
      res.json({doesExist:true})
     }
  });  
});

function authenticateUsernameAndPassword(req, res, callback){
  var config = {
    url: 'ldap://10.8.20.42:389',
    baseDN: 'OU=Provisioned,OU=Accounts,DC=hq,DC=corp,DC=viasat,DC=com',
    username: 'CN=svc_cmcentral_dev,OU=Openstack,OU=Special Applications,OU=Accounts,DC=hq,DC=corp,DC=viasat,DC=com',
    password: 'yv2c6NPyK*WRp78'
  } 
  var activeDirectory = new ActiveDirectory(config);
  activeDirectory.findUser(req.body.currentUsername, function(err, user) {
    if (err) {
      console.log('ERROR: ' +JSON.stringify(err));
      res.json({isAuthenticated :'false', message :err});
    }
    if(!user){
      console.log('User: ' + req.body.currentUsername + ' not found.');
      res.json({isAuthenticated :'false',message :'ViaSat username not found. Please try again.'});
    }
    else {
      console.log(JSON.stringify(user));
      callback(req, res, user);
     }
  });  
}

function setUserRole(username,req,res){
  db.adminList.findOne({"adminUsername": username},function (err, records) {
      if(records && records.isCreator){
        req.session.loggedInUserRole = "Creator";
        res.json({isAuthenticated : req.session.isAuthenticated, loggedInUsername : req.session.loggedInUserGivenName,
          loggedInUserRole : req.session.loggedInUserRole, username : req.session.username, email : req.session.email,
          givenName : req.session.loggedInUserGivenName, displayName : req.session.displayName });
      } else if(records) {
        req.session.loggedInUserRole = "Admin";
        res.json({isAuthenticated : req.session.isAuthenticated, loggedInUsername : req.session.loggedInUserGivenName,
          loggedInUserRole : req.session.loggedInUserRole, username : req.session.username, email : req.session.email,
          givenName : req.session.loggedInUserGivenName, displayName : req.session.displayName });
      } else {
        req.session.loggedInUserRole = "User";
        res.json({isAuthenticated : req.session.isAuthenticated, loggedInUsername : req.session.loggedInUserGivenName,
          loggedInUserRole : req.session.loggedInUserRole, username : req.session.username, email : req.session.email,
          givenName : req.session.loggedInUserGivenName, displayName : req.session.displayName });
      }
  });
}

function authenticateDnAndUserPassword(req, res, user){
  var currentUserConfig = {
    url: 'ldap://10.8.20.42:389',
    baseDN: 'OU=Provisioned,OU=Accounts,DC=hq,DC=corp,DC=viasat,DC=com',
    username: user.dn,
    password: req.body.currentPassword
  } 
  activeDirectory = new ActiveDirectory(currentUserConfig); 
  activeDirectory.findUser(req.body.currentUsername, function(err, user) {
    if (err) {
      console.log('ERROR: ' +JSON.stringify(err));
      if(!this.sentOnce){
      this.sentOnce = true;
      res.json({isAuthenticated :'false',message :'Invalid Credentials. Please try again.'});
      }
    }
    else {
      // setTimeout(serverLogoutPlans.bind(user.sAMAccountName),1800*1000);
      req.session.isAuthenticated = true;
      req.session.loggedInUserGivenName = user.givenName;
      req.session.username = user.sAMAccountName;
      req.session.email = user.mail;
      req.session.displayName = user.displayName;
      setUserRole(user.sAMAccountName,req,res);
    }
  });
}

app.listen(3000);
console.log("Server running on port 3000");

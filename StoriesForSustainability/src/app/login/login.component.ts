import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
import { AppComponent } from '../app.component';
import * as Constants from '../constants/Network';
import axios from 'axios';
import { maybeQueueResolutionOfComponentResources } from '@angular/core/src/metadata/resource_loading';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  serverMessage = "";
  isAuth: boolean;
  loggedInErrorMessage: string;
  username: string = "";
  password: string = "";
  constructor(private route: ActivatedRoute, private router:Router, private user:UserService, private http:HttpClient, private app:AppComponent) {}

  ngOnInit() {
    // this.http.post('/getLoginCredentials',{}).toPromise().then((result) => {
    //   if(result['isAuthenticated'] == true){
    //     this.router.navigate(['home']);
    //   }
    //  });
     this.loggedInErrorMessage = this.user.getUserLoggedInErrorMessage();
  }

  authenticateCurrentUser(){
    var self = this;
    if (this.username == "") {
      this.loggedInErrorMessage = "Please enter your username";
    } else if (this.password == "") {
      this.loggedInErrorMessage = "Please enter your password";
    } else {
        axios.post(Constants.SERVER_URL + '/api/users/login', {
        email: this.username,
        password: this.password
      }).then((response) => {
        // console.log(response);
        var res = response.data.user;
        self.user.createUserObject(res.username, res.email, res._id);
        self.router.navigate(['/home']);
      }).catch(function (error) {
        console.log(Object.values(error.response.data)[0]);
        self.loggedInErrorMessage = Object.values(error.response.data)[0] as string;
      });
    }
  }

}

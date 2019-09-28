import { Injectable } from '@angular/core';
import { UserObject } from './userobject';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private errorMessage;
  private myUser:UserObject;

  constructor(private http:HttpClient, private router:Router) { 
    this.errorMessage = ' ';
  }

    // Error Message Methods
    setUserLoggedInErrorMessage(message) {
      this.errorMessage = message;
    }
    getUserLoggedInErrorMessage() {
      return this.errorMessage;
    }

    //Come back to this -SS
    createUserObject(username:string, email:string, givenName:string, displayName:string) {
      return new UserObject(username, email, givenName, displayName);
    }

      // For logging out
  logOutCurrentUser(){
  }
    
    //Return the user object
    getUser() {
      return this.http.post('/getUserInfo',{});
    }
}

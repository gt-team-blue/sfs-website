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

    // For logging out
    logOutCurrentUser(){
    this.getUser().subscribe((res) => {
      if(res['isAuthenticated'] == true) {
        this.myUser = this.createUserObject(res['username'], res['email'], res['givenName'], res['displayName']);
        this.http.post('/logoutPlans', {username:this.myUser.username}).subscribe(res => {
          this.http.post('/logout',{}).subscribe(data => {
            this.router.navigate(['/']);
          });
        })
      }
    });
  }

    //Come back to this -SS
    createUserObject(username:string, email:string, givenName:string, displayName:string) {
      return new UserObject(username, email, givenName, displayName);
    }
    
    //Return the user object
    getUser() {
      return this.http.post('/getUserInfo',{});
    }
}

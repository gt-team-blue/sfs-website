import { Injectable } from '@angular/core';
import { UserObject } from './userobject';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()

export class UserService {
  private errorMessage;
  private myUser:UserObject;
  private isAuthenticated:boolean;

  constructor() { 
    this.errorMessage = ' ';
  }

  // Error Message Methods
  setUserLoggedInErrorMessage(message) {
    this.errorMessage = message;
  }
  getUserLoggedInErrorMessage() {
    return this.errorMessage;
  }
  createUserObject(name:string, email:string, _id:string) {
    this.myUser = new UserObject(name, email, _id);
  }
  logout() {
    this.myUser = null;
  }


  initAll(){
    this.errorMessage = ' ';
  }
  //Return the user object
  getUser() {
    return this.myUser;
  }
  
  getEmail() {
    return this.myUser.email;
  }
}

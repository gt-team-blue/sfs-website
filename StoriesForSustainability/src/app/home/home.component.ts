import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserObject } from '../userobject';
import { StoryObject } from '../storyobject';
import { UserService } from '../user.service';
import { StoryService } from '../story.service';
import * as Constants from '../constants/Network';
import {MatSnackBar} from '@angular/material/snack-bar';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userStories: StoryObject[]; // All plans user has read access to

  myUser: UserObject;
  isAdmin: boolean;
  filterStoryName: string = "";
  filterLastUpdated: string = "";
  filterLastUpdatedBy: string = "";
  ready: boolean = false;
  snackBarMessage: string = "Story deleted";
  refresh: boolean = false;
  


  constructor(private router: Router, private http: HttpClient, private userService: UserService, private storyService: StoryService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    var self = this;
    axios.get(Constants.SERVER_URL + '/api/stories/storiesByEditor', {
      params: {
        userEmail: self.userService.getEmail()
      }
    }).then((response) => {
      self.userStories = response.data.data as StoryObject[];
      console.log(self.userStories);
  }).catch(function(error) {
    console.log(error.response);
  })
}
openSnackBar() {
  let SnackBarRef = this._snackBar.open(this.snackBarMessage, "Undo", {
    duration: 3000,
  });
  SnackBarRef.onAction().subscribe(() => {
    console.log('The snack-bar action was triggered!');
  });
}

reloadComponent() {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['home']);
}

  ngDoCheck() {
    this.ready = true;
  }
  deleteStory(story) {
    this.storyService.storyDelete(story);
    for (var i = 0; i < this.userStories.length; i++) {
      if (this.userStories[i]._id == story._id) {
        this.userStories.splice(i, 1);
      }
    }
    this.openSnackBar();
  }

}

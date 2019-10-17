import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserObject } from '../userobject';
import { StoryObject } from '../storyobject';
import { UserService } from '../user.service';
import { StoryService } from '../story.service';
import * as Constants from '../constants/Network';
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
  


  constructor(private router: Router, private http: HttpClient, private userService: UserService, private storyService: StoryService) { }

  ngOnInit() {
    var self = this;
    axios.get(Constants.SERVER_URL + '/api/stories/storiesByEditor', {
      params: {
        userEmail: self.userService.getEmail()
      }
    }).then((response) => {
      this.userStories = response.data.data as StoryObject[];
  }).catch(function(error) {
    console.log(error.response);
  })
}

  ngDoCheck() {
    this.ready = true;
  }

}

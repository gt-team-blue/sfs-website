import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserObject } from '../userobject';
import { StoryObject } from '../storyobject';
import { UserService } from '../user.service';
import { StoryService } from '../story.service';

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
    this.userService.getUser().subscribe((res) => {
      // if(res['isAuthenticated'] == true) {
      //   this.myUser = this.userService.createUserObject(res['username'], res['email'], res['givenName'], res['displayName']);
      // }
      this.http.post('/getUserStories', { "username": this.myUser.username }).toPromise().then((res => {
        this.userStories = res['userStories'] as StoryObject[];
      }))
    });
  }

  ngDoCheck() {
    this.ready = true;
  }

}

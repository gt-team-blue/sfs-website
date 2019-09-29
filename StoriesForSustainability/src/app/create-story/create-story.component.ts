import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserObject } from '../userobject';
import { UserService } from '../user.service';
import { StoryService } from '../story.service';
import { StoryObject } from '../storyobject';
import {ActivatedRoute, ParamMap} from "@angular/router";
import { Location } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {
  // Data
  myUser:UserObject;
  story_id: string; //story id that is client side incremented
  title: string = ""; // string representing a story
  creator: string; // string representing the creator
  storyPointer: string;
  coverImagePointer: string;
  tags: string[]; // string representing a user's first name
  editAccess: string[];
  lastUpdated: string; //last updated
  titleErr: string;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private user: UserService, private storyService: StoryService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
}

openSnackBar() {
  this._snackBar.open("Story uploaded successfully!", "dismiss", {
    duration: 2000,
  });
}

createStory() {
  // planTypeArr holds the PlanType database id and the array of templates/revisions for that type
  if (!this.title) {
      this.titleErr="Story Title Required";
      setTimeout(function(){     
        this.title = "";
      }.bind(this), 1500);
  } else {

  }
}


}

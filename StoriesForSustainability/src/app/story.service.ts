import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoryObject } from './storyobject';
import { HttpClient } from '@angular/common/http';
import * as Constants from './constants/Network';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor( private router:Router, private http: HttpClient) { }

  //data
    story: StoryObject;

storyEdit(story:StoryObject){
  this.story = story;
  this.router.navigate(['edit/' + story._id]);
  }
  storyDelete(story: StoryObject) {
    axios.delete(Constants.SERVER_URL + '/api/stories/' + story._id).then((response) => {
      if (!response.data.success) {
        console.log(response.data.success);
      }
    })
  }
  getStory(){
    return this.story;
  }
}
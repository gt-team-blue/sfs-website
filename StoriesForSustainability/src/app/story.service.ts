import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoryObject } from './storyobject';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor( private router:Router, private http: HttpClient) { }

  //data
    story: StoryObject;

storyEdit(story:StoryObject){
  this.story = story;
  this.router.navigate(['edit/' + story.story_id]);
  }
storyView(story:StoryObject){
    this.story = story;
    this.router.navigate(['view/' + story.story_id]);
    }
}

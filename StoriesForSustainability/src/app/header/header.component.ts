import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { UserService } from '../user.service';
import { UserObject } from '../userobject';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn : boolean = false;
  myUser : UserObject;
  constructor(private route: ActivatedRoute,private router:Router,private user:UserService, private http:HttpClient) { }

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      // if(event instanceof NavigationEnd ){
      //   this.user.getUser().subscribe((res) => {
      //     if(res['isAuthenticated'] == true){ 
      //       this.loggedIn = true;
      //     } else {
      //       this.loggedIn = false;
      //     }
      //   });
      // }
      // this.user.getUser().subscribe((res) => {
      //   if(res['isAuthenticated'] == true) {
      //     this.myUser = this.user.createUserObject(res['username'], res['email'], res['givenName'], res['displayName']);
      //   }
      // });
    })
  }

}

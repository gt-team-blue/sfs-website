import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private route: ActivatedRoute, private router:Router, private user:UserService, private http:HttpClient, private app:AppComponent) {}

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router:Router, private cookieService: CookieService, private user: UserService) { }

  ngOnInit() {
  }
  logout() {
    this.cookieService.deleteAll();
    this.user.logout();
    this.router.navigate(['/']);
  }
}

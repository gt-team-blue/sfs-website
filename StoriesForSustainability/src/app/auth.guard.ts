import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private user: UserService, private router:Router, private http:HttpClient) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.cookieService.check('username')) {
        let username = this.cookieService.get('username');
        let email = this.cookieService.get('email');
        let _id = this.cookieService.get('_id');
        this.user.createUserObject(username, email, _id);
        return true;
      } else {
        this.router.navigate(['/'], {
          queryParams: {
            return: state.url
          }
        });
        this.user.setUserLoggedInErrorMessage('Not logged in. Please login to continue');
        return false;
      }
    }
  }

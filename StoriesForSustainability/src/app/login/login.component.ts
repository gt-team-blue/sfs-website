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
  serverMessage = "";
  isAuth: boolean;
  loggedInErrorMessage: string;
  
  constructor(private route: ActivatedRoute, private router:Router, private user:UserService, private http:HttpClient, private app:AppComponent) {}

  ngOnInit() {
    this.http.post('/getLoginCredentials',{}).toPromise().then((result) => {
      if(result['isAuthenticated'] == true){
        this.router.navigate(['home']);
      }
     });
     this.loggedInErrorMessage = this.user.getUserLoggedInErrorMessage();
  }

  authenticateCurrentUser(e){
    e.preventDefault();
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    var result;
    var loginObject = {currentUsername : username, currentPassword: password};
    var response = this.http.post('/authenticate', loginObject).subscribe(data => {
      if(data['isAuthenticated'] == true) {
        setTimeout(function(){}.bind(this),2000);
        this.app.reset(); // Reset timeout
        this.route.queryParams.subscribe((params: Params) => {
          if (params['return']) {
            this.router.navigate([params['return']]);
          } else {
            this.router.navigate(['home']);
          }
        });
      } else {
        this.user.setUserLoggedInErrorMessage(data['message']);
      }
    });
  }

}

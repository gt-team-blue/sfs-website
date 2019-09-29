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
  username: string = "";
  password: string = "";
  constructor(private route: ActivatedRoute, private router:Router, private user:UserService, private http:HttpClient, private app:AppComponent) {}

  ngOnInit() {
    this.http.post('/getLoginCredentials',{}).toPromise().then((result) => {
      if(result['isAuthenticated'] == true){
        this.router.navigate(['home']);
      }
     });
     this.loggedInErrorMessage = this.user.getUserLoggedInErrorMessage();
  }

  authenticateCurrentUser(user){
    user.preventDefault();
    // var username = user.target.elements[0].value;
    // var password = user.target.elements[1].value;
    // var result;
    // var loginObject = {currentUsername : username, currentPassword: password};
   
    if (this.username == "") {
      this.loggedInErrorMessage = "Please enter your username";
    } else if (this.password == "") {
      this.loggedInErrorMessage = "Please enter your password";
    } else {
      this.router.navigate(['home']);
    }

    // var response = this.http.post('/authenticate', loginObject).subscribe(data => {
    //   if(data['isAuthenticated'] == true) {
    //     setTimeout(function(){}.bind(this),2000);
    //     this.app.reset(); // Reset timeout
    //     this.route.queryParams.subscribe((params: Params) => {
    //       if (params['return']) {
    //         this.router.navigate([params['return']]);
    //       } else {
    //         this.router.navigate(['home']);
    //       }
    //     });
    //   } else {
    //     this.router.navigate(['home']);
    //     this.user.setUserLoggedInErrorMessage(data['message']);
    //   }
    // });
  }

}

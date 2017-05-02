import {Component} from "@angular/core"
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from "../../services/index";


@Component({
    selector: "todo-login-app",
    templateUrl: "assets/components/authorize/login.html",
    providers: [AuthenticationService]
})

export class LoginComponent{

  model: any = {};
  currentUser: any = {};
  loading = false;
  returnUrl: string;
  resetemail: any = {};
  showLogIn: any;
  reset: any = {};

  constructor(protected router: Router, public authenticationService: AuthenticationService)
  {
    this.showLogIn = 1;
  }

  login() {
    this.loading = true;
    // Window.location needs to be called in the subscribe

    //this.authenticationService.authorize(this.model.username, this.model.password).subscribe();


    this.authenticationService.authorize(this.model.username, this.model.password)
      .subscribe((result) => {
          this.loading = false;
        //this.router.navigate(['/signup']);
          if((result as any).message === "Please reset your password")
          {
            this.showLogIn = 2;
          }
          else if((result as any).message ==="Failure")
          {
            alert("Invalid Credentials");
          }
          else {
            window.location.href = window.location.origin + "/home";
          }
        }
      );

  }

  passwordReset()
  {
    this.authenticationService.resetpassword(this.authenticationService.username, this.reset)
      .subscribe((result) => {
          console.log(result);
          if(result === "Success")
          {
            this.showLogIn = 1;
          }
          else {
            alert("Invalid password");
          }
          this.model = {};
          //this.router.navigate(['/signup']);

        }
      );
  }

  resetpassword(email: any)
  {

    this.authenticationService.forgotpassword(email)
      .subscribe((result) => {
          console.log(result);
          alert(result);
          //this.router.navigate(['/signup']);
          this.showLogIn = 1;
        }
      );
  }
}


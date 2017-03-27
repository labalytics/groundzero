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

  constructor(protected router: Router, public authenticationService: AuthenticationService)
  {}

  login() {
    this.loading = true;
    // Window.location needs to be called in the subscribe

    //this.authenticationService.authorize(this.model.username, this.model.password).subscribe();


    this.authenticationService.authorize(this.model.username, this.model.password)
      .subscribe((result) => {
          console.log(result);
          //this.router.navigate(['/signup']);
          window.location.href = window.location.origin + "/home";
        }
      );

  }
}


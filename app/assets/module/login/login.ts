import {Component} from "@angular/core"
import {GreeterStore} from "../../services/greeter.store"
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from "../../services/index";


@Component({
    selector: "todo-login-app",
    templateUrl: "assets/module/login/login.html",
    providers: [AuthenticationService]

})

export default class LoginComponent{

  model: any = {};
  currentUser: any = {};
  loading = false;
  returnUrl: string;

  constructor(public authenticationService: AuthenticationService)
  {}

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe();


  }
}


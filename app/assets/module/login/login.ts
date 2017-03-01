import {Component} from "@angular/core"
import {GreeterStore} from "../../services/greeter.store"
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from "../../services/index";

@Component({
    selector: "todo-login-app",
    templateUrl: "assets/module/login/login.html"
})

export default class LoginComponent{

  model: any = {};
  loading = false;
  returnUrl: string;

  login() {
    this.loading = true;
    // this.authenticationService.login(this.model.username, this.model.password)
    //   .subscribe(
    //     data => {
    //       ""
    //     },
    //     error => {
    //       this.loading = false;
    //     });
  }
}


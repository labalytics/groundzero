import {Component} from "@angular/core"
import {GreeterStore} from "../../services/greeter.store"
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from "../../services/index";


@Component({
    selector: "todo-signup-app",
    templateUrl: "assets/module/signup/signup.html",
    providers: [AuthenticationService]

})

export default class SignupComponent{

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(public authenticationService: AuthenticationService)
  {}

  signup() {
    this.loading = true;
    this.authenticationService.signup(this.model)
      .subscribe();
  }
}


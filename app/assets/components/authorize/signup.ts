import {Component} from "@angular/core"
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { AlertService, AuthenticationService } from "../../services/index";


@Component({
    selector: "todo-signup-app",
    templateUrl: "assets/components/authorize/signup.html",
    providers: [AuthenticationService]
})

export class SignupComponent{

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


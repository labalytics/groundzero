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

export default class LoginComponent implements OnInit{

  model: any = {};
  loading = false;
  returnUrl: string;


  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService){

  }

  ngOnInit() {
    // reset login status

    // get return url from route parameters or default to '/'
    this.returnUrl = "";
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          ""
        },
        error => {
          this.loading = false;
        });
  }
}


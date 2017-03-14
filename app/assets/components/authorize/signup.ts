import {Component} from "@angular/core"
<<<<<<< HEAD:app/assets/components/authorize/signup.ts
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

=======
>>>>>>> master:app/assets/module/signup/signup.ts
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


import {Component} from "@angular/core"
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


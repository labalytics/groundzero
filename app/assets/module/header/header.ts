import {Component} from "@angular/core"
import {GreeterStore} from "../../services/greeter.store"
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from "../../services/index";


@Component({
    selector: "todo-header",
    templateUrl: "assets/module/header/header.html",
    providers: [AuthenticationService]

})

export default class HeadComponent{

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(public authenticationService: AuthenticationService)
  {}


}


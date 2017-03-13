import {Component} from "@angular/core"
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from "../../services/index";


@Component({
    selector: "todo-header",
    templateUrl: "assets/components/common/header.html",
    providers: [AuthenticationService]

})

export class HeadComponent{

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(public authenticationService: AuthenticationService)
  {}


}


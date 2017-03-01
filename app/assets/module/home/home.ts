import {Component} from "@angular/core"
import {GreeterStore} from "../../services/greeter.store"
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from "../../services/index";

@Component({
  selector: "todo-home-app",
  templateUrl: "assets/module/home/home.html"
})

export default class HomeComponent{
}


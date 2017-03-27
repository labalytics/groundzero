import {Component, OnInit} from "@angular/core"
import { Router, ActivatedRoute } from '@angular/router';

//import { AlertService, AuthenticationService } from "../../services/index";

import { AuthenticationService } from  "../../services/authentication.service"

@Component({
  selector: "home",
  templateUrl: "assets/module/home/home.html"
  //providers: [AuthenticationService]
})

export class HomeComponent implements OnInit{

  constructor(private authService: AuthenticationService) {
  }

  get authenticated() {
    return this.authService.isAuthenticated();
  }


  currentUser: any = {};

  ngOnInit() {
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
       // let response = result["response"];
      });
  }
}


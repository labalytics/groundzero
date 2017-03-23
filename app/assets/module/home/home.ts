import {Component, OnInit} from "@angular/core"
import { Router, ActivatedRoute } from '@angular/router';

//import { AlertService, AuthenticationService } from "../../services/index";

import { AuthenticationService } from  "../../services/authentication.service"

@Component({
  selector: "home",
  templateUrl: "assets/module/home/home.html",
  providers: [AuthenticationService]
})

export class HomeComponent implements OnInit{

  constructor(private authService: AuthenticationService) {
  }

  get authenticated() {
    return this.authService.isAuthenticated();
  }


  currentUser: any = {};
  menu: any ={};
  username: string;

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.currentUser);
    let res = JSON.parse(this.currentUser._body);
    this.username = res.response["email"];
    console.log(this.username);
    this.authService.getRoleandMenuData(this.username)
      .subscribe((result) => {
       let response = result["response"];
        this.menu = response["navItems"];
        }
      );
  }
}


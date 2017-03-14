import {Component, OnInit} from "@angular/core"
import { Router, ActivatedRoute } from '@angular/router';

//import { AlertService, AuthenticationService } from "../../services/index";

import { AuthenticationService } from  "../../services/authentication.service"

@Component({
  selector: "home",
  templateUrl: "assets/module/home/home.html",
  providers: [AuthenticationService]
})

<<<<<<< HEAD
export class HomeComponent implements OnInit{

  constructor(private authService: AuthenticationService) {
  }

  get authenticated() {
    return this.authService.isAuthenticated();
  }


  currentUser: any = {};
  menu: any ={};

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.currentUser);
    this.menu = this.currentUser[0];
    console.log(this.menu);
  }
=======
export default class HomeComponent{


>>>>>>> master
}


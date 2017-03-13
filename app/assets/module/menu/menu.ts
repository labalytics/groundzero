import {Component} from "@angular/core"
import {GreeterStore} from "../../services/greeter.store"
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AfterViewInit} from '@angular/core';

import { AlertService, AuthenticationService } from "../../services/index";


@Component({
    selector: "todo-menu",
    templateUrl: "assets/module/menu/menu.html",
    providers: [AuthenticationService]

})

export default class MenuComponent{


  currentUser: any = {};
  menu: any =[];

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(public authenticationService: AuthenticationService)
  {
    console.log("KAKj");
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.menu = this.currentUser[1];
  }



}


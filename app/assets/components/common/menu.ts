import {Component, OnInit} from "@angular/core"
import { Router, ActivatedRoute } from '@angular/router';
import {AfterViewInit} from '@angular/core';

import { AlertService, AuthenticationService } from "../../services/index";


@Component({
    selector: "todo-menu",
    templateUrl: "assets/components/common/menu.html",
    providers: [AuthenticationService]
})

export class MenuComponent implements OnInit{


  currentUser: any = {};
  menu: any =[];

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(public authenticationService: AuthenticationService)
  {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.currentUser);
    this.menu = this.currentUser[1];
  }

}


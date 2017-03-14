import {Component, OnInit} from "@angular/core"
import { Router, ActivatedRoute } from '@angular/router';
import {AfterViewInit} from '@angular/core';

import { AlertService, AuthenticationService } from "../../services/index";


@Component({
    selector: "todo-menu",
    templateUrl: "assets/components/common/menu.html",
    providers: [AuthenticationService]
})

<<<<<<< HEAD:app/assets/components/common/menu.ts
export class MenuComponent implements OnInit{
=======
export default class MenuComponent{
>>>>>>> master:app/assets/module/menu/menu.ts


  currentUser: any = {};
  menu: any =[];

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(public authenticationService: AuthenticationService)
<<<<<<< HEAD:app/assets/components/common/menu.ts
  {}

  ngOnInit() {
=======
  {
    console.log("KAKj");
>>>>>>> master:app/assets/module/menu/menu.ts
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.menu = this.currentUser[1];
  }



}


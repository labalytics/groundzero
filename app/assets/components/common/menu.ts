import {Component, OnInit} from "@angular/core"
import {Router, ActivatedRoute} from '@angular/router';
import {AfterViewInit} from '@angular/core';

import {AlertService, AuthenticationService} from "../../services/index";


@Component({
  selector: "todo-menu",
  templateUrl: "assets/components/common/menu.html"
  //,providers: [AuthenticationService]
})

export class MenuComponent implements OnInit {


  currentUser: any = {};
  menu: any = [];

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        this.menu = result.navItems;
      });
  }
}
/*
 this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
 console.log(this.currentUser);
 let res = JSON.parse(this.currentUser._body);
 this.username = res.response["email"];
 this.authService.getRoleandMenuData(this.username)
 .subscribe((result) => {
 let response = result["response"];

 }
 );
 */


import {Component} from "@angular/core"
import {GreeterStore} from "../../services/greeter.store"
import { OnInit } from '@angular/core';
import {AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from "../../services/index";

@Component({
  selector: "todo-home",
  templateUrl: "assets/module/home/home.html"
})

export default class HomeComponent implements AfterViewInit{


  currentUser: any = {};
  menu: any ={};

  ngAfterViewInit() {
    console.log("KAKj");
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.currentUser);
    this.menu = this.currentUser[0];
    console.log(this.menu);


  }
}


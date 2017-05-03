import {Component, OnInit} from "@angular/core"
import {Router, NavigationEnd} from '@angular/router';

//import { AlertService, AuthenticationService } from "../../services/index";

import {AuthenticationService} from  "../../services/authentication.service"

@Component({
  selector: "home",
  templateUrl: "assets/module/home/home.html"
  //providers: [AuthenticationService]
})

export class HomeComponent implements OnInit {
  currentRouteHeader: string;
  currentRouteDesc: string;

  constructor(route: Router, private authService: AuthenticationService) {
    route.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        switch (event.url){
          case "/labs":
            this.currentRouteHeader = "Lab information";
            this.currentRouteDesc = "View, add or edit lab information";
            break;
          case "/students":
            this.currentRouteHeader = "Student information";
            this.currentRouteDesc = "View or add students to labs";
            break;
          case "/equipments":
            this.currentRouteHeader = "Equipment information";
            this.currentRouteDesc = "Manage equipments for your labs";
            break;
          case "/billing":
            this.currentRouteHeader = "Bills by lab";
            this.currentRouteDesc = "View billings for your all your labs";
            break;
          case "schedule":
            this.currentRouteHeader = "Book equipments";
            this.currentRouteDesc = "View or book equipments";
            break;
          case "/equipmentusage":
            this.currentRouteHeader = "Equipment usage report";
            this.currentRouteDesc = "View usage of equipments";
            break;
          case "/labusage":
            this.currentRouteHeader = "Lab usage report";
            this.currentRouteDesc = "View overall bookings made within all your labs";
            break;
          default:
            this.currentRouteHeader = "";
            this.currentRouteDesc = "";
        }
      }
    });
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


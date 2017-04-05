import {Component} from "@angular/core"
import {OnInit} from '@angular/core';

import {AlertService, AuthenticationService} from "../../services/index";


@Component({
  selector: "common-header",
  templateUrl: "assets/components/common/header.html"
})

export class HeadComponent implements OnInit {

  userName: string;
  userRole: string;
  userEmail: string;

  constructor(public authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        this.userName = result.userInfo.userName;
        this.userEmail = result.userInfo.userEmail;
        this.userRole = result.userInfo.userRole;
      });
  }
}


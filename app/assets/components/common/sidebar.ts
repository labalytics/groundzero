import {Component, OnInit} from "@angular/core";
import {AlertService, AuthenticationService} from "../../services/index";

@Component({
  selector: "common-sidebar",
  templateUrl: "assets/components/common/sidebar.html"
})

export class MenuComponent implements OnInit {

  currentUser: any = {};
  menu: any = [];
  activeRoute: string;

  userName: string;
  userRole: string;

  constructor(private authService: AuthenticationService) {
  }

  getMenuIconClass(menu: string) {
    let sClassByMenu = "";
    switch (menu) {
      case "dashboard":
        sClassByMenu = "fa-television";
        break;
      case "labs":
        sClassByMenu = "fa-cogs";
        break;
      case "students":
        sClassByMenu = "fa-users";
        break;
      case "equipments":
        sClassByMenu = "fa-flask";
        break;
      case "billing":
        sClassByMenu = "fa-usd";
        break;
      case "labusage":
        sClassByMenu = "fa-industry";
        break;
      case "schedule":
        sClassByMenu = "fa-calendar";
        break;
      case "equipmentusage":
        sClassByMenu = "fa-line-chart";
    }
    return sClassByMenu;
  }

  ngOnInit() {
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        result.navItems.forEach(function (oItem: any) {
          oItem.menu_display_name = oItem.menu_name;
          oItem.menu_name = oItem.menu_name.replace(/ /g, '').toLowerCase();
        });
        this.menu = result.navItems;
        this.userName = result.userInfo.userName;
        this.userRole = result.userInfo.userRole;
      });
  }
}


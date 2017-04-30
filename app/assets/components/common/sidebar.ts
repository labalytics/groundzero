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
      case "billingreport":
        sClassByMenu = "fa-usd";
        break;
      case "schedule":
        sClassByMenu = "fa-calendar";
        break;
      case "equipmentreport":
        sClassByMenu = "fa-line-chart";
    }
    return sClassByMenu;
  }

  ngOnInit() {
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        const barRep = {
          id: 6,
          menu_name: "BillingReport",
          role: {
            id: 1,
            roleName: "Manager",
            status: "Active"
          }
        }
        const equipRep = {
          id: 7,
          menu_name: "EquipmentReport",
          role: {
            id: 1,
            roleName: "Manager",
            status: "Active"
          }
        }
        result.navItems.push(equipRep);
        result.navItems.push(barRep);

        result.navItems.forEach(function (oItem: any) {
          oItem.menu_name = oItem.menu_name.toLowerCase();
          switch (oItem.menu_name) {
            case "billingreport":
              oItem.menu_display_name = "Billing Report";
              break;
            case "equipmentreport":
              oItem.menu_display_name = "Equipment Usage";
              break;
            default:
              oItem.menu_display_name = oItem.menu_name;
          }
        });
        this.menu = result.navItems;
        this.userName = result.userInfo.userName;
        this.userRole = result.userInfo.userRole;
      });
  }
}


import {Component} from "@angular/core"
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/index";

@Component({
  selector: "billing",
  templateUrl: "assets/components/account/billing.component.html"
})

@Injectable()
export class BillingComponent implements OnInit {
  labs: any = [];
  mylab: any = {};
  ManagerLabs: any = [];
  roleId: any;

  constructor(private authService: AuthenticationService) {

  }

  getEquipments()
  {
    console.log(this.mylab);
    this.authService.getBookings(this.authService.username)
      .subscribe((result) => {

      });
  }


  ngOnInit() {
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        this.roleId = result.userDetails.roleId.id;
        this.getLabs();
      });
  }
  getLabs() {
    this.authService.getAllLabs(this.roleId, this.authService.username)
      .subscribe((result) => {
        this.labs = (result as any).labs;
        this.ManagerLabs = [];
        for (let i = 0; i < this.labs.length; i++) {
          this.ManagerLabs.push(this.labs[i].id);
        }
      });
  }
}

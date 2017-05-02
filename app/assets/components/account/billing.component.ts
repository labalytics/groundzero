import {Component} from "@angular/core"
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {OnInit} from '@angular/core';
import {AlertService, AuthenticationService} from "../../services/index";

@Component({
  selector: "billing",
  templateUrl: "assets/components/account/billing.component.html"
})

@Injectable()
export class BillingComponent implements OnInit {
  arrFilteredLabs: any = [];
  mylab: any = {};
  ManagerLabs: any = [];
  roleId: any;
  filteredLab : any = [];

  constructor(public http: Http, private authService: AuthenticationService) {

  }

  getEquipments()
  {
    console.log(this.mylab);
    this.authService.getBookings(this.mylab , this.authService.username)
      .subscribe((result) => {
        this.filterLabId(result.bookingList, this.mylab);

      });
  }

  filterLabId(result : any , mylab: any)
  {
    for (let index in result) {
      if(result[index].userLabId.id === mylab.labid){
        this.filteredLab.push(result[index]);
      }
    }

  }




  ngOnInit() {
    this.getLabs();
  }
  getLabs() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    //this.oServiceCall_GetAllLab =
    this.authService.getAllLabs(this.roleId, this.authService.username)
      .subscribe((result) => {
        this.labs = (result as any).labs;
        this.ManagerLabs = [];
        for (let i = 0; i < this.labs.length; i++) {
          this.ManagerLabs.push(this.labs[i].id);
          console.log(this.labs[i].id);
        }
        console.log(this.ManagerLabs);
      });
  }
}

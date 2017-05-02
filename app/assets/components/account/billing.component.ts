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
  billing: any = {};
  labs : any = [];
  totalAmount : any = 0;
  paidId : any = [];
  constructor(public http: Http, private authService: AuthenticationService) {
  }

  getEquipments()
  {
    this.filteredLab = [];
    console.log(this.mylab);
    this.authService.getBookings(this.mylab , this.authService.username)
      .subscribe((result) => {
      for(let i =0; i<(result as any).bookingList.length; i++)
      {
        (result as any).bookingList[i].cost = Math.round((((result as any).bookingList[i].endTime - (result as any).bookingList[i].startTime)/3600000)*(result as any).bookingList[i].workingRate);
        (result as any).bookingList[i].startTime =  this.formatAMPM(new Date((result as any).bookingList[i].startTime));
        (result as any).bookingList[i].endTime =  this.formatAMPM(new Date((result as any).bookingList[i].endTime));

      }
        this.filterLabId((result as any).bookingList, this.mylab);

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

  markPayment(){
    console.log(this.paidId);

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

  formatAMPM(date: Date) {

    let day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
    let month = date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let min = minutes < 10 ? '0'+minutes : minutes;
    let strTime = month+'-'+day+'-'+year+' '+ hours + ':' + min + ' ' + ampm;
    return strTime;
  }

  check(event :any, amount: any, id: any)
  {
    if((event as any).target.checked === true)
    {
      this.totalAmount = this.totalAmount+amount;
      this.paidId.push(id);
    }
    else {
      this.totalAmount = this.totalAmount-amount;
      this.paidId.pop(id);
    }
  }
}

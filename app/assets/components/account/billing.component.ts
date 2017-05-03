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
  arrFilteredLabs: any = [];
  mylab: any = {};
  ManagerLabs: any = [];
  roleId: any;
  filteredLabToPay: any = [];
  filteredLabOwed: any = [];
  billing: any = {};
  labs: any = [];
  totalAmount: any = 0;
  paidId: any = [];
  bookings : any =[];
  filteredLab :any = [];
  bookingsOwed : any =[];
  page1Lab : any = -1;
  page2Lab : any = -1;

  constructor(private authService: AuthenticationService) {
  }

  getBookingsToPayByLabs(id : any) {
    this.filteredLabToPay = [];
    this.totalAmount = 0;
    this.paidId = [];
    this.page1Lab = id;
    this.filteredLabToPay = this.filterLabId((this.bookings).bookingList, id,  "pay");
  }

  getBookings()
  {
    this.authService.getBookingToPayByLabs(this.authService.username)
      .subscribe((result) => {
        for (let i = 0; i < (result as any).bookingList.length; i++) {
          (result as any).bookingList[i].cost = Math.round((((result as any).bookingList[i].endTime - (result as any).bookingList[i].startTime) / 3600000) * (result as any).bookingList[i].workingRate);
          (result as any).bookingList[i].startTime = this.formatAMPM(new Date((result as any).bookingList[i].startTime));
          (result as any).bookingList[i].endTime = this.formatAMPM(new Date((result as any).bookingList[i].endTime));

        }
        this.bookings = result;
        if(this.page1Lab !== -1) {
          this.getBookingsToPayByLabs(this.page1Lab);
        }

      });
    this.authService.getBookingOwedByLabs(this.authService.username)
      .subscribe((result) => {
        for (let i = 0; i < (result as any).bookingList.length; i++) {
          (result as any).bookingList[i].cost = Math.round((((result as any).bookingList[i].endTime - (result as any).bookingList[i].startTime) / 3600000) * (result as any).bookingList[i].workingRate);
          (result as any).bookingList[i].startTime = this.formatAMPM(new Date((result as any).bookingList[i].startTime));
          (result as any).bookingList[i].endTime = this.formatAMPM(new Date((result as any).bookingList[i].endTime));

        }
        this.bookingsOwed = result;
        if(this.page2Lab!== -1) {
          this.getBookingOwedByLabs(this.page2Lab);
        }
      });
  }

  getBookingOwedByLabs(labid : any) {
    console.log(labid);
    this.filteredLabOwed = [];
    this.totalAmount = 0;
    this.paidId = [];
    this.page2Lab = labid;
    this.filteredLabOwed = this.filterLabId((this.bookingsOwed as any).bookingList, labid, "owed");

  }


  filterLabId(result: any, mylab: any, type: string) {
    this.filteredLab = []
    for (let index in result) {
      if (type === "owed") {
        if (result[index].equipmentUnitId.equipment.lab.id.toString() === mylab.toString()) {
          this.filteredLab.push(result[index]);

        }
      }
      else {
        if (result[index].userLabId.id.toString() === mylab.toString()) {
          this.filteredLab.push(result[index]);

        }
      }
    }
    return this.filteredLab;


  }


  ngOnInit() {
    this.totalAmount = 0;
    this.paidId = [];
    this.getLabs();
    this.getBookings();
  }

  markPayment() {
    this.authService.makePayments(this.paidId)
      .subscribe((result) => {
        if ((result as any).status === "Success") {
          this.ngOnInit();
          // for (let index in this.filteredLabToPay) {
          //    if(this.paidId.indexOf(this.filteredLabToPay[index].id) > -1)
          //    {
          //      this.filteredLabToPay.pop(this.filteredLabToPay[index]);
          //      this.paidId.pop(this.filteredLabToPay[index].id);
          //      this.totalAmount = 0;
          //
          //    }
          // }
        }
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

  formatAMPM(date: Date) {

    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let min = minutes < 10 ? '0' + minutes : minutes;
    let strTime = month + '-' + day + '-' + year + ' ' + hours + ':' + min + ' ' + ampm;
    return strTime;
  }

  check(event: any, amount: any, id: any) {
    if ((event as any).target.checked === true) {
      this.totalAmount = this.totalAmount + amount;
      this.paidId.push(id);
    }
    else {
      this.totalAmount = this.totalAmount - amount;
      this.paidId.pop(id);
    }
  }
}

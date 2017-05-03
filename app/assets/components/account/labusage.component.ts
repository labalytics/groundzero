import {Component} from "@angular/core"
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/index";
import {Message} from 'primeng/primeng';

@Component({
  selector: "billing-report",
  templateUrl: "assets/components/account/labusage.component.html"
})

@Injectable()
export class LabUsageComponent implements OnInit {
  data: any;
  msgs: Message[];
  arrBookings: any = [];
  arrLabEquipmentGrouped: any = [];
  labs: any = [];
  arrLabs: any = [];
  roleId: any;
  arrMonthlyBooking: any = [];
  arrYears: any = [];

  bShowChart: boolean = false;
  arrBookingsByYear: any = [];
  oBookingsByYear: any = {};

  arrMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(public http: Http, private authService: AuthenticationService) {

  }

  ngOnInit() {
    // console.log("OnInit --- " + (new Date().getMilliseconds() - this.timestamp.getMilliseconds()));
    this.CreateMonthlyBookingObject();
    this.getRoleandMenuData();
  }

  CreateMonthlyBookingObject() {

    let that = this;
    this.arrMonths.forEach(function (sMonth, nIndex) {
      let oMonthlyBooking = {
        sMonth: sMonth,
        nMonthNumber: nIndex,
        arrBookings: [],
        nCount: 0
      }
      that.arrMonthlyBooking.push(oMonthlyBooking);
    });
  }

  getRoleandMenuData() {
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        // console.log("getRoleandMenuData Response --- " + (new Date().getMilliseconds() - this.timestamp.getMilliseconds()));
        this.roleId = result.userDetails.roleId.id;
        this.getLabs();
      });
  }

  getLabs() {
    this.authService.getAllLabs(this.roleId, this.authService.username)
      .subscribe((result) => {
        // console.log("getLabs Response --- " + (new Date().getMilliseconds() - this.timestamp.getMilliseconds()));
        this.labs = (result as any).labs;
        this.arrLabs = [];
        for (let i = 0; i < this.labs.length; i++) {
          this.arrLabs.push(this.labs[i].labId);
        }
        this.getBookings();
      });
  }

  getBookings() {
    this.authService.getBookings(this.authService.username)
      .subscribe((result) => {
        // console.log("getBookings Response --- " + (new Date().getMilliseconds() - this.timestamp.getMilliseconds()));
        this.arrBookings = result.bookingList;
        this.CreateLabEquipment(this.arrLabs, this.arrBookings);
      });
  }

  CreateLabEquipment(arrLabId: any[], arrBookings: any[]) {
    let arrLabEquipmentGrouped: any = [];
    arrLabId.forEach(function (oLab) {
      let oLabEquipment = {
        nLabId: oLab.id,
        sLabName: oLab.labName,
        arrYearlyBookings: []
      }
      arrLabEquipmentGrouped.push(oLabEquipment);
    });

    let that = this;
    arrBookings.forEach(function (oE) {
      for (let i = 0; i < arrLabEquipmentGrouped.length; i++) {
        if (arrLabEquipmentGrouped[i].nLabId === oE.equipmentUnitId.equipment.lab.id) {
          let dStartTime = oE.startTime ? new Date(oE.startTime) : null;
          let arrYearlyBookings = arrLabEquipmentGrouped[i].arrYearlyBookings;
          let bFound = false;
          // Add year if it does not exists
          for (let i = 0; i < arrYearlyBookings.length; i++) {
            if (arrYearlyBookings[i].nYear === dStartTime.getFullYear()) {
              bFound = true;
              break;
            }
          }
          // If it is not present, add that year
          if (!bFound) {
            let oYearlyBookings = {
              nYear: dStartTime.getFullYear(),
              arrMonthlyBooking: that.arrMonthlyBooking
            }
            arrYearlyBookings.push(oYearlyBookings);
          }

          // Now add equipment to that year, based on it's month

          for (let i = 0; i < arrYearlyBookings.length; i++) {
            if (arrYearlyBookings[i].nYear === dStartTime.getFullYear()) {
              let arrMonthlyBooking = arrYearlyBookings[i].arrMonthlyBooking;
              arrMonthlyBooking.some(function (oMonthlyBooking) {
                if (oMonthlyBooking.nMonthNumber === dStartTime.getMonth()) {
                  oMonthlyBooking.arrBookings.push(oE);
                  oMonthlyBooking.nCount++;
                  return true;
                }
                return false;
              });
              break;
            }
          }
        }
      }
    });

    this.arrLabEquipmentGrouped = arrLabEquipmentGrouped;

    // Now create unique year array
    this.arrLabEquipmentGrouped.forEach(function (oLab) {
      oLab.arrYearlyBookings.forEach(function (oYear) {
        if (that.arrYears.indexOf(oYear.nYear) === -1) {
          that.arrYears.push(oYear.nYear);
        }
      });
    });
    this.arrYears.sort(function (a, b) {
      return a - b
    });

    // Now create yearly report object
    this.arrYears.forEach(function (nYear) {
      let oBookingsByYear = {
        nYear: nYear,
        arrBookingByLab: []
      }
      that.arrBookingsByYear.push(oBookingsByYear);
    });

    this.arrLabEquipmentGrouped.forEach(function (oLabEq) {
      oLabEq.arrYearlyBookings.forEach(function (oYearlyBooking) {
        that.arrBookingsByYear.some(function (oBookingsByYear) {
          let arrMonthlyBooking = [];
          oYearlyBooking.arrMonthlyBooking.forEach(function (oMonthlyBooking) {
            let oCount = {
              nCount: 0
            };
            oMonthlyBooking.arrBookings.forEach(function(oE){
              if(oE.equipmentUnitId.equipment.lab.id === oLabEq.nLabId){
                oCount.nCount++;
              }
            });
            arrMonthlyBooking.push(oCount);
          });
          //oYearlyBooking.arrMonthlyBooking

          if (oBookingsByYear.nYear === oYearlyBooking.nYear) {
            let oBookingByLab = {
              arrMonthlyBooking: arrMonthlyBooking,
              nLabId: oLabEq.nLabId,
              sLabName: oLabEq.sLabName
            }
            oBookingsByYear.arrBookingByLab.push(oBookingByLab);
            return true;
          }
          return false;
        });
      });
    });
    console.log(this.arrBookingsByYear);
    this.oBookingsByYear = this.arrBookingsByYear[this.arrBookingsByYear.length - 1];
    this.RenderChart();
  }

  RenderChart() {
    let data = {
      labels: this.arrMonths,
      datasets: []
    }

    let arrDataset = [];
    let that = this;
    console.log(this.oBookingsByYear);
    if(this.oBookingsByYear!==null) {
      this.oBookingsByYear.arrBookingByLab.forEach(function (oBookingByLab) {
        let innerData = [];
        oBookingByLab.arrMonthlyBooking.forEach(function (oMonthlyBooking) {
          innerData.push(oMonthlyBooking.nCount);
        });
        let oDataset = {
          label: oBookingByLab.sLabName,
          data: innerData,
          fill: false,
          borderColor: that.GetRandomColor()
        }

        data.datasets.push(oDataset);
      });
    }
    this.data = data;
    this.bShowChart = false;

    setTimeout(() => {
      this.bShowChart = true;
    }, 0);

  }

  GetRandomColor() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  }



  selectData(event: Event) {
    this.msgs = [];
    this.msgs.push({
      severity: 'info',
      summary: 'Data Selected',
      'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]
    });
  }
}

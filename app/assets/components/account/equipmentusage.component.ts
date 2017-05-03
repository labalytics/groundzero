import {Component, Injectable, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core"
//import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
//import {OnInit} from '@angular/core';

import {HelperService, AuthenticationService} from "../../services/index";

@Component({
  selector: "equipment-report",
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "assets/components/account/equipmentusage.component.html"
})

@Injectable()
export class EquipmentUsageComponent implements OnInit {
  bShowChart: boolean = false;
  data: any = {};
  labs: any = [];
  arrLabIds: any = [];
  equipments: any = [];
  arrLabEquipmentGrouped: any = [];
  arrBookings: any = [];
  mylab: any = {};
  roleId: any;

  timestamp: Date = new Date();

  constructor(private authService: AuthenticationService, private HS: HelperService, private changeRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    // console.log("OnInit --- " + (new Date().getMilliseconds() - this.timestamp.getMilliseconds()));
    this.getRoleandMenuData();
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
        this.arrLabIds = [];
        for (let i = 0; i < this.labs.length; i++) {
          this.arrLabIds.push(this.labs[i].labId.id);
        }
        if (this.labs.length) {
          this.mylab = this.labs[0];
        }
        this.authService.getEquipments(this.arrLabIds)
          .subscribe((result) => {
            // console.log("getEquipments Response --- " + (new Date().getMilliseconds() - this.timestamp.getMilliseconds()));
            this.equipments = result.equipments;

            this.getBookings();
          });
      });
  }

  getBookings() {
    this.authService.getBookings(this.authService.username)
      .subscribe((result) => {
        // console.log("getBookings Response --- " + (new Date().getMilliseconds() - this.timestamp.getMilliseconds()));
        this.arrBookings = result.bookingList;
        this.CreateLabEquipment(this.arrLabIds, this.equipments, this.arrBookings);
      });
  }

  CreateLabEquipment(arrLabId: any[], arrEquipments: any[], arrBookings: any[]) {
    // console.log("CreateLabEquipment --- " + (new Date().getMilliseconds() - this.timestamp.getMilliseconds()));
    let arrLabEquipmentGrouped: any = [];
    arrLabId.forEach(function (nLabId) {
      let oLabEquipment = {
        nLabId: nLabId,
        arrEquipments: [],
        arrEquipmentsGroupByEquip: []
      }
      arrLabEquipmentGrouped.push(oLabEquipment);
    });

    let that = this;
    arrEquipments.forEach(function (oE) {
      for (let i = 0; i < arrLabEquipmentGrouped.length; i++) {
        if (arrLabEquipmentGrouped[i].nLabId === oE.lab.id) {
          arrLabEquipmentGrouped[i].arrEquipments.push(oE);
          let arrEqGrByEq = arrLabEquipmentGrouped[i].arrEquipmentsGroupByEquip;
          let bFound = false;
          for (let y = 0; y < arrEqGrByEq.length; y++) {
            if (arrEqGrByEq[y].nEquipId === oE.id) {
              bFound = true;
              break;
            }
          }
          if (!bFound) {
            let oEqGrByEq = {
              nEquipId: oE.id,
              sEquipmentName: oE.equipmentName,
              nCount: 0,
              arrEquip: []
            }
            arrEqGrByEq.push(oEqGrByEq);
          }
        }
      }
    });

    arrBookings.forEach(function (oE) {
      for (let i = 0; i < arrLabEquipmentGrouped.length; i++) {
        if (arrLabEquipmentGrouped[i].nLabId === oE.equipmentUnitId.equipment.lab.id) {
          let arrEqGrByEq = arrLabEquipmentGrouped[i].arrEquipmentsGroupByEquip;
          for (let y = 0; y < arrEqGrByEq.length; y++) {
            if (arrEqGrByEq[y].nEquipId === oE.equipmentUnitId.equipment.id) {
              arrEqGrByEq[y].nCount++;
              arrEqGrByEq[y].arrEquip.push(oE.equipmentUnitId.equipment);
              break;
            }
          }
        }
      }
    });

    this.arrLabEquipmentGrouped = arrLabEquipmentGrouped;
    this.RenderChart(this.mylab);
  }

  RenderChart(oMyLab) {
    // console.log("RenderChart --- " + (new Date().getMilliseconds() - this.timestamp.getMilliseconds()));
    //this.mylab = oMyLab;
    let data = {
      labels: [],
      datasets: [
        {
          label: 'Equipment usage',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: []
        }
      ]
    }

    for (let i = 0; i < this.arrLabEquipmentGrouped.length; i++) {
      if (this.arrLabEquipmentGrouped[i].nLabId === this.mylab.labId.id) {
        let arrEqGrByEq = this.arrLabEquipmentGrouped[i].arrEquipmentsGroupByEquip;
        for (let y = 0; y < arrEqGrByEq.length; y++) {
          data.labels.push(arrEqGrByEq[y].sEquipmentName);
          data.datasets[0].data.push(arrEqGrByEq[y].nCount);
        }
        break;
      }
    }

    this.data = data;
    this.bShowChart = false;

    setTimeout(() => {
      this.bShowChart = true;
    }, 100);
    this.changeRef.detectChanges();
  }
}

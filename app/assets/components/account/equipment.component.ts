import {Component} from "@angular/core"
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {OnInit} from '@angular/core';
import {AlertService, AuthenticationService} from "../../services/index";

import { MyEvent } from '../../models/event';

@Component({
  selector: "todo-account-equipment",
  templateUrl: "assets/components/account/equipment.component.html"
})

@Injectable()
export class EquipmentComponent implements OnInit {


  equipments: any = [];
  equipmentUnits: any = [];
  addEquipments: number = 1;
  newequipment: any = {};
  labs: any = [];
  ManagerLabs: any = [];
  roleId: any;
  equipcat : number =  0;


  events: any =[];

  header: any = {};

  event: MyEvent;

  constructor(public http: Http, private authService: AuthenticationService) {

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
        this.authService.getEquipments(this.labs)
          .subscribe((result) => {
            // let labId = result.userDetails.labId.id;
            this.equipments = result.equipments;
            this.equipmentUnits = result.units;
          });
      });
  }
  ngOnInit() {
    this.addEquipments = 1;
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
        this.roleId = result.userDetails.roleId.id;
        this.getLabs();
      });
    this.events = [];
    // this.authService.getEvents().then(events => {this.events = events;});

    this.header = {
      left: 'prev,next, today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
  }

  insertequipment()
  {
    console.log(this.newequipment);
    this.authService.addEquipment(this.newequipment)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
        console.log(result);
        this.ngOnInit();
      });
  }

  dropChange(val:any)
  {
    console.log(val);
  }
  addEquipmentsClick()
  {
    this.addEquipments = 2;
  }

  EquipmentsListClick()
  {
    this.addEquipments = 1;
  }

  getUnits(id: any)
  {
    console.log(id);
  }

  getSchedule(id: any)
  {
    let type = "unit";
    this.authService.getSchedule(type, id)
      .subscribe((result) => {
        let schedule = (result  as any).schedule;
        this.events = [];
        console.log(schedule);
        for(let i = 0; i<schedule.length; i++)
        {
           this.events.push({"title": schedule[i].userLabId.labName,"start": new Date(schedule[i].startTime).toJSON(), "end": new Date(schedule[i].endTime).toJSON()});
        }
      });
  }



}

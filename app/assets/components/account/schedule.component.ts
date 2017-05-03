import {Component, Input} from "@angular/core"
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {OnInit,AfterViewInit} from '@angular/core';
import {AlertService, AuthenticationService} from "../../services/index";
import {Options} from "@types/fullcalendar";
import {ScheduleModule} from 'primeng/primeng';
import {ChangeDetectorRef } from '@angular/core';

import { MyEvent } from '../../models/event';

@Component({
  selector: "todo-account-schedule",
  templateUrl: "assets/components/account/schedule.component.html",
})

@Injectable()
export class ScheduleComponent implements OnInit {

  labs: any = [];
  refinlabs: any =[];
  refoutlabs: any =[];
  loading = false;
  // New Lab
  model: any = {};
  roleId : any;
  externallabId: any = [];
  reservation: any = {};
  completeLabsids : any =[];
  completeLabs : any =[];
  selectedLab : any;
  refLab :any;

  availableUnits : any = [];
  availableEquipments : any = [];

  events: any[];

  header: any;

  event: MyEvent;

  dialogVisible: boolean = false;

  idGen: number = 100;

  constructor(private authService: AuthenticationService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
        this.roleId = result.userDetails.roleId.id;
        this.getLabs();
      });
    this.events = [
      {
        "title": "Conference",
        "start": "2017-04-18",
        "end": "2017-04-19"
      }
    ];
    // this.authService.getEvents().then(events => {this.events = events;});

    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
  }

  handleDayClick(event: any) {
    this.event = new MyEvent();
    this.event.start = event.date._d;
    this.dialogVisible = true;

    //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
    this.cd.detectChanges();
  }

  handleEventClick(e : any) {
    this.event = new MyEvent();
    this.event.title = e.calEvent.title;

    let start = e.calEvent.start;
    let end = e.calEvent.end;
    if(e.view.name === 'month') {
      start.stripTime();
    }
    if(end) {
      end.stripTime();
      this.event.end = end.format();
    }

    this.event.id = e.calEvent.id;
    this.event.start = start.format();
    this.event.allDay = e.calEvent.allDay;
    this.dialogVisible = true;
  }

  saveEvent() {
    //update
    if(this.event.id) {
      let index: number = this.findEventIndexById(this.event.id);
      if(index >= 0) {
        this.events[index] = this.event;
      }
    }
    //new
    else {
      this.event.id = this.idGen++;
      this.events.push(this.event);
      this.event = null;
    }

    this.dialogVisible = false;
  }
  deleteEvent() {
    let index: number = this.findEventIndexById(this.event.id);
    if(index >= 0) {
      this.events.splice(index, 1);
    }
    this.dialogVisible = false;
  }

  findEventIndexById(id: number) {
    let index = -1;
    for(let i = 0; i < this.events.length; i++) {
      if(id === this.events[i].id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getLabs() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    //this.oServiceCall_GetAllLab =
    this.authService.getAllLabs(this.roleId, this.authService.username)
      .subscribe((result) => {
        this.labs = (result  as any).labs;
        this.refinlabs = (result  as any).refInLabs;
        this.refoutlabs = (result  as any).refOutLabs;
        for(let i =0; i<this.labs.length;i++)
        {
          this.completeLabsids.push(this.labs[i].id);
          this.completeLabs.push(this.labs[i].labId);
        }
        for(let i =0; i<this.refinlabs.length;i++)
        {
          this.externallabId.push(this.refinlabs[i].currentLab.id);
          if(this.completeLabsids.indexOf(this.refinlabs[i].currentLab.id) === -1)
          {
            this.completeLabsids.push(this.refinlabs[i].currentLab.id);
            this.completeLabs.push(this.refinlabs[i].currentLab);
          }
        }
      });
  }
  getEquipments()
  {
    this.authService.getAvailables(this.reservation)
      .subscribe((result) => {

        this.availableUnits = (result  as any).units;
        this.availableEquipments = (result  as any).equipments;
        this.refoutlabs = (result  as any).refOutLabs;

      });
  }

  makeReservation(unitId: any)
    {
      let isRef = false;
      if (this.externallabId.indexOf(this.reservation.labid) !== -1) {
        isRef = true;
      }
      this.authService.makeReservation(unitId, this.reservation.date, this.reservation.strtTime, this.reservation.endTime, isRef, this.refLab)
        .subscribe((result) => {

          this.availableUnits = (result  as any).units;
          this.availableEquipments = (result  as any).equipments;
          this.refoutlabs = (result  as any).refOutLabs;

        });
    }

}

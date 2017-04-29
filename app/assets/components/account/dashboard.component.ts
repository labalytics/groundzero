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
  selector: "todo-account-dashboard",
  templateUrl: "assets/components/account/dashboard.component.html",
})

@Injectable()
export class DashBoardComponent implements OnInit {





  events: any =[];

  header: any = {};

  event: MyEvent;

  dialogVisible: boolean = false;

  idGen: number = 100;

  constructor(private authService: AuthenticationService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.events = [
      {
        "title": "Conference",
        "start": "2017-04-18",
        "end": "2017-04-19"
      }
    ];
   // this.authService.getEvents().then(events => {this.events = events;});

    this.header = {
      left: 'prev,next, today',
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



}

import {Component, Input} from "@angular/core"
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {OnInit,AfterViewInit} from '@angular/core';
import {AlertService, AuthenticationService} from "../../services/index";
import {Options} from "@types/fullcalendar";
import {ScheduleModule} from 'primeng/primeng';

import {Calendar} from '@types/fullcalendar';
import {ChangeDetectorRef } from '@angular/core';

import { MyEvent } from '../../models/event';

@Component({
  selector: "todo-account-dashboard",
  templateUrl: "assets/components/account/dashboard.component.html",
})

@Injectable()
export class DashBoardComponent implements OnInit {





  events: any =[];

  reset: any = {};
  header: any = {};

  event: MyEvent;
  roleId : any;

  dialogVisible: boolean = false;

  idGen: number = 100;

  schedule : any = [];
  notifications : any =[];
  requests : any = [];
  userDetails : any = {};
  constructor(private authService: AuthenticationService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
        this.userDetails = (result as any).userDetails.userId;
        this.roleId = result.userDetails.roleId.id;
        this.getSelfSchedule();
      });
  }

  getSelfSchedule()
  {
    this.authService.getSelfSchedule()
      .subscribe((result) => {
        this.schedule = (result as any).schedule;
        for(let i = 0; i<this.schedule.length; i++)
        {
          this.schedule[i].startTime =  this.formatAMPM(new Date(this.schedule[i].startTime));
          this.schedule[i].endTime = this.formatAMPM(new Date(this.schedule[i].endTime));
        }
        if (this.roleId === 1) {
          this.authService.getEquipmentNotification()
            .subscribe((result) => {
                this.notifications = (result as any).notifications;
            });
          this.authService.getLabRequests()
            .subscribe((result) => {
              this.requests = (result as any).requests;
            });
        }
      })
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

  AcceptLabRequest(id : any, value : any)
  {
    this.authService.acceptLabRequest(id, value)
      .subscribe((result) => {
        this.requests = (result as any).requests;
    });
    this.ngOnInit();
  }

  passwordReset()
  {
    this.authService.resetpassword(this.authService.username, this.reset)
      .subscribe((result) => {
          if(result === "Success")
          {

            alert("Updated password");
          }
          else {
            alert("Invalid password");
          }
          //this.router.navigate(['/signup']);

        }
      );
  }


  profileUpdate()
  {
    this.authService.profileUpdate(this.userDetails)
      .subscribe((result) => {
          if((result as any).status === "Success")
          {

            alert("Updated profile");
          }
          else {
            alert("Update failed");
          }
          //this.router.navigate(['/signup']);

        }
      );
  }

}

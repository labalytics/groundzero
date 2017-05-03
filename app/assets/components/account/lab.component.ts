import {Component} from "@angular/core"
import {Injectable} from '@angular/core';
import { Headers, Response, RequestOptions} from '@angular/http';
import {OnInit, OnDestroy} from '@angular/core';
import {AlertService, AuthenticationService} from "../../services/index";
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: "todo-account-lab",
  templateUrl: "assets/components/account/lab.component.html"
})

@Injectable()
export class LabComponent implements OnInit, OnDestroy {

  currentUser: any = {};
  menu: any = [];
  labs: any = [];
  labsCopy: any = [];
  refinlabs: any =[];
  refoutlabs: any =[];
  notreflabs:any =[];
  loading = false;
  searchTerm: string;
  returnUrl: string;
  currentLab: number;
  referedLab: number;
  // New Lab
  model: any = {};
  roleId : any;
  refSelect : any = false;
  myLabId : any =[];
  managerLabId : any =[];
  events: any =[];
  header: any = {};

  /* All Service calls */
  oServiceCall_GetAllLab: Observable<Response>;

  constructor(protected router: Router, private authService: AuthenticationService) {
  }

  getLabs() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    //this.oServiceCall_GetAllLab =
    this.authService.getAllLabs(this.roleId, this.authService.username)
      .subscribe((result) => {
        this.labs = (result  as any).labs;
        this.managerLabId = [];
        for(let i =0; i<this.labs.length;i++)
        {
          this.myLabId.push(this.labs[i].labId.id);
          if(this.labs[i].roleId.id === 1)
          {
            this.managerLabId.push(this.labs[i].labId.id);
          }
        }
        this.refinlabs = (result  as any).refInLabs;
        this.refoutlabs = (result  as any).refOutLabs;

        this.labsCopy = this.labs;
      });
  }

  search(): void {
    let term = this.searchTerm;
    this.labs = this.labsCopy.filter(function (tag: any) {
      return tag.labId.labName.indexOf(term) >= 0;
    });
  }

  insertlab() {
    if(this.roleId === 1) {
      this.model.email = this.authService.username;
    }
    this.authService.addlabs(this.model)
      .subscribe((result) => {
          this.router.navigate(['/labs']);
          this.ngOnInit();
          //window.location.href = window.location.origin + "/home";
        }
      );
  }

  requestLabAccess(currentLab:any,requestedLab: any)
  {
    this.authService.labAccessRequest(currentLab,requestedLab)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
      });
  }

  ngOnInit() {
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

  ngOnDestroy() {
    //this.oServiceCall_GetAllLab.destroy();
  }

  getUnrefferedLabs(labId: any)
  {
    this.refSelect = true;
    this.currentLab = labId;
    if(labId!==-1) {
      this.authService.getUnrefferedLabs(labId, this.authService.username, this.roleId)
        .subscribe((result) => {
          this.notreflabs = (result  as any).notRefLabs;
        });
    }
  }

  deleteLab(labId: any)
  {
  }
  setReferedLab(labId: any)
  {
    this.referedLab = labId;

  }

  getSchedule(id: any)
  {
    let type = "lab";
    this.authService.getSchedule(type, id)
      .subscribe((result) => {
        let schedule = (result  as any).schedule;
        this.events = [];
        for(let i = 0; i<schedule.length; i++)
        {
          this.events.push({"title": schedule[i].equipmentUnitId.equipment.equipmentName+" to " +schedule[i].userLabId.labName,"start": new Date(schedule[i].startTime).toJSON(), "end": new Date(schedule[i].endTime).toJSON()});
        }
      });
  }

  deleteExternalLab(curLabId : any, reqstedLabId : any)
  {

  }

  revertAccess()
  {
    this.refSelect = false;
  }

  UpdateLab(lab: any)
  {
    this.authService.udpateLab(lab)
      .subscribe((result) => {
        if((result as any).status === "Success"){
          alert("Updated Succesfull");
        }
        else {
          alert("Updated aborted");
        }
      });
  }
}

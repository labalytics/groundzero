import {Component} from "@angular/core"
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {OnInit} from '@angular/core';
import {AlertService, AuthenticationService} from "../../services/index";


@Component({
  selector: "todo-account-student",
  templateUrl: "assets/components/account/student.component.html"
})

@Injectable()
export class StudentComponent implements OnInit {

  currentUser: any = {};
  menu: any = [];
  //student:any = {}
  students: any = [];
  loading = false;
  returnUrl: string;
  searchTerm: string;
  studentCopy: any = [];
  roleId: any;
  newstudents: any = [];
  roles: any = [];
  labs: any = [];
  val: number =  1;

  events: any =[];
  header: any = {};
  addStudents: number  = 1;
  managerLabId : any =[];

  constructor(public http: Http, private authService: AuthenticationService) {
    this.val = 1;
    this.newstudents.push({'id': this.val, 'firstName':'', 'lastName': '', 'email':'', 'labid': '' });
    console.log(this.val);

  }

  getStudents(labs: any) {
    this.authService.getStudents(labs,  this.roleId)
      .subscribe((result) => {
        this.students = result;
        this.studentCopy = result;
      });
  }

  search(): void {
    let term = this.searchTerm;
    this.students = this.studentCopy.filter(function (tag : any) {
      return tag.userId.firstName.indexOf(term) >= 0;
    });
  }

  addStudentsClick()
  {
    this.addStudents = 2;
  }

  StudentsListClick()
  {
    this.addStudents = 1;
  }

  getLabs() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    //this.oServiceCall_GetAllLab =
    this.authService.getAllLabs(this.roleId, this.authService.username)
      .subscribe((result) => {
        console.log(result);
        this.labs = (result as any).labs;
        this.managerLabId = [];
        for(let i =0; i<this.labs.length;i++)
        {
          if(this.labs[i].roleId.id === 1)
          {
            this.managerLabId.push(this.labs[i].labId.id);
          }
        }
        this.getStudents(this.managerLabId);
      });
  }

  ngOnInit() {
    this.addStudents = 1;
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
        //console.log(result);
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


  editStudent(student: any) {
    console.log(student);
  }

  reset() {
    this.students = JSON.parse(localStorage.getItem('students'));
    console.log(this.students);
  }

  insertStudents()
  {
    this.authService.insertStudents(this.newstudents)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
        console.log(result);
        this.ngOnInit();
        //this.getLabs(labId);
      });

  }

  newrow()
  {
    this.val = this.val+1;
    console.log(this.val)
    this.newstudents.push({ 'id': this.val, 'firstName':'', 'lastName': '', 'email':'', 'labId': '' });
  }

  deleterow(row: any)
  {
    console.log(row);
    let index = this.newstudents.indexOf(row);
    this.newstudents.splice(index, 1);
    console.log(this.newstudents)
  }

  getSchedule(id: any)
  {
    let type = "student";
    this.authService.getSchedule(type, id)
      .subscribe((result) => {
        let schedule = (result  as any).schedule;
        this.events = [];
        console.log(schedule);
        for(let i = 0; i<schedule.length; i++)
        {
          this.events.push({"title": schedule[i].equipmentUnitId.equipment.equipmentName+" - " +schedule[i].equipmentUnitId.equipment.lab.labName,"start": new Date(schedule[i].startTime).toJSON(), "end": new Date(schedule[i].endTime).toJSON()});
        }
      });
  }

}

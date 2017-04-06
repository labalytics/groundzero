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

  addStudents: number  = 1;

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
    this.students = this.studentCopy.filter(function (tag) {
      return tag.userId.firstName.indexOf(term) >= 0;
    });
  }

  addStudentsClick()
  {
    this.addStudents = 2;
    console.log("Kalyanbsfjkvjdks");
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
        this.labs = result;
        this.getStudents(result);
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


}

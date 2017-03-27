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
  newstudents: any = [];
  studentsBCKP: any = [];
  students: any = [];
  loading = false;
  returnUrl: string;
  searchTerm: string;
  studentCopy: any = [];

  constructor(public http: Http, private authService: AuthenticationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let res = JSON.parse(this.currentUser._body);
    let username = res.response["email"];
    this.authService.getRoleandMenuData(username)
      .subscribe((result) => {
         //this.getStudents(result.userDetails);
        this.students = result.userDetails;
        this.studentsBCKP = result.userDetails;
        this.studentCopy = result.userDetails;
        }
      );
  }

  getStudents(userDetails: Array<Object>) {
    this.authService.getStudents(userDetails)
      .subscribe((result) => {
        this.students = result;
        this.studentsBCKP = result;
        this.studentCopy = result;
      });
  }

  search(): void {
    let term = this.searchTerm;
    this.students = this.studentCopy.filter(function (tag) {
      return tag.userId.firstName.indexOf(term) >= 0;
    });
  }

  ngOnInit() {
    //console.log(this.ev); // Has NO value
  }


  editStudent(student: any) {
    console.log(student);
  }

  reset() {
    this.students = JSON.parse(localStorage.getItem('students'));
    console.log(this.students);
  }
}

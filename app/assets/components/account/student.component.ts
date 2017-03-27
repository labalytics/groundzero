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
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
        console.log(result);
        this.getStudents(result.userDetails)
        //this.getLabs(labId);
      });
  }


  editStudent(student: any) {
    console.log(student);
  }

  reset() {
    this.students = JSON.parse(localStorage.getItem('students'));
    console.log(this.students);
  }
}

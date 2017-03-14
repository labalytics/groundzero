import {Component} from "@angular/core"
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { AlertService, AuthenticationService } from "../../services/index";


@Component({
  selector: "todo-account-lab",
  templateUrl: "assets/components/account/lab.component.html",
  providers: [AuthenticationService]
})

@Injectable()
export class LabComponent implements OnInit{

  currentUser: any = {};
  menu: any =[];
  //student:any = {}
  newstudents: any = [];
  studentsBCKP: any = [];
  loading = false;
  returnUrl: string;

  constructor(public http: Http)
  {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))

    console.log("here");
    this.getLabs(this.currentUser[0].labId.id).subscribe();
    //this.getStudents();
  }

  getLabs(labid: string) {
    console.log("here");
    console.log(labid);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("here");
    return this.http.post('/getlabs', JSON.stringify({ labid: labid}), options)
      .map((response: Response) => {
        console.log("FInall");
        console.log(response.json());
        this.students = response.json();
        localStorage.setItem('students', JSON.stringify(this.students));
        this.studentsBCKP = this.students;

      });
  }

  ngOnInit() {

    //console.log(this.ev); // Has NO value
  }



  editStudent(student){
    console.log(student);
  }

  reset()
  {
    console.log("here");
    this.students = JSON.parse(localStorage.getItem('students'));
    console.log(this.students);
  }
}

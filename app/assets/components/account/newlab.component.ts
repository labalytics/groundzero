import {Component} from "@angular/core"
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { AlertService, AuthenticationService } from "../../services/index";


@Component({
  selector: "todo-account-newlab",
  templateUrl: "assets/components/account/newlab.component.html",
  providers: [AuthenticationService]
})

@Injectable()
export class NewLabComponent implements OnInit{


  lab: any = {};
  loading = false;
  returnUrl: string;

  constructor(public http: Http)
  {
    console.log("here");
  }

  insertlab() {
    console.log("here");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("here");
    return this.http.post('/insert', JSON.stringify({ this.lab }), options)
      .map((response: Response) => {

        console.log(response.json());
      });
  }

  ngOnInit() {

    //console.log(this.ev); // Has NO value
  }


  //
  // reset()
  // {
  //
  // }
}

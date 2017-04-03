import {Component} from "@angular/core"
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { AlertService, AuthenticationService } from "../../services/index";
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: "todo-account-newlab",
  templateUrl: "assets/components/account/newlab.component.html",
  providers: [AuthenticationService]
})

@Injectable()
export class NewLabComponent implements OnInit{


  model: any = {};
  loading = false;
  returnUrl: string;
  roleId = 1;

  constructor(protected router: Router, public authenticationService: AuthenticationService)
  {
    console.log("here");
  }

  insertlab() {
    console.log(this.authenticationService.username);
    if(this.roleId === 1) {
      console.log("here");
      this.model.email = this.authenticationService.username;
    }
    console.log(this.model);
    this.authenticationService.addlabs(this.model)
      .subscribe((result) => {
          console.log(result);
          this.router.navigate(['/labs']);
          //window.location.href = window.location.origin + "/home";
        }
      );
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

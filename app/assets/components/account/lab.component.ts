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
  loading = false;
  searchTerm: string;
  returnUrl: string;

  // New Lab
  model: any = {};
  roleId = 1;

  /* All Service calls */
  oServiceCall_GetAllLab: Observable<Response>;

  constructor(protected router: Router, private authService: AuthenticationService) {
  }

  getLabs(labid: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    //this.oServiceCall_GetAllLab =
    this.authService.getAllLabs(labid, this.authService.username)
      .subscribe((result) => {
        this.labs = result;
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
    console.log(this.authService.username);
    if(this.roleId === 1) {
      console.log("here");
      this.model.email = this.authService.username;
    }
    console.log(this.model);
    this.authService.addlabs(this.model)
      .subscribe((result) => {
          console.log(result);
          this.router.navigate(['/labs']);
          this.ngOnInit();
          //window.location.href = window.location.origin + "/home";
        }
      );
  }

  ngOnInit() {
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
       // let labId = result.userDetails.labId.id;
        this.labs = result.userDetails;
        this.labsCopy = this.labs;
        this.roleId = result.userDetails[0].roleId.id;
        //this.getLabs(labId);
      });
  }

  ngOnDestroy() {
    //this.oServiceCall_GetAllLab.destroy();
  }
}

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
        console.log(result);
        this.refinlabs = (result  as any).refInLabs;
        this.refoutlabs = (result  as any).refOutLabs;
        console.log(this.refoutlabs.length);

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

  requestLabAccess(currentLab:any,requestedLab: any)
  {
    this.authService.labAccessRequest(currentLab,requestedLab)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
        console.log(result);
      });
  }

  ngOnInit() {
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
       // let labId = result.userDetails.labId.id;
        console.log(result);
        this.roleId = result.userDetails.roleId.id;
        this.getLabs();
      });
  }

  ngOnDestroy() {
    //this.oServiceCall_GetAllLab.destroy();
  }

  getUnrefferedLabs(labId: any)
  {
    this.currentLab = labId;
    console.log(labId);
    if(labId!==-1) {
      this.authService.getUnrefferedLabs(labId, this.authService.username, this.roleId)
        .subscribe((result) => {
          this.notreflabs = (result  as any).notRefLabs;
        });
    }
  }

  deleteLab(labId: any)
  {
    console.log(labId);
  }
  setReferedLab(labId: any)
  {
    this.referedLab = labId;

  }
}

import {Component} from "@angular/core"
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {OnInit, OnDestroy} from '@angular/core';
import {AlertService, AuthenticationService} from "../../services/index";
import {Observable} from 'rxjs/Observable';

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

  /* All Service calls */
  oServiceCall_GetAllLab: Observable<Response>;

  constructor(public http: Http, private authService: AuthenticationService) {
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
    this.labs = this.labsCopy.filter(function (tag) {
      return tag.labId.labName.indexOf(term) >= 0;
    });
  }

  ngOnInit() {
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
       // let labId = result.userDetails.labId.id;
        this.labs = result.userDetails;
        this.labsCopy = this.labs;
        //this.getLabs(labId);
      });
  }

  ngOnDestroy() {
    //this.oServiceCall_GetAllLab.destroy();
  }
}

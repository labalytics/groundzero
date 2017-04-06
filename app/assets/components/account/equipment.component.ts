import {Component} from "@angular/core"
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {OnInit} from '@angular/core';
import {AlertService, AuthenticationService} from "../../services/index";


@Component({
  selector: "todo-account-equipment",
  templateUrl: "assets/components/account/equipment.component.html"
})

@Injectable()
export class EquipmentComponent implements OnInit {


  equipments: any = [];
  addEquipments: number = 1;
  newequipment: any = {};
  labs: any = [];
  roleId: any;
  equipcat : number =  0;

  constructor(public http: Http, private authService: AuthenticationService) {

  }

  getLabs() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    //this.oServiceCall_GetAllLab =
    this.authService.getAllLabs(this.roleId, this.authService.username)
      .subscribe((result) => {
        this.labs = result;
        console.log(this.labs);
        this.authService.getEquipments(this.labs)
          .subscribe((result) => {
            // let labId = result.userDetails.labId.id;
            console.log(result.equipments);
            this.equipments = result.equipments;
          });
      });
  }
  ngOnInit() {
    this.addEquipments = 1;
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
        this.roleId = result.userDetails.roleId.id;
        this.getLabs();
      });
  }

  insertequipment()
  {
    console.log(this.newequipment);
    this.authService.addEquipment(this.newequipment)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
        console.log(result);
        this.ngOnInit();
      });
  }

  dropChange(val:any)
  {
    console.log(val);
  }
  addEquipmentsClick()
  {
    this.addEquipments = 2;
  }

  EquipmentsListClick()
  {
    this.addEquipments = 1;
  }

}

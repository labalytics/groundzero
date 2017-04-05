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
  roles: any = [];
  equipcat : number =  0;

  constructor(public http: Http, private authService: AuthenticationService) {

  }

  ngOnInit() {
    this.addEquipments = 1;
    this.authService.getRoleandMenuData(this.authService.username)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
        console.log(result);
        this.roles = result.userDetails;
        this.authService.getEquipments(result.userDetails)
          .subscribe((result) => {
          // let labId = result.userDetails.labId.id;
          console.log(result.equipments);
          this.equipments = result.equipments;
          });

      });
  }

  insertequipment()
  {
    console.log(this.newequipment);
    this.authService.addEquipment(this.newequipment)
      .subscribe((result) => {
        // let labId = result.userDetails.labId.id;
        console.log(result);
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

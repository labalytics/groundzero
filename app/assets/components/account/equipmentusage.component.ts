import {Component} from "@angular/core"
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {OnInit} from '@angular/core';

import {HelperService, AuthenticationService} from "../../services/index";

@Component({
  selector: "equipment-report",
  templateUrl: "assets/components/account/equipmentusage.component.html"
})

@Injectable()
export class EquipmentUsageComponent implements OnInit {
  data: any;
  initdata: any;

  constructor(public http: Http, private HS: HelperService) {

  }

  ngOnInit() {
    this.initdata = [
      {
        eId: 1,
        eName: "Equip One",
        eDate: "12/13/2017",
        eLab: "Lab 1"
      },{
        eId: 2,
        eName: "Equip Two",
        eDate: "12/13/2017",
        eLab: "Lab 1"
      },{
        eId: 3,
        eName: "Equip Three",
        eDate: "12/13/2017",
        eLab: "Lab 1"
      },{
        eId: 2,
        eName: "Equip Two",
        eDate: "12/13/2017",
        eLab: "Lab 1"
      },{
        eId: 3,
        eName: "Equip Three",
        eDate: "12/13/2017",
        eLab: "Lab 1"
      },{
        eId: 4,
        eName: "Equip Four",
        eDate: "12/13/2017",
        eLab: "Lab 1"
      },{
        eId: 2,
        eName: "Equip Two",
        eDate: "12/13/2017",
        eLab: "Lab 1"
      },
    ];

    this.data = this.FormatEquipment();

    this.data = {
      labels: ['Equip 1', 'Equip 2', 'Equip 3', 'Equip 4', 'Equip 5', 'Equip 6', 'Equip 7'],
      datasets: [
        {
          label: 'Equipment usage',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }
  }

  FormatEquipment(){
    let labels: any [];
    let data: Int8Array [];
    this.initdata.forEach(function(oE){

    });
  }
}

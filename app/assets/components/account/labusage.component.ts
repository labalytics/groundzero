import {Component} from "@angular/core"
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/index";
import {Message} from 'primeng/primeng';

@Component({
  selector: "billing-report",
  templateUrl: "assets/components/account/labusage.component.html"
})

@Injectable()
export class LabUsageComponent implements OnInit {
  data: any;
  msgs: Message[];
  constructor(public http: Http, private authService: AuthenticationService) {

  }

  ngOnInit() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Jake Labs',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Chemistry lab',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    }
  }

  selectData(event: Event) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
  }
}

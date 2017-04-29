import {Component, OnInit} from "@angular/core"
import { LabalyticsService }  from '../../services/data.service';
import { User } from '../../models/user';

@Component({
  selector: "landing",
  templateUrl: "assets/components/common/landing.component.html",
  providers: [ LabalyticsService ],
})
export class LandingComponent implements OnInit {
  isAdmin = false;
  hookLog: string[];
  allUsers: User[];
  errorMessage: string;
  serverResponse: string;

  heroName = "Windstorm";
  // private logger: LoggerService;
  //
  constructor (private userService: LabalyticsService) {
    this.hookLog = ["AA","BB","CC"];
    this.isAdmin = false;
  }

  ngOnInit() { this.getHeroes(); this.getResponseFromServer(); }

  getHeroes() {
    this.userService.getHeroes()
      .subscribe(
        heroes => this.allUsers = heroes,
        error =>  this.errorMessage = <any>error);
  }

  getResponseFromServer() {
    this.userService.getResponseFromServer()
      .subscribe(
        heroes => this.serverResponse = heroes,
        error =>  this.errorMessage = <any>error);

  }

  toggleChild() {
    this.isAdmin = !this.isAdmin;
    if (this.isAdmin) {
      this.heroName = "Admin";
    } else {
      this.heroName = "Student";
    }
  }

  updateHero() {
    this.heroName += "!";
  }

}

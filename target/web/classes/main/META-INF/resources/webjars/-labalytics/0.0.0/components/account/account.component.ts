import {Component} from "@angular/core"

@Component({
  selector: "todo-account",
  templateUrl: "assets/components/account/account.component.html"
})
export default class AccountComponent {
  isAdmin = false;
  hookLog: string[];

  heroName = "Windstorm";
  // private logger: LoggerService;
  //
  constructor() {
    this.hookLog = ["AA","BB","CC"];
    this.isAdmin = false;
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

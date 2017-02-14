import {Component} from "@angular/core"
import {GreeterStore} from "../../services/greeter.store"

@Component({
    selector: "todo-login-app",
    templateUrl: "assets/module/login/login.html"
})
export default class LoginComponent {

   constructor(private oGreeterStore:GreeterStore){
     this.oGreeterStore = oGreeterStore;
   }
}


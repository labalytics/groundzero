import { NgModule }      from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule }   from "@angular/forms"
import LoginComponent from "./login";
import {GreeterStore} from "../../services/greeter.store";
import {GreeterTodoStore} from "../../services/greeter";

@NgModule({
    imports: [
      BrowserModule
      , FormsModule
    ],
    declarations: [LoginComponent],
    bootstrap: [LoginComponent],
  providers: [
    {provide: GreeterStore, useValue: new GreeterTodoStore()}
  ]
})
export class LoginModule { }


import { NgModule }      from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule }   from "@angular/forms"
import HomeComponent from "./home";
import {GreeterStore} from "../../services/greeter.store";
import {GreeterTodoStore} from "../../services/greeter";

@NgModule({
  imports: [
    BrowserModule
    , FormsModule
  ],
  declarations: [HomeComponent],
  bootstrap: [HomeComponent],
  providers: [
    {provide: GreeterStore, useValue: new GreeterTodoStore()}
  ]
})
export class HomeModule { }


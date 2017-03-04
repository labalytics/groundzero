import { NgModule }      from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule }   from "@angular/forms"
import HeadComponent from "./header";
import {GreeterStore} from "../../services/greeter.store";
import {GreeterTodoStore} from "../../services/greeter";
import { HttpModule } from '@angular/http';
import { ModuleWithProviders } from '@angular/core';



@NgModule({
    imports: [
      BrowserModule
      , FormsModule
      , HttpModule
    ],
    declarations: [HeadComponent],
      bootstrap: [HeadComponent],
  providers: [
    {provide: GreeterStore, useValue: new GreeterTodoStore()}
  ]
})
export class HeadModule { }


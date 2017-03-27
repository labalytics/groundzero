import { NgModule }      from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule }   from "@angular/forms"
import { HttpModule, JsonpModule } from "@angular/http";

import { LabalyticsComponent } from "./app";
import { LandingComponent } from "../../components/common/landing.component"

@NgModule({
  imports: [
    BrowserModule
    , FormsModule
    , HttpModule
    , JsonpModule
  ],
  declarations: [LabalyticsComponent, LandingComponent],
  bootstrap: [LabalyticsComponent]
})
export class LabalyticsModule { }


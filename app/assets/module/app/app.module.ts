import { NgModule }      from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule }   from "@angular/forms"
import { HttpModule, JsonpModule } from "@angular/http";

import { LabalyticsComponent } from "./app";
import { AccountComponent } from "../../components/account/account.component"
import { AdminComponent } from "../../components/account/admin.component"
import { StudentComponent } from "../../components/account/student.component"
import { DeveloperComponent } from "../../components/account/developer.component"
import { requestOptionsProvider }   from "../../services/default-request-options.service"

@NgModule({
  imports: [
    BrowserModule
    , FormsModule
    , HttpModule
    , JsonpModule
  ],
  declarations: [LabalyticsComponent, AccountComponent, AdminComponent, StudentComponent, DeveloperComponent],
  bootstrap: [LabalyticsComponent],
  providers: [
    requestOptionsProvider
  ]
})
export class LabalyticsModule { }


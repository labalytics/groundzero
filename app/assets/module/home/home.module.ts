import {NgModule}      from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"
import {FormsModule}   from "@angular/forms"
import {HttpModule} from '@angular/http'
import {RouterModule, Routes} from "@angular/router";
import {APP_BASE_HREF} from '@angular/common';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {HomeComponent} from "./home";
import {HeadComponent} from "../../components/common/header";
import {MenuComponent} from "../../components/common/menu";

import { AuthenticationService } from  "../../services/authentication.service"

import {AdminComponent} from "../../components/account/admin.component"
import {StudentComponent} from "../../components/account/student.component"
import {LabComponent} from "../../components/account/lab.component"
import {DeveloperComponent} from "../../components/account/developer.component"
import {NewLabComponent} from "../../components/account/newlab.component"
import {EquipmentComponent} from "../../components/account/equipment.component"

const routes: Routes = [
  {path: 'admin', pathMatch: 'full', component: AdminComponent},
  {path: 'students', pathMatch: 'full', component: StudentComponent},
  {path: 'labs', pathMatch: 'full', component: LabComponent},
  {path: '', redirectTo: 'labs', pathMatch: 'full'},
  {path: 'dev', pathMatch: 'full', component: DeveloperComponent},
  {path: 'newlab', pathMatch: 'full', component: NewLabComponent},
  {path: 'equipments', pathMatch: 'full', component: EquipmentComponent}
];

@NgModule({
  imports: [
    BrowserModule
    , FormsModule
    , HttpModule
    , RouterModule.forRoot(routes)
  ],
  declarations: [HomeComponent, HeadComponent, MenuComponent, AdminComponent, StudentComponent,LabComponent, DeveloperComponent, NewLabComponent, EquipmentComponent],
  bootstrap: [HomeComponent],
  providers: [
    AuthenticationService,
    {provide: APP_BASE_HREF, useValue: ''},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class HomeModule {
}


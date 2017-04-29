import {NgModule}      from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"
import {FormsModule}   from "@angular/forms"
import {HttpModule} from '@angular/http'
import {RouterModule, Routes} from "@angular/router";
import {APP_BASE_HREF} from '@angular/common';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ScheduleModule, DialogModule , CalendarModule, CheckboxModule} from 'primeng/primeng';


import {HomeComponent} from "./home";
import {HeadComponent} from "../../components/common/header";
import {MenuComponent} from "../../components/common/sidebar";
import {FooterComponent} from "../../components/common/footer";
import {ScheduleComponent} from "../../components/account/schedule.component"

import { AuthenticationService } from  "../../services/authentication.service"

import {AdminComponent} from "../../components/account/admin.component"
import {StudentComponent} from "../../components/account/student.component"
import {LabComponent} from "../../components/account/lab.component"
import {DeveloperComponent} from "../../components/account/developer.component"
import {EquipmentComponent} from "../../components/account/equipment.component"
import {DashBoardComponent} from "../../components/account/dashboard.component"


const routes: Routes = [
  {path: 'admin', pathMatch: 'full', component: AdminComponent},
  {path: 'students', pathMatch: 'full', component: StudentComponent},
  {path: 'labs', pathMatch: 'full', component: LabComponent},
  {path: 'dev', pathMatch: 'full', component: DeveloperComponent},
  {path: 'equipments', pathMatch: 'full', component: EquipmentComponent},
  {path: 'schedule', pathMatch: 'full', component: ScheduleComponent},
  {path: 'dashboard', pathMatch: 'full', component: DashBoardComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [
    BrowserModule
    , FormsModule
    , HttpModule
    , RouterModule.forRoot(routes),
    ScheduleModule,
    DialogModule,
    CalendarModule,
    CheckboxModule
  ],
  declarations: [HomeComponent, HeadComponent, MenuComponent, FooterComponent, AdminComponent, StudentComponent,LabComponent, DeveloperComponent, EquipmentComponent, ScheduleComponent, DashBoardComponent],
  bootstrap: [HomeComponent],
  providers: [
    AuthenticationService,
    {provide: APP_BASE_HREF, useValue: ''},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class HomeModule {
}


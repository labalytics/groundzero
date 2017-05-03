import {NgModule}      from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"
import {FormsModule}   from "@angular/forms"
import {HttpModule} from '@angular/http'
import {RouterModule, Routes} from "@angular/router";
import {APP_BASE_HREF} from '@angular/common';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ScheduleModule, DialogModule , CalendarModule, CheckboxModule, ChartModule, GrowlModule} from 'primeng/primeng';

import {HomeComponent} from "./home";
import {HeadComponent} from "../../components/common/header";
import {MenuComponent} from "../../components/common/sidebar";
import {FooterComponent} from "../../components/common/footer";
import {ScheduleComponent} from "../../components/account/schedule.component"

import {AuthenticationService} from  "../../services/authentication.service"
import {HelperService} from  "../../services/helper.service"

import {StudentComponent} from "../../components/account/student.component"
import {LabComponent} from "../../components/account/lab.component"
import {EquipmentComponent} from "../../components/account/equipment.component"
import {DashBoardComponent} from "../../components/account/dashboard.component"
import {LabUsageComponent} from "../../components/account/labusage.component"
import {EquipmentUsageComponent} from "../../components/account/equipmentusage.component"
import {BillingComponent} from "../../components/account/billing.component"


const routes: Routes = [
  {path: 'students', pathMatch: 'full', component: StudentComponent},
  {path: 'labs', pathMatch: 'full', component: LabComponent},
  {path: 'equipments', pathMatch: 'full', component: EquipmentComponent},
  {path: 'schedule', pathMatch: 'full', component: ScheduleComponent},
  {path: 'dashboard', pathMatch: 'full', component: DashBoardComponent},
  {path: 'labusage', pathMatch: 'full', component: LabUsageComponent},
  {path: 'equipmentusage', pathMatch: 'full', component: EquipmentUsageComponent},
  {path: 'billing', pathMatch: 'full', component: BillingComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [
    BrowserModule
    , FormsModule
    , HttpModule
    , RouterModule.forRoot(routes)
    , ScheduleModule
    , DialogModule
    , CalendarModule
    , CheckboxModule
    , ChartModule
    , GrowlModule
  ],
  declarations: [HomeComponent, HeadComponent, MenuComponent, FooterComponent, StudentComponent,LabComponent, EquipmentComponent, ScheduleComponent, DashBoardComponent, LabUsageComponent, EquipmentUsageComponent , BillingComponent],
  bootstrap: [HomeComponent],
  providers: [
    AuthenticationService,
    HelperService,
    {provide: APP_BASE_HREF, useValue: ''},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class HomeModule {
}


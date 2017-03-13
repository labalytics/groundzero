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

import {AdminComponent} from "../../components/account/admin.component"
import {StudentComponent} from "../../components/account/student.component"
import {DeveloperComponent} from "../../components/account/developer.component"

const routes: Routes = [
  {path: 'admin', pathMatch: 'full', component: AdminComponent},
  {path: 'student', pathMatch: 'full', component: StudentComponent},
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {path: 'dev', pathMatch: 'full', component: DeveloperComponent}
];

@NgModule({
  imports: [
    BrowserModule
    , FormsModule
    , HttpModule
    , RouterModule.forRoot(routes)
  ],
  declarations: [HomeComponent, HeadComponent, MenuComponent, AdminComponent, StudentComponent, DeveloperComponent],
  bootstrap: [HomeComponent],
  providers: [
    {provide: APP_BASE_HREF, useValue: ''},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class HomeModule {
}


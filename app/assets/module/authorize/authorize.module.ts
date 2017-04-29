import {NgModule}      from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"
import {FormsModule}   from "@angular/forms"
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from "@angular/router";
import {APP_BASE_HREF} from '@angular/common';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';


import {LoginComponent} from "../../components/authorize/login";
import {SignupComponent} from "../../components/authorize/signup";
import {AuthorizeComponent} from "./authorize";

const routes: Routes = [
  {path: 'login', pathMatch: 'full', component: LoginComponent},
  {path: 'signup', pathMatch: 'full', component: SignupComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    BrowserModule
    , FormsModule
    , HttpModule
    , RouterModule.forRoot(routes)
  ],
  declarations: [AuthorizeComponent, LoginComponent, SignupComponent],
  bootstrap: [AuthorizeComponent],
  providers: [
    {provide: APP_BASE_HREF, useValue: ''},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class AuthorizeModule {
}

import { NgModule }      from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule }   from "@angular/forms"

import TodoAppComponent from "./app"
import AccountComponent from "../../components/account/account.component"
import AdminComponent from "../../components/account/admin.component"
import StudentComponent from "../../components/account/student.component"
import DeveloperComponent from "../../components/account/developer.component"

import { LocalStorageTodoStore } from "../../services/store"
import { TodoStore } from "../../services/todo.store"

@NgModule({
    imports: [
      BrowserModule
      , FormsModule
    ],
    declarations: [TodoAppComponent, AccountComponent, AdminComponent, StudentComponent, DeveloperComponent],
    bootstrap: [TodoAppComponent],
    providers: [
      {provide: TodoStore, useValue: new LocalStorageTodoStore()}
    ]
})
export class TodoAppModule { }


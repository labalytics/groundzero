System.register(["@angular/core", "@angular/platform-browser", "@angular/forms", "./app", "../../components/account/account.component", "../../components/account/admin.component", "../../components/account/student.component", "../../components/account/developer.component", "../../services/store", "../../services/todo.store"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_1, forms_1, app_1, account_component_1, admin_component_1, student_component_1, developer_component_1, store_1, todo_store_1;
    var TodoAppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (account_component_1_1) {
                account_component_1 = account_component_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
            },
            function (student_component_1_1) {
                student_component_1 = student_component_1_1;
            },
            function (developer_component_1_1) {
                developer_component_1 = developer_component_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (todo_store_1_1) {
                todo_store_1 = todo_store_1_1;
            }],
        execute: function() {
            TodoAppModule = (function () {
                function TodoAppModule() {
                }
                TodoAppModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            forms_1.FormsModule
                        ],
                        declarations: [app_1.default, account_component_1.default, admin_component_1.default, student_component_1.default, developer_component_1.default],
                        bootstrap: [app_1.default],
                        providers: [
                            { provide: todo_store_1.TodoStore, useValue: new store_1.LocalStorageTodoStore() }
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], TodoAppModule);
                return TodoAppModule;
            }());
            exports_1("TodoAppModule", TodoAppModule);
        }
    }
});
//# sourceMappingURL=/assets/module/app/app.module.js.map
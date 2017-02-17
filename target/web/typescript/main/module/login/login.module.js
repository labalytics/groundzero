System.register(["@angular/core", "@angular/platform-browser", "@angular/forms", "./login", "../../services/greeter.store", "../../services/greeter", "@angular/material"], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, forms_1, login_1, greeter_store_1, greeter_1, material_1;
    var LoginModule;
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
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (greeter_store_1_1) {
                greeter_store_1 = greeter_store_1_1;
            },
            function (greeter_1_1) {
                greeter_1 = greeter_1_1;
            },
            function (material_1_1) {
                material_1 = material_1_1;
            }],
        execute: function() {
            LoginModule = (function () {
                function LoginModule() {
                }
                LoginModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            forms_1.FormsModule,
                            material_1.MaterialModule.forRoot()
                        ],
                        declarations: [login_1.default],
                        bootstrap: [login_1.default],
                        providers: [
                            { provide: greeter_store_1.GreeterStore, useValue: new greeter_1.GreeterTodoStore() }
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LoginModule);
                return LoginModule;
            }());
            exports_1("LoginModule", LoginModule);
        }
    }
});
//# sourceMappingURL=/assets/module/login/login.module.js.map
System.register(["@angular/core"], function(exports_1, context_1) {
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
    var core_1;
    var AccountComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AccountComponent = (function () {
                // private logger: LoggerService;
                //
                function AccountComponent() {
                    this.isAdmin = false;
                    this.heroName = "Windstorm";
                    this.hookLog = ["AA", "BB", "CC"];
                    this.isAdmin = false;
                }
                AccountComponent.prototype.toggleChild = function () {
                    this.isAdmin = !this.isAdmin;
                    if (this.isAdmin) {
                        this.heroName = "Admin";
                    }
                    else {
                        this.heroName = "Student";
                    }
                };
                AccountComponent.prototype.updateHero = function () {
                    this.heroName += "!";
                };
                AccountComponent = __decorate([
                    core_1.Component({
                        selector: "todo-account",
                        templateUrl: "assets/components/account/account.component.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], AccountComponent);
                return AccountComponent;
            }());
            exports_1("default", AccountComponent);
        }
    }
});
//# sourceMappingURL=/assets/components/account/account.component.js.map
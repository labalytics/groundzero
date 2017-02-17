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
    var LocalStorageTodoStore;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            LocalStorageTodoStore = (function () {
                function LocalStorageTodoStore() {
                    this.todos = JSON.parse(localStorage.getItem("angular2-todos") || "[]");
                }
                LocalStorageTodoStore.prototype.updateStore = function () {
                    localStorage.setItem("angular2-todos", JSON.stringify(this.todos));
                };
                LocalStorageTodoStore.prototype.getWithCompleted = function (completed) {
                    return this.todos.filter(function (todo) { return todo.completed === completed; });
                };
                LocalStorageTodoStore.prototype.allCompleted = function () {
                    return this.todos.length === this.getCompleted().length;
                };
                LocalStorageTodoStore.prototype.setAllTo = function (completed) {
                    this.todos.forEach(function (t) { return t.completed = completed; });
                    this.updateStore();
                };
                LocalStorageTodoStore.prototype.removeCompleted = function () {
                    this.todos = this.getWithCompleted(false);
                    this.updateStore();
                };
                LocalStorageTodoStore.prototype.getRemaining = function () {
                    return this.getWithCompleted(false);
                };
                LocalStorageTodoStore.prototype.getCompleted = function () {
                    return this.getWithCompleted(true);
                };
                LocalStorageTodoStore.prototype.toggleCompletion = function (todo) {
                    todo.completed = !todo.completed;
                    this.updateStore();
                };
                LocalStorageTodoStore.prototype.remove = function (todo) {
                    this.todos.splice(this.todos.indexOf(todo), 1);
                    this.updateStore();
                };
                LocalStorageTodoStore.prototype.add = function (title) {
                    var todo = {
                        completed: false,
                        editing: false,
                        title: title
                    };
                    this.todos.push(todo);
                    this.updateStore();
                };
                LocalStorageTodoStore = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], LocalStorageTodoStore);
                return LocalStorageTodoStore;
            }());
            exports_1("LocalStorageTodoStore", LocalStorageTodoStore);
        }
    }
});
//# sourceMappingURL=/assets/services/store.js.map
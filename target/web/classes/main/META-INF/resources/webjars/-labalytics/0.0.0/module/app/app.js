System.register(["@angular/core", "../../services/todo.store"], function(exports_1, context_1) {
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
    var core_1, todo_store_1;
    var TodoAppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_store_1_1) {
                todo_store_1 = todo_store_1_1;
            }],
        execute: function() {
            TodoAppComponent = (function () {
                function TodoAppComponent(todoStore) {
                    this.todoStore = todoStore;
                    this.newTodoText = "";
                    this.todoStore = todoStore;
                }
                TodoAppComponent.prototype.stopEditing = function (todo, editedTitle) {
                    todo.title = editedTitle;
                    todo.editing = false;
                };
                TodoAppComponent.prototype.cancelEditingTodo = function (todo) {
                    todo.editing = false;
                };
                TodoAppComponent.prototype.updateEditingTodo = function (todo, editedTitle) {
                    editedTitle = editedTitle.trim();
                    todo.editing = false;
                    if (editedTitle.length === 0) {
                        return this.todoStore.remove(todo);
                    }
                    todo.title = editedTitle;
                };
                TodoAppComponent.prototype.editTodo = function (todo) {
                    todo.editing = true;
                };
                TodoAppComponent.prototype.removeCompleted = function () {
                    this.todoStore.removeCompleted();
                };
                TodoAppComponent.prototype.toggleCompletion = function (todo) {
                    this.todoStore.toggleCompletion(todo);
                };
                TodoAppComponent.prototype.remove = function (todo) {
                    this.todoStore.remove(todo);
                };
                TodoAppComponent.prototype.addTodo = function () {
                    if (this.newTodoText.trim().length) {
                        this.todoStore.add(this.newTodoText);
                        this.newTodoText = "";
                    }
                };
                TodoAppComponent = __decorate([
                    core_1.Component({
                        selector: "todo-app",
                        templateUrl: "assets/module/app/app.html"
                    }), 
                    __metadata('design:paramtypes', [todo_store_1.TodoStore])
                ], TodoAppComponent);
                return TodoAppComponent;
            }());
            exports_1("default", TodoAppComponent);
        }
    }
});
//# sourceMappingURL=/assets/module/app/app.js.map
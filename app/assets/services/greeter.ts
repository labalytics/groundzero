import {Injectable} from "@angular/core"
import {GreeterStore} from "./greeter.store"

@Injectable()
export class GreeterTodoStore implements GreeterStore {
  helloworld: string;

    constructor() {
        this.helloworld = "Hello world... :)";
    }

  helloWorld() {
        console.log("hi");
    }

}

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
import { TodoAppModule } from "./module/app/app.module"
import {enableProdMode} from '@angular/core'


// enableProdMode();
platformBrowserDynamic().bootstrapModule(TodoAppModule)

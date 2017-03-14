import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
<<<<<<< HEAD
import { LabalyticsModule } from "./module/app/app.module"

platformBrowserDynamic().bootstrapModule(LabalyticsModule)
=======
import { TodoAppModule } from "./module/app/app.module"
import {enableProdMode} from '@angular/core'


// enableProdMode();
platformBrowserDynamic().bootstrapModule(TodoAppModule)
>>>>>>> master

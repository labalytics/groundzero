import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
import { HomeModule } from "./module/home/home.module"
<<<<<<< HEAD
=======
import { HeadModule } from "./module/header/header.module"
import { MenuModule } from "./module/menu/menu.module"
import {enableProdMode} from '@angular/core'
>>>>>>> master


//enableProdMode();
platformBrowserDynamic().bootstrapModule(HomeModule)

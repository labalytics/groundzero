import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
import { StudentModule } from "./module/student/student.module"
import { HeadModule } from "./module/header/header.module"
import { MenuModule } from "./module/menu/menu.module"
import {enableProdMode} from '@angular/core'


// enableProdMode();
platformBrowserDynamic().bootstrapModule(StudentModule)

platformBrowserDynamic().bootstrapModule(HeadModule)
platformBrowserDynamic().bootstrapModule(MenuModule)

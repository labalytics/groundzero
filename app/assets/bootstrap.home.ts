import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
import { HomeModule } from "./module/home/home.module"
import { HeadModule } from "./module/header/header.module"
import { MenuModule } from "./module/menu/menu.module"

platformBrowserDynamic().bootstrapModule(HomeModule)
platformBrowserDynamic().bootstrapModule(HeadModule)
platformBrowserDynamic().bootstrapModule(MenuModule)




import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
<<<<<<< HEAD
import { AuthorizeModule } from "./module/authorize/authorize.module"

platformBrowserDynamic().bootstrapModule(AuthorizeModule)
=======
import { LoginModule } from "./module/login/login.module"
import { HttpModule } from '@angular/http';
import {enableProdMode} from '@angular/core'


//enableProdMode();

platformBrowserDynamic().bootstrapModule(LoginModule)
>>>>>>> master


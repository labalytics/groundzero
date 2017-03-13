import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
import { LoginModule } from "./module/login/login.module"
import { HttpModule } from '@angular/http';
import {enableProdMode} from '@angular/core'


//enableProdMode();

platformBrowserDynamic().bootstrapModule(LoginModule)


import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
import { SignupModule } from "./module/signup/signup.module"
import {enableProdMode} from '@angular/core'


// enableProdMode();
platformBrowserDynamic().bootstrapModule(SignupModule)

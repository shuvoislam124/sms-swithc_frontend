import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { apiUrlDevelopment, apiUrlProd, imgUrlDev, imgUrlProd } from './global';
import { enableProdMode } from '@angular/core';

export let apiUrl: string = '';
export let imgUrl: string = '';

if (environment.production) {
    enableProdMode();
    apiUrl = apiUrlProd;
    imgUrl = imgUrlProd;
} else {
    apiUrl = apiUrlDevelopment;
    imgUrl = imgUrlDev;
    // apiUrl = apiUrlProd;
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {WeatherComponent} from "./weather/weather.component";

@NgModule({
    declarations: [
        AppComponent        
    ],
    imports: [
        BrowserModule,
        WeatherComponent
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

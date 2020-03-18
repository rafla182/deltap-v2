import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoadingService } from './core/components/loading/loading.service';
import { LoadingComponent } from './core/components/loading/loading.component';
import { SiteModule } from './site/site.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ContaModule } from './conta/conta.module';
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AppRoutingModule } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        LoadingComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        AppRoutingModule,
        ContaModule,
        SiteModule,
        ToastrModule.forRoot()
    ],
    providers: [
        LoadingService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LOCALE_ID, useValue: 'pt-BR' }

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localePt, 'pt-BR');

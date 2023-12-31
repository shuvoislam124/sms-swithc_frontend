import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { MenuService } from './layout/app.menu.service';
import { SharedService } from './components/shared/shared.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './components/shared/interceptor/auth-interceptor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [
        AppComponent,
        
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ToastModule,
        ConfirmDialogModule,

    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        MenuService,  MessageService, ConfirmationService, SharedService
    ],
    bootstrap: [AppComponent],
    
})
export class AppModule { }

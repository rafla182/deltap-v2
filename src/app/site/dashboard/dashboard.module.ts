import { NgModule } from '@angular/core';import { CoreModule } from '../../core/core.module';import { FormsModule } from '@angular/forms';import { DashboardRoutingModule } from './dashboard-routing.module';import { ChartsModule } from 'ng2-charts';import { BsDropdownModule, ButtonsModule, TabsModule } from 'ngx-bootstrap';import { DashboardComponent } from './dashboard.component';import { DashboardService } from '../../core/services/dashboard.services';

@NgModule({
    imports: [
        CoreModule,
        FormsModule,
        DashboardRoutingModule,
        ChartsModule,
        BsDropdownModule,
        ButtonsModule.forRoot(),
        TabsModule.forRoot()
    ],
    declarations: [
        DashboardComponent,
    ],
    exports: [
    ],
    providers: [
        DashboardService
    ],
})
export class DashboardModule { }

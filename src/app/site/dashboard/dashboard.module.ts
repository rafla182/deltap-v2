import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from '../../core/services/dashboard.services';
import { CoreModule } from '../../core/core.module';
import { TabsModule } from 'ngx-bootstrap';
import { DashboardRankingComponent } from './dashboard-ranking.component';
import { DashboardVolumeComponent } from './dashboard-volume.component';
import { DashboardComparativoComponent } from './dashboard-comparativo.component';
import { ChartsModule } from 'ng2-charts';


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
        DashboardRankingComponent,
        DashboardVolumeComponent,
        DashboardComparativoComponent
    ],
    exports: [
    ],
    providers: [
        DashboardService
    ],
})
export class DashboardModule { }

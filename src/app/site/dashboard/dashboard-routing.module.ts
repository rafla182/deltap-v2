import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardRankingComponent } from './dashboard-ranking.component';
import { DashboardVolumeComponent } from './dashboard-volume.component';
import { DashboardComparativoComponent } from './dashboard-comparativo.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard-ranking', component: DashboardRankingComponent },
    { path: 'dashboard-volume', component: DashboardVolumeComponent },
    { path: 'dashboard-comparativo', component: DashboardComparativoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }

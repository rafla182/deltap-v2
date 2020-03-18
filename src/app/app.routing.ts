import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DeslogadoGuard } from './core/guards/deslogado.guard';
import { LogadoGuard } from './core/guards/logado.guard';
import { LogoutComponent } from './conta/pages/logout/logout.component';
import { LoginComponent } from './conta/pages/login/login.component';
import { LayoutComponent } from './conta/layout/layout.component';
import { DefaultLayoutComponent } from './default-layout';

export const routes: Routes = [
    {
        path: 'logout',
        component: LogoutComponent,
        loadChildren: () => import('./conta/conta.module').then(m => m.ContaModule)
    },
    {
        path: '', component: LayoutComponent, canActivate: [DeslogadoGuard],
        loadChildren: () => import('./conta/conta.module').then(m => m.ContaModule)
    },
    {
        path: 'login', component: LoginComponent, canActivate: [DeslogadoGuard],
        loadChildren: () => import('./conta/conta.module').then(m => m.ContaModule)
    }
    ,
    {
        path: '', component: DefaultLayoutComponent, canActivate: [LogadoGuard],
        loadChildren: () => import('./site/site.module').then(m => m.SiteModule)
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

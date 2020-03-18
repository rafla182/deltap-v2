import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SiteRoutingModule } from './site-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmpresasModule } from './empresas/empresas.module';
import { CaixaModule } from './caixa/caixa.module';
import { LojasModule } from './lojas/lojas.module';
import { AlterarSenhaModule } from './alterar-senha/alterar-senha.module';
@NgModule({
    imports: [
        CoreModule,
        SiteRoutingModule,
        DashboardModule,
        EmpresasModule,
        CaixaModule,
        LojasModule,
        AlterarSenhaModule
       
    ],
    declarations: [
    ],
    providers: [
    ],
    exports: [
    ]
})
export class SiteModule { }

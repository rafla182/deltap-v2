import { NgModule } from '@angular/core';import { EmpresasComponent } from './pages/listar/empresas.component';import { EmpresasCadastrarComponent } from './pages/cadastrar/empresas-cadastrar.component';import { CoreModule } from '../../core/core.module';import { EmpresasRoutingModule } from './empresas-routing.module';import { EmpresasService } from '../../core/services/empresas/empresas.service';

@NgModule({
    declarations: [
        EmpresasComponent,
        EmpresasCadastrarComponent
    ],
    imports: [
        CoreModule,
        EmpresasRoutingModule
    ],
    exports: [
        EmpresasComponent,
        EmpresasCadastrarComponent],
    providers: [
        EmpresasService
    ],
})
export class EmpresasModule { }

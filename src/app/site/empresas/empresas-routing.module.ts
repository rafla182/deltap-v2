import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresasComponent } from './pages/listar/empresas.component';
import { EmpresasCadastrarComponent } from './pages/cadastrar/empresas-cadastrar.component';
import { EmpresasCadastrarResolve } from '../../core/resolves/empresas/empresas-cadastrar.resolve';
import { EmpresasResolve } from '../../core/resolves/empresas/empresas.resolve';

const routes: Routes = [
    {
        path: 'empresas',
        component: EmpresasComponent,
        resolve: { empresas: EmpresasResolve },
        data: { title: 'Empresas' },
    },
    {
        path: 'empresas/cadastrar',
        component: EmpresasCadastrarComponent,
        data: { title: 'Cadastrar Empresas' },
    },
    {
        path: 'empresas/visualizar/:id',
        component: EmpresasCadastrarComponent,
        resolve: { empresa: EmpresasCadastrarResolve },
        data: { title: 'Cadastrar Empresas' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpresasRoutingModule { }

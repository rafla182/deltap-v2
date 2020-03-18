import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendedoresComponent } from './pages/listar/vendedores.component';
import { VendedoresCadastrarComponent } from './pages/cadastrar/vendedores-cadastrar.component';
import { VendedoresCadastrarResolve } from '../../core/resolves/vendedores/vendedores-cadastrar.resolve';
import { VendedoresResolve } from '../../core/resolves/vendedores/vendedores.resolve';

const routes: Routes = [
    {
        path: 'vendedores',
        component: VendedoresComponent,
        resolve: { vendedores: VendedoresResolve },
        data: { title: 'Vendedores' },
    },
    {
        path: 'vendedores/cadastrar',
        component: VendedoresCadastrarComponent,
        data: { title: 'Cadastrar Vendedores' },
    },
    {
        path: 'vendedores/visualizar/:id',
        component: VendedoresCadastrarComponent,
        resolve: { vendedor: VendedoresCadastrarResolve },
        data: { title: 'Cadastrar Usuários' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendedoresRoutingModule { }

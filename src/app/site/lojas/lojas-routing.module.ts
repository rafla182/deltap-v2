import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LojasComponent } from './pages/listar/lojas.component';
import { LojasCadastrarComponent } from './pages/cadastrar/lojas-cadastrar.component';
import { LojasCadastrarResolve } from '../../core/resolves/lojas/lojas-cadastrar.resolve';
import { LojasResolve } from '../../core/resolves/lojas/lojas.resolve';

const routes: Routes = [
    {
        path: 'lojas',
        component: LojasComponent,
        resolve: { lojas: LojasResolve },
        data: { title: 'Lojas' },
    },
    {
        path: 'lojas/cadastrar',
        component: LojasCadastrarComponent,
        data: { title: 'Cadastrar Lojas' },
    },
    {
        path: 'lojas/visualizar/:id',
        component: LojasCadastrarComponent,
        resolve: { loja: LojasCadastrarResolve },
        data: { title: 'Cadastrar Lojas' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LojasRoutingModule { }

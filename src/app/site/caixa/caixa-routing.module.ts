import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaixaComponent } from './pages/listar/caixa.component';
import { MovimentacaoComponent } from './pages/movimentacao/movimentacao.component';
import { CaixaResolve } from '../../core/resolves/caixa/caixa.resolve';
import { MovimentacaoResolve } from '../../core/resolves/caixa/movimentacao.resolve';

const routes: Routes = [
    {
        path: 'caixas',
        component: CaixaComponent,
        resolve: { caixas: CaixaResolve },
        data: { title: 'Caixas' }
    },
    {
        path: 'lancamentos/:data',
        component: MovimentacaoComponent,
        resolve: { lancamentos: MovimentacaoResolve },
        data: { title: 'Lançamentos' }
    },
    {
        path: 'lancamentos',
        component: MovimentacaoComponent,
        resolve: { lancamentos: MovimentacaoResolve },
        data: { title: 'Lançamentos' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CaixaRoutingModule { }

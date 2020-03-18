import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormaPagamentoComponent } from './forma-pagamento/pages/listar/forma-pagamento.component';
import { FormaPagamentoResolve } from '../../core/resolves/forma-pagamento/forma-pagamento.resolve';
import { FormaPagamentoCadastrarComponent } from './forma-pagamento/pages/cadastrar/forma-pagamento-cadastrar.component';
import { FormaPagamentoCadastrarResolve } from '../../core/resolves/forma-pagamento/forma-pagamento-cadastrar.resolve';

const routes: Routes = [
    {
        path: 'parametros/forma-pagamento',
        component: FormaPagamentoComponent,
        resolve: { formasPagamento: FormaPagamentoResolve },
        data: { title: 'Forma Pagamento' },
    },
    {
        path: 'parametros/forma-pagamento/cadastrar',
        component: FormaPagamentoCadastrarComponent,
        data: { title: 'Forma Pagamento' },
    },
    {
        path: 'parametros/forma-pagamento/visualizar/:id',
        component: FormaPagamentoCadastrarComponent,
        resolve: { formaPagamento: FormaPagamentoCadastrarResolve },
        data: { title: 'Forma de Pagamento' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParametrosRoutingModule { }

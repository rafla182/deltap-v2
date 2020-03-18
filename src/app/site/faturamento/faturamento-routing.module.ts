import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaturamentoComponent } from './faturamento.component';


const routes: Routes = [
    {
        path: '',
        component: FaturamentoComponent,
        data: {
            title: 'Fechamento de Caixa'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FaturamentoRoutingModule { }

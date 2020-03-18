import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FechamentoCaixaComponent } from './fechamento-caixa.component';


const routes: Routes = [
    {
        path: '',
        component: FechamentoCaixaComponent,
        data: {
            title: 'Fechamento de Caixa'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FechamentoCaixaRoutingModule { }

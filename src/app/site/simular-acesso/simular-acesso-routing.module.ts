import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimularAcessoComponent } from './pages/simular-acesso.component';
import { SimularAcessoResolve } from '../../core/resolves/usuarios/simular-acesso.resolve';

const routes: Routes = [
    {
        path: 'simular-acesso',
        component: SimularAcessoComponent,
        resolve: { empresa: SimularAcessoResolve },
        data: { title: 'Simular Acesso' },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimularAcessoRoutingModule { }

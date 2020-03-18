import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlterarSenhaComponent } from './pages/alterar-senha/alterar-senha.component';

const routes: Routes = [
    {
        path: 'alterar-senha',
        component: AlterarSenhaComponent,
        data: { title: 'Alterar Senha' },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlterarSenhaRoutingModule { }

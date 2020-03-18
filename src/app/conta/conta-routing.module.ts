import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LembrarSenhaComponent } from './pages/lembrar-senha/lembrar-senha.component';
import { NovaSenhaComponent } from './pages/nova-senha/nova-senha.component';
import { LogoutComponent } from './pages/logout/logout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'lembrar-senha', component: LembrarSenhaComponent },
    { path: 'nova-senha', component: NovaSenhaComponent },
    { path: 'logout', component: LogoutComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContaRoutingModule { }
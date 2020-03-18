import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: '', loadChildren: () => import('./empresas/empresas.module').then(m => m.EmpresasModule) },
    { path: '', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
    { path: '', loadChildren: () => import('./vendedores/vendedores.module').then(m => m.VendedoresModule) },
    { path: '', loadChildren: () => import('./parametros/parametros.module').then(m => m.ParametrosModule) },
    { path: '', loadChildren: () => import('./caixa/caixa.module').then(m => m.CaixaModule) },
    { path: '', loadChildren: () => import('./lojas/lojas.module').then(m => m.LojasModule) },
    { path: '', loadChildren: () => import('./alterar-senha/alterar-senha.module').then(m => m.AlterarSenhaModule) },
    { path: '', loadChildren: () => import('./simular-acesso/simular-acesso.module').then(m => m.SimularAcessoModule) }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './pages/listar/usuarios.component';
import { UsuariosCadastrarComponent } from './pages/cadastrar/usuarios-cadastrar.component';
import { PermissaoComponent } from './pages/permissao/permissao.component';
import { UsuariosCadastrarResolve } from '../../core/resolves/usuarios/usuarios-cadastrar.resolve';
import { UsuariosResolve } from '../../core/resolves/usuarios/usuarios.resolve';

const routes: Routes = [
    {
        path: 'usuarios',
        component: UsuariosComponent,
        resolve: { usuarios: UsuariosResolve },
        data: { title: 'Usuários' },
    },
    {
        path: 'usuarios/cadastrar',
        component: UsuariosCadastrarComponent,
        data: { title: 'Cadastrar Usuários' },
    },
    {
        path: 'usuarios/visualizar/:id',
        component: UsuariosCadastrarComponent,
        resolve: { usuario: UsuariosCadastrarResolve },
        data: { title: 'Cadastrar Usuários' }
    }
    ,
    {
        path: 'usuarios/permissoes/:id',
        component: PermissaoComponent,
        resolve: { usuario: UsuariosCadastrarResolve },
        data: { title: 'Permissões do Usuário' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }

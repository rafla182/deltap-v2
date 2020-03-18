import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { UsuariosComponent } from './pages/listar/usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosResolve } from '../../core/resolves/usuarios/usuarios.resolve';
import { CoreModule } from '../../core/core.module';
import { UsuariosCadastrarComponent } from './pages/cadastrar/usuarios-cadastrar.component';
import { EmpresasService } from '../../core/services/empresas/empresas.service';
import { UsuariosCadastrarResolve } from '../../core/resolves/usuarios/usuarios-cadastrar.resolve';
import { PermissaoComponent } from './pages/permissao/permissao.component';

@NgModule({
    imports: [
        CoreModule,
        UsuariosRoutingModule

    ],
    declarations: [
        UsuariosComponent,
        UsuariosCadastrarComponent,
        PermissaoComponent
    ],
    providers: [
        EmpresasService
    ],
    exports: [
        UsuariosComponent,
        UsuariosCadastrarComponent,
        PermissaoComponent
    ]
})
export class UsuariosModule { }

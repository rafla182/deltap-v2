import { NgModule } from '@angular/core'; 
import { CoreModule } from '../core/core.module'; 
import { ContaRoutingModule } from './conta-routing.module'; 
import { LayoutComponent } from './layout/layout.component'; 
import { CadastroComponent } from './pages/cadastro/cadastro.component'; 
import { LembrarSenhaComponent } from './pages/lembrar-senha/lembrar-senha.component'; 
import { NovaSenhaComponent } from './pages/nova-senha/nova-senha.component'; 
import { LogoutComponent } from './pages/logout/logout.component'; 
import { ContaService } from '../core/services/conta.service';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
    imports: [
        CoreModule,
        ContaRoutingModule,
    ],
    declarations: [
        LayoutComponent,
        CadastroComponent,
        LembrarSenhaComponent,
        NovaSenhaComponent,
        LogoutComponent,
        LoginComponent
    ],
    providers: [
        ContaService,
    ],
    exports: [
        LayoutComponent,
        CadastroComponent,
        LembrarSenhaComponent,
        NovaSenhaComponent,
        LogoutComponent,
        LoginComponent
    ]
})
export class ContaModule { }

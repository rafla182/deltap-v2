import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBreadcrumbModule, AppAsideModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideDirective } from './directives/click-outsite.directive';
import { OnlyNumber } from './directives/only-number.directive';
import { SearchPipe } from './pipes/search.pipe';
import { NotificacaoComponent } from './components/notificacao/notificacao.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { DateFormatPipe } from './pipes/dateFormat.pipe';import { DateFormatPipeHour } from './pipes/dateFormatHour.pipe';
import { LogadoGuard } from './guards/logado.guard';import { DeslogadoGuard } from './guards/deslogado.guard';
import { AdministradorGuard } from './guards/administrado.guard';import { UsuarioService } from './services/usuarios/usuario.service';import { HttpService } from './services/http/http.service';import { TokenService } from './services/usuarios/token.service';import { UsuariosResolve } from './resolves/usuarios/usuarios.resolve';import { UsuariosCadastrarResolve } from './resolves/usuarios/usuarios-cadastrar.resolve';import { VendedoresResolve } from './resolves/vendedores/vendedores.resolve';import { VendedoresCadastrarResolve } from './resolves/vendedores/vendedores-cadastrar.resolve';import { EmpresasResolve } from './resolves/empresas/empresas.resolve';import { EmpresasCadastrarResolve } from './resolves/empresas/empresas-cadastrar.resolve';import { LojasResolve } from './resolves/lojas/lojas.resolve';import { LojasCadastrarResolve } from './resolves/lojas/lojas-cadastrar.resolve';import { FormaPagamentoResolve } from './resolves/forma-pagamento/forma-pagamento.resolve';import { FormaPagamentoCadastrarResolve } from './resolves/forma-pagamento/forma-pagamento-cadastrar.resolve';import { CaixaResolve } from './resolves/caixa/caixa.resolve';import { MovimentacaoResolve } from './resolves/caixa/movimentacao.resolve';import { SimularAcessoResolve } from './resolves/usuarios/simular-acesso.resolve';
import { DefaultLayoutComponent } from '../default-layout';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        AppBreadcrumbModule.forRoot(),
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        AppAsideModule,
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        BsDatepickerModule.forRoot(),
        PerfectScrollbarModule,
        CurrencyMaskModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        ClickOutsideDirective,
        OnlyNumber,
        SearchPipe,
        NotificacaoComponent,
        DefaultLayoutComponent,
        PaginationComponent,
        UsuarioComponent,
        DateFormatPipe,
        DateFormatPipeHour
    ],
    providers: [
        LogadoGuard,
        DeslogadoGuard,
        AdministradorGuard,
        UsuarioService,
        HttpService,
        TokenService,
        UsuariosResolve,
        UsuariosCadastrarResolve,
        VendedoresResolve,
        VendedoresCadastrarResolve,
        EmpresasResolve,
        EmpresasCadastrarResolve,
        LojasResolve,
        LojasCadastrarResolve,
        FormaPagamentoResolve,
        FormaPagamentoCadastrarResolve,
        CaixaResolve,
        MovimentacaoResolve,
        SimularAcessoResolve,
        DateFormatPipe,
        DateFormatPipeHour
    ],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        ClickOutsideDirective,
        OnlyNumber,
        SearchPipe,
        PaginationComponent,
        UsuarioComponent,
        DateFormatPipe,
        DateFormatPipeHour,
        BsDatepickerModule,
        CurrencyMaskModule,
        ToastrModule
    ]
})
export class CoreModule { }

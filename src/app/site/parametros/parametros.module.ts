import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormaPagamentoComponent } from './forma-pagamento/pages/listar/forma-pagamento.component';
import { FormaPagamentoCadastrarComponent } from './forma-pagamento/pages/cadastrar/forma-pagamento-cadastrar.component';
import { FormaPagamentoService } from '../../core/services/forma-pagamento/forma-pagamento.service';
import { CoreModule } from '../../core/core.module';
import { ParametrosRoutingModule } from './parametros-routing.module';

@NgModule({
    declarations: [
        FormaPagamentoComponent,
        FormaPagamentoCadastrarComponent
    ],
    imports: [
        CoreModule,
        ParametrosRoutingModule
    ],
    exports: [
        FormaPagamentoComponent,
        FormaPagamentoCadastrarComponent],
    providers: [
        FormaPagamentoService
    ],
})
export class ParametrosModule { }

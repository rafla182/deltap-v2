import { registerLocaleData } from '@angular/common';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CaixaComponent } from './pages/listar/caixa.component';
import { MovimentacaoComponent } from './pages/movimentacao/movimentacao.component';
import { CaixaRoutingModule } from './caixa-routing.module';import { CoreModule } from '../../core/core.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';import { CaixaService } from '../../core/services/caixa/caixa.service';
import { VendedoresService } from '../../core/services/vendedores/vendedores.service';
import { FormaPagamentoService } from '../../core/services/forma-pagamento/forma-pagamento.service';
import localePt from '@angular/common/locales/pt';
import { ptBrLocale } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule } from 'ngx-bootstrap';

defineLocale('pt-br', ptBrLocale);
registerLocaleData(localePt);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.'
};

@NgModule({
    declarations: [
        CaixaComponent,
        MovimentacaoComponent
    ],
    imports: [
        CaixaRoutingModule,
        CoreModule,
        CurrencyMaskModule
    ],
    exports: [
        CaixaComponent,
        MovimentacaoComponent
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' },

        CaixaService,
        VendedoresService,
        FormaPagamentoService,
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ],
})
export class CaixaModule { }


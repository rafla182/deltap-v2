import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendedoresRoutingModule } from './vendedores-routing.module';
import { CoreModule } from '../../core/core.module';
import { VendedoresComponent } from './pages/listar/vendedores.component';
import { VendedoresCadastrarComponent } from './pages/cadastrar/vendedores-cadastrar.component';
import { VendedoresService } from '../../core/services/vendedores/vendedores.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';

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
        VendedoresComponent,
        VendedoresCadastrarComponent
    ],
    imports: [
        CoreModule,
        VendedoresRoutingModule,
        CurrencyMaskModule
    ],
    exports: [
        VendedoresComponent,
        VendedoresCadastrarComponent],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        VendedoresService,
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ],
})
export class VendedoresModule { }

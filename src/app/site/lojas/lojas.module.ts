import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';import { NgModule, LOCALE_ID } from '@angular/core';import { LojasComponent } from './pages/listar/lojas.component';import { LojasCadastrarComponent } from './pages/cadastrar/lojas-cadastrar.component';import { CoreModule } from '../../core/core.module';import { LojasRoutingModule } from './lojas-routing.module';import { CurrencyMaskModule } from 'ng2-currency-mask';import { LojasService } from '../../core/services/lojas/lojas.service';

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
        LojasComponent,
        LojasCadastrarComponent
    ],
    imports: [
        CoreModule,
        LojasRoutingModule,
        CurrencyMaskModule
    ],
    exports: [
        LojasComponent,
        LojasCadastrarComponent],
    providers: [
        LojasService,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ],
})
export class LojasModule { }

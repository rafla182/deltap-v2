import { NgModule } from '@angular/core';
import { FaturamentoRoutingModule } from './faturamento-routing.module';
import { FaturamentoComponent } from './faturamento.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


@NgModule({
    imports: [
        FaturamentoRoutingModule,
        FormsModule,
        ChartsModule,
        BsDropdownModule,
        ButtonsModule.forRoot()
    ],
    declarations: [FaturamentoComponent]
})
export class FaturamentoModule { }

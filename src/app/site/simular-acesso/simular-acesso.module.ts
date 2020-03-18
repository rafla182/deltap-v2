import { NgModule } from '@angular/core';import { SimularAcessoComponent } from './pages/simular-acesso.component';import { CoreModule } from '../../core/core.module';import { SimularAcessoRoutingModule } from './simular-acesso-routing.module';import { SimularAcessoService } from '../../core/services/usuarios/simular-acesso.service';

@NgModule({
    declarations: [
        SimularAcessoComponent
    ],
    imports: [
        CoreModule,
        SimularAcessoRoutingModule
    ],
    exports: [
        SimularAcessoComponent
    ],
    providers: [
        SimularAcessoService
    ],
})
export class SimularAcessoModule { }

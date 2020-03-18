import { NgModule } from '@angular/core';import { AlterarSenhaComponent } from './pages/alterar-senha/alterar-senha.component';import { CoreModule } from '../../core/core.module';import { AlterarSenhaRoutingModule } from './alterar-senha-routing.module';

@NgModule({
    declarations: [
        AlterarSenhaComponent
    ],
    imports: [
        CoreModule,
        AlterarSenhaRoutingModule
    ],
    exports: [
        AlterarSenhaComponent
    ],
    providers: [
    ],
})
export class AlterarSenhaModule { }

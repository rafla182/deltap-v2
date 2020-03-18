import { Component } from '@angular/core';
import { ContaService } from '../../../core/services/conta.service';
import { EmailValidator } from '../../../core/helpers/email-validator';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: '.app-lembrar-senha',
    templateUrl: './lembrar-senha.component.html',
    styleUrls: ['./lembrar-senha.component.css']
})

export class LembrarSenhaComponent {

    model: any = {};
    exibir: any = {};
    email: string;

    constructor(
        private toastrService: ToastrService,
        private contaService: ContaService
    ) { }

    enviar() {
        if (!this.model.email) {
            this.toastrService.error('E-mail é obrigatório.');
            return;
        }

        if (!EmailValidator.isValid(this.model.email)) {
            this.toastrService.error('E-mail deve ser válido.');
            return;
        }

        this.email = this.model.email;

        this.contaService.lembrarSenha(this.email)
            .subscribe(
                () => {
                    this.toastrService.success(`Você reeberá um e-mail em ${this.email} para reiniciar a senha.`);
                    this.exibir.sucesso = true;
                },
                erro => {
                    erro.forEach(e => this.toastrService.error(e.message));
                })
    }
}

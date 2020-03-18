import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContaService } from '../../../core/services/conta.service';
import { TokenService } from '../../../core/services/usuarios/token.service';
import { UsuarioService } from '../../../core/services/usuarios/usuario.service';
import { EmailValidator } from '../../../core/helpers/email-validator';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'login.component.html'
})
export class LoginComponent {

    model: any = {};

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private contaService: ContaService,
        private tokenService: TokenService,
        private usuarioService: UsuarioService
    ) { }

    logar() {

        if (!this.model.email) {
            this.toastr.error('E-mail é obrigatório.');
            return;
        }

        if (!EmailValidator.isValid(this.model.email)) {
            this.toastr.error('E-mail deve ser válido.');
            return;
        }

        if (!this.model.senha) {
            this.toastr.error('Senha é obrigatório.');
            return;
        }

        this.contaService.login(this.model.email, this.model.senha)
            .subscribe(
                sucesso => {
                    console.log(sucesso);
                    this.tokenService.salvar(sucesso.resultado.token);
                    this.usuarioService.salvar(sucesso.resultado.usuario);
                    this.router.navigateByUrl('/dashboard');
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
    }

    esqueciMinhaSenha() {
        if (!this.model.email) {
            this.toastr.error('E-mail é obrigatório.');
            return;
        }

        this.contaService.esqueci(this.model.email)
            .subscribe(
                sucesso => {
                    this.toastr.success('Foi enviado um E-mail com as orientações para recuperar sua senha.');
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });

    }
}

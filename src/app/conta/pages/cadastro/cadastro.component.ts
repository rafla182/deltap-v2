import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/usuarios/token.service';
import { ContaService } from '../../../core/services/conta.service';
import { UsuarioService } from '../../../core/services/usuarios/usuario.service';
import { EmailValidator } from '../../../core/helpers/email-validator';

@Component({
  selector: '.app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent  {

    model: any = {};
    exibir: any = {};
    erro: any = {};

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private contaService: ContaService,
        private tokenService: TokenService,
        private usuarioService: UsuarioService
    ) { }
    
    cadastrar() {
        this.erro = {};

        if (!this.model.email) {
            this.erro.email = true;
            return;
        }
        
        if (!EmailValidator.isValid(this.model.email)) {            
            this.erro.email = true;
            return;
        }

        if (this.model.email != this.model.confirmarEmail) {
            this.erro.email = true;
            this.erro.confirmarEmail = true;
            return;
        }

        if (!this.model.senha) {
            this.erro.senha = true;
            return;
        }

        if (this.model.senha.length <= 4) {
            this.erro.senha = true;
            return;
        }

        if (this.model.senha != this.model.confirmarSenha) {
            this.erro.senha = true;
            this.erro.confirmarSenha = true;
            return;
        }
        
        this.contaService.cadastrar(this.model.nome, this.model.email, this.model.senha)
            .subscribe(
                sucesso => {
                    this.tokenService.salvar(sucesso.token);
                    this.usuarioService.salvar(sucesso.usuario);
                    this.router.navigateByUrl('/');
                },
                erro => {
                })
    }

    exibirConfirmarEmail() {
        this.exibir.confirmarEmail = true;
    }

    exibirConfirmarSenha() {
        this.exibir.confirmarSenha = true;
    }
}

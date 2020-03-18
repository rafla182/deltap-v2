import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContaService } from '../../../core/services/conta.service';
import { Usuario } from '../../../core/services/usuarios/usuario';
import { TokenService } from '../../../core/services/usuarios/token.service';
import { UsuarioService } from '../../../core/services/usuarios/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: '.app-nova-senha',
    templateUrl: './nova-senha.component.html',
    styleUrls: ['./nova-senha.component.css']
})

export class NovaSenhaComponent implements OnInit {

    model: any = {};
    exibir: any = {};
    erro: any = {};
    usuario: Usuario;
    token: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastaService: ToastrService,
        private contaService: ContaService,
        private tokenService: TokenService,
        private usuarioService: UsuarioService
    ) { }

    ngOnInit() {

        this.activatedRoute.queryParams.subscribe(params => {
            this.model.email = params['email'];
        });


    }

    salvar() {
        this.erro = {};

        if (!this.model.senhaNova) {
            this.erro.senha = true;
            this.toastaService.error('Senha é obrigatório.');
            return;
        }

        if (this.model.senhaNova.length <= 4) {
            this.erro.senha = true;
            this.toastaService.error('Senha deve ter ao menos 5 caracteres.');
            return;
        }

        if (this.model.senhaNova != this.model.confirmarSenha) {
            this.erro.senha = true;
            this.erro.confirmarSenha = true;
            this.toastaService.error('Senhas não conferem.');
            return;
        }

        this.contaService.alterarEsqueciSenha(this.model)
            .subscribe(
                sucesso => {
                    this.toastaService.success("Senha cadastrada com sucesso.");
                    this.tokenService.salvar(sucesso.token);
                    this.usuarioService.salvar(sucesso.usuario);
                    this.router.navigateByUrl('/');
                },
                erro => {
                    erro.forEach(e => this.toastaService.error(e.message));
                })
    }
}

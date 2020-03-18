import { Component } from '@angular/core';
import { Usuario } from '../../../../core/services/usuarios/usuario';
import { UsuarioService } from '../../../../core/services/usuarios/usuario.service';
import { ContaService } from '../../../../core/services/conta.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-alterar-senha',
    templateUrl: 'alterar-senha.component.html'
})
export class AlterarSenhaComponent {

    model: any = {};
    usuario: Usuario;

    constructor(private userSerivce: UsuarioService,
        private router: Router,
        private toastr: ToastrService,
        private contaService: ContaService
    ) { }

    ngOnInit(): void {
        this.usuario = this.userSerivce.carregar();
    }

    salvar() {
        this.contaService.alterarSenha(this.model).subscribe(
            sucesso => {
                this.toastr.success('Senha alterada com sucesso.');
                this.limpar();
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

    limpar() {
        this.model.senhaNova = '';
        this.model.senhaAntiga = '';
    }

}

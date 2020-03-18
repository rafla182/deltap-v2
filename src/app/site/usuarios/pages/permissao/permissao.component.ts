import { Component, OnInit } from '@angular/core';
import { ContaService } from '../../../../core/services/conta.service';
import { UsuarioService } from '../../../../core/services/usuarios/usuario.service';
import { Usuario } from '../../../../core/services/usuarios/usuario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-permissao',
    templateUrl: 'permissao.component.html'
})
export class PermissaoComponent implements OnInit {

    permissoes: any[] = [];
    user: Usuario;
    constructor(
        public contaService: ContaService,
        public userService: UsuarioService,
        public router: Router,
        public toastr: ToastrService) { }

    ngOnInit(): void {
        this.user = this.userService.carregar();
        this.carregarPermissoes();
    }

    carregarPermissoes() {
        this.contaService.listarPermissoes().subscribe(
            sucesso => {
                console.log(sucesso);
                this.permissoes = sucesso;
                this.contaService.listarPermissoesPorUsuario(this.user.id).subscribe(
                    response => {
                        this.permissoes.forEach(p => {
                            if (response.find(x => p.id === x.id)) {
                                p.check = true;
                            }
                        });

                    },
                    erro => {
                        erro.forEach(e => this.toastr.error(e.message));
                    });
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

    salvar() {
        const permissoes = this.permissoes.filter(p => p.check);
        this.contaService.salvarPermissoes(this.user.id, permissoes).subscribe(
            sucesso => {
                this.toastr.success('Permissões salvas com sucesso.');
                this.router.navigateByUrl(`/usuarios`);
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }
}

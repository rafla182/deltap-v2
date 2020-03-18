import { Component } from '@angular/core';
import { Usuario } from '../../../../core/services/usuarios/usuario';
import { UsuarioService } from '../../../../core/services/usuarios/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresasService } from '../../../../core/services/empresas/empresas.service';

@Component({
    selector: 'app-empresas-cadastrar',
    templateUrl: 'empresas-cadastrar.component.html'
})
export class EmpresasCadastrarComponent {

    model: any = {};
    usuario: Usuario;

    constructor(
        private userSerivce: UsuarioService,
        private empresaService: EmpresasService,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.usuario = this.userSerivce.carregar();

        if (this.activatedRoute.snapshot.data['empresa']) {
            this.model = this.activatedRoute.snapshot.data['empresa'];
        } else {
            this.model = {
                nome: ''
            };
        }
    }

    salvar() {

        if (this.model.id > 0) {
            this.empresaService.editar(this.model).subscribe(
                sucesso => {
                    this.toastr.success('Empresa editada com sucesso.');
                    this.router.navigateByUrl(`/empresas`);
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        } else {
            this.empresaService.inserir(this.model).subscribe(
                sucesso => {
                    this.toastr.success('Empresa cadastrada com sucesso.');
                    this.router.navigateByUrl(`/empresas`);
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        }
    }

}

import { Component } from '@angular/core';
import { Usuario } from '../../../../core/services/usuarios/usuario';
import { UsuarioService } from '../../../../core/services/usuarios/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { LojasService } from '../../../../core/services/lojas/lojas.service';
import { EmpresasService } from '../../../../core/services/empresas/empresas.service';
import { Empresa } from '../../../../core/models/empresa';

@Component({
    selector: 'app-lojas-cadastrar',
    templateUrl: 'lojas-cadastrar.component.html'
})
export class LojasCadastrarComponent {

    model: any = {};
    usuario: Usuario;
    empresaSelecionada: Empresa = new Empresa();
    empresas: Empresa[] = new Array<Empresa>();
    loja: string;
    error: boolean;
    
    constructor(
        private userSerivce: UsuarioService,
        private lojaService: LojasService,
        private router: Router,
        private toastr: ToastrService,
        private empresasService: EmpresasService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.usuario = this.userSerivce.carregar();
        this.carregarEmpresas();
        // this.loja = this.usuario.loja.nome;
        if (this.activatedRoute.snapshot.data['loja']) {
            this.model = this.activatedRoute.snapshot.data['loja'];
        } else {
            // this.model = {
            //     loja: {
            //         id: this.usuario.loja.id,
            //         nome: this.usuario.lojas.nome
            //     },
            //     nome: ''
            // };
        }
    }

    salvar() {

        this.model.empresa = {
            id: this.empresaSelecionada.id,
        };

        if (this.model.id > 0) {
            this.lojaService.editar(this.model).subscribe(
                sucesso => {
                    this.toastr.success('Loja editada com sucesso.');
                    this.router.navigateByUrl(`/lojas`);
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        } else {
            this.lojaService.inserir(this.model).subscribe(
                sucesso => {
                    this.toastr.success('Loja cadastrada com sucesso.');
                    this.router.navigateByUrl(`/lojas`);
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        }
    }

    carregarEmpresas() {
        this.empresasService.carregar().subscribe(
            sucesso => {
                this.empresas = sucesso;
                if (this.model) {
                    if (this.model.empresa) {
                        this.empresaSelecionada.id = this.model.empresa.id;
                    }
                }
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

}

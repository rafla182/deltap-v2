import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../core/models/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaService } from '../../../../core/services/conta.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../../core/services/usuarios/usuario.service';
import { Usuario } from '../../../../core/services/usuarios/usuario';
import { Loja } from '../../../../core/models/loja';
import { VendedoresService } from '../../../../core/services/vendedores/vendedores.service';

@Component({
    selector: 'app-vendedores',
    templateUrl: 'vendedores.component.html'
})
export class VendedoresComponent implements OnInit {

    usuario: Usuario;
    model: any = [];
    modelCadastrar: any = {};
    pagination: Pagination = new Pagination();
    lojas: any[];
    lojaSelecionada: any = {};
    error: boolean;

    constructor(
        private userSerivce: UsuarioService,
        private activatedRoute: ActivatedRoute,
        private vendedorService: VendedoresService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.usuario = this.userSerivce.carregar();
        this.lojas = this.usuario.lojas;

        this.model.vendedores = this.activatedRoute.snapshot.data['vendedores'];
        this.lojaSelecionada = this.model.vendedores.length > 0 ? this.model.vendedores[0].loja : 0;

        this.pagination.total = this.model.vendedores ? this.model.vendedores.lenght : 0;
        this.pagination.page = 1;
    }

    goToPage(event) {
        this.pagination.page = event.page;
    }

    excluir(id: number) {
        this.vendedorService.excluir(id).subscribe(
            sucesso => {
                this.toastr.success('Exclusão realizada com sucesso.');
                const deletar = this.model.vendedores.find(p => p.id === id);

                const index = this.model.vendedores.indexOf(deletar, 0);
                if (index > -1) {
                    this.model.vendedores.splice(index, 1);
                }
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

    visualizar(id: number) {
        this.modelCadastrar = this.model.vendedores.find(p => p.id === id);
    }

    selecionarLoja(event) {
        this.lojaSelecionada = this.lojas.find(p => p.id === parseInt(event.target.value));

        this.vendedorService.carregar(event.target.value).subscribe(sucesso => {
            this.model.vendedores = sucesso;
            this.modelCadastrar.loja.id = this.lojaSelecionada.id;
        },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

    limpar() {
        this.modelCadastrar.id = 0;
        this.modelCadastrar.nome = '';
        this.modelCadastrar.metaMensal = 0;
        this.list();
    }
    digitandoNome(value) {
        if (!value) {
            this.error = true;
        } else {
            this.error = false;
        }
    }
    salvar() {
        if (!this.modelCadastrar.nome) {
            this.error = true;
        } else {
            this.modelCadastrar.loja = this.lojaSelecionada;
            if (this.modelCadastrar.id > 0) {
                this.vendedorService.editar(this.modelCadastrar).subscribe(
                    sucesso => {
                        this.toastr.success('Usuário editado com sucesso.');
                        this.limpar();
                    },
                    erro => {
                        erro.forEach(e => this.toastr.error(e.message));
                    });
            } else {
                this.vendedorService.inserir(this.modelCadastrar).subscribe(
                    sucesso => {
                        this.toastr.success('Usuário cadastrado com sucesso.');
                        this.limpar();
                    },
                    erro => {
                        erro.forEach(e => this.toastr.error(e.message));
                    });
            }

        }
    }

    list() {
        this.vendedorService.carregar(this.lojaSelecionada.id).subscribe(
            sucesso => {
                this.model.vendedores = sucesso;
            });

    }
}

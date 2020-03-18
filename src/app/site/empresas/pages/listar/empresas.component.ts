import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../core/models/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from '../../../../core/services/empresas/empresas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-empresas',
    templateUrl: 'empresas.component.html'
})
export class EmpresasComponent implements OnInit {

    model: any = [];
    pagination: Pagination = new Pagination();
    modelCadastrar: any = {};
    error: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private empresaService: EmpresasService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {

        this.model.empresas = this.activatedRoute.snapshot.data['empresas'];
        this.pagination.total = this.model.empresas ? this.model.empresas.lenght : 0;
        this.pagination.page = 1;
    }

    goToPage(event) {
        this.pagination.page = event.page;
    }

    visualizar(id: number) {
        this.modelCadastrar = this.model.empresas.find(p => p.id === id);
    }

    digitandoNome(value) {
        if (!value) {
            this.error = true;
        } else {
            this.error = false;
        }
    }

    excluir(id: number) {
        this.empresaService.remover(id).subscribe(
            sucesso => {
                this.toastr.success('Exclusão realizada com sucesso.');
                const deletar = this.model.empresas.find(p => p.id === id);

                const index = this.model.empresas.indexOf(deletar, 0);
                if (index > -1) {
                    this.model.empresas.splice(index, 1);
                }
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }
    salvar() {
        if (!this.modelCadastrar.nome) {
            this.error = true;
        } else {
            if (this.modelCadastrar.id > 0) {
                this.empresaService.editar(this.modelCadastrar).subscribe(
                    sucesso => {
                        this.toastr.success('Empresa editada com sucesso.');
                        this.limpar();
                    },
                    erro => {
                        erro.forEach(e => this.toastr.error(e.message));
                    });
            } else {
                this.empresaService.inserir(this.modelCadastrar).subscribe(
                    sucesso => {
                        this.toastr.success('Empresa cadastrada com sucesso.');
                        this.limpar();
                    },
                    erro => {
                        erro.forEach(e => this.toastr.error(e.message));
                    });
            }
        }
    }
    limpar() {
        this.modelCadastrar.id = 0;
        this.modelCadastrar.nome = '';
        this.list();
    }

    list() {
        this.empresaService.carregar().subscribe(
            sucesso => {
                this.model.empresas = sucesso;
            }
        );
    }

    
    ativarDesativar(id: number) {
        this.empresaService.ativaDesativa(id).subscribe(
            sucesso => {
                this.toastr.success('Modificação realizada com sucesso.');
                this.limpar();
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }
}

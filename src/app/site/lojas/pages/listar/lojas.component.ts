import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../core/models/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { LojasService } from '../../../../core/services/lojas/lojas.service';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from '../../../../core/models/empresa';
import { EmpresasService } from '../../../../core/services/empresas/empresas.service';

@Component({
    selector: 'app-lojas',
    templateUrl: 'lojas.component.html'
})
export class LojasComponent implements OnInit {

    model: any = [];
    pagination: Pagination = new Pagination();
    error: boolean;
    modelCadastrar: any = {};
    empresaSelecionada: Empresa = new Empresa();
    empresas: Empresa[] = new Array<Empresa>();

    empresaFilterSelecionada: Empresa = new Empresa();
    empresasFilter: Empresa[] = new Array<Empresa>();

    constructor(
        private activatedRoute: ActivatedRoute,
        private lojaService: LojasService,
        private toastr: ToastrService,
        private empresasService: EmpresasService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.carregarEmpresas();
        this.model.lojas = this.activatedRoute.snapshot.data['lojas'].resultado;
        this.pagination.total = this.model.lojas ? this.model.lojas.lenght : 0;
        this.pagination.page = 1;
    }

    goToPage(event) {
        this.pagination.page = event.page;
    }

    excluir(id: number) {
        this.lojaService.remover(id).subscribe(
            sucesso => {
                this.toastr.success('Exclusão realizada com sucesso.');
                const deletar = this.model.lojas.find(p => p.id === id);

                const index = this.model.lojas.indexOf(deletar, 0);
                if (index > -1) {
                    this.model.lojas.splice(index, 1);
                }
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }


    visualizar(id: number) {
        const loja = this.model.lojas.find(p => p.id === id);
        this.empresaSelecionada.id = loja.empresa.id;
        this.modelCadastrar = loja;
    }

    salvar() {
        this.modelCadastrar.empresa = {
            id: this.empresaSelecionada.id,
        };

        if (!this.modelCadastrar.nome || !this.modelCadastrar.metaMensal || !this.modelCadastrar.empresa) {
            this.error = true;
        } else {
            if (this.modelCadastrar.id > 0) {
                this.lojaService.editar(this.modelCadastrar).subscribe(
                    sucesso => {
                        this.toastr.success('Loja editada com sucesso.');
                        this.limpar();
                    },
                    erro => {
                        erro.forEach(e => this.toastr.error(e.message));
                    });
            } else {
                this.lojaService.inserir(this.modelCadastrar).subscribe(
                    sucesso => {
                        this.toastr.success('Loja cadastrada com sucesso.');
                        this.limpar();
                    },
                    erro => {
                        erro.forEach(e => this.toastr.error(e.message));
                    });
            }
        }
    }

    ativarDesativar(id: number) {
        this.lojaService.ativaDesativa(id).subscribe(
            sucesso => {
                this.toastr.success('Modificação realizada com sucesso.');
                this.limpar();
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

    carregarEmpresas() {
        this.empresasService.carregar().subscribe(
            sucesso => {
                this.empresas = sucesso;
                this.empresasFilter = sucesso;

                this.empresaSelecionada.id = 0;
                this.empresaFilterSelecionada.id = 0;
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

    selecionarEmpresa(event) {
        const value = event.target.value;
        this.carregarLojas(value);
    }

    limpar() {
        this.modelCadastrar.id = 0;
        this.modelCadastrar.nome = '';
        this.empresaSelecionada.id = 0;
        this.modelCadastrar.metaMensal = '';
        this.modelCadastrar.master = false;
        this.error = false;
        this.list();
    }

    digitandoNome(value) {
        if (!value) {
            this.error = true;
        } else {
            this.error = false;
        }
    }

    list() {
        this.lojaService.carregar().subscribe(
            sucesso => {
                this.model.lojas = sucesso;
            });
    }

    carregarLojas(value) {
        if (value === '0') {
            this.list();
        } else {
            this.lojaService.carregarPorEmpresa(value).subscribe(
                sucesso => {
                    this.model.lojas = sucesso.resultado;
                });
        }
    }
}

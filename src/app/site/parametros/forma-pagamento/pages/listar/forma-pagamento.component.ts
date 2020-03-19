import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContaService } from '../../../../../core/services/conta.service';
import { Pagination } from '../../../../../core/models/pagination';
import { FormaPagamentoService } from '../../../../../core/services/forma-pagamento/forma-pagamento.service';

@Component({
    selector: 'app-forma-pagamento',
    templateUrl: 'forma-pagamento.component.html'
})
export class FormaPagamentoComponent implements OnInit {
    
    model: any = [];
    pagination: Pagination = new Pagination();
    modelCadastrar: any = {};
    error: boolean;
    constructor(
        private activatedRoute: ActivatedRoute,
        private formaPagamentoService: FormaPagamentoService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.model.formasPagamento = this.activatedRoute.snapshot.data['formasPagamento'].resultado;
        this.pagination.total = this.model.formasPagamento ? this.model.formasPagamento.lenght : 0;
        this.pagination.page = 1;
    }

    goToPage(event) {
        this.pagination.page = event.page;
    }

    excluir(id: number) {
        this.formaPagamentoService.excluir(id).subscribe(
            sucesso => {
                this.toastr.success('Exclusão realizada com sucesso.');
                const deletar = this.model.formasPagamento.find(p => p.id === id);

                const index = this.model.formasPagamento.indexOf(deletar, 0);
                if (index > -1) {
                    this.model.formasPagamento.splice(index, 1);
                }
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

    visualizar(id: number) {
        this.modelCadastrar = this.model.formasPagamento.find(p => p.id === id);
    }

    digitandoNome(value) {
        if (!value) {
            this.error = true;
        } else {
            this.error = false;
        }
    }

    limpar() {
        this.modelCadastrar.id = 0;
        this.modelCadastrar.nome = '';
        this.list();
    }

    list() {
        this.formaPagamentoService.carregar().subscribe(
            sucesso => {
                this.model.formasPagamento = sucesso.resultado;
            }
        );
    }

    salvar() {

        if (this.modelCadastrar.id > 0) {
            this.formaPagamentoService.editar(this.modelCadastrar).subscribe(
                sucesso => {
                    this.toastr.success('Forma de pagamento editado com sucesso.');
                    this.limpar();
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        } else {
            this.formaPagamentoService.inserir(this.modelCadastrar).subscribe(
                sucesso => {
                    this.toastr.success('Forma de pagamento cadastrado com sucesso.');
                    this.limpar();
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        }
    }
}

import { Component } from '@angular/core';
import { Pagination } from '../../../../core/models/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { CaixaService } from '../../../../core/services/caixa/caixa.service';
import { ToastrService } from 'ngx-toastr';
import { VendedoresService } from '../../../../core/services/vendedores/vendedores.service';
import { FormaPagamentoService } from '../../../../core/services/forma-pagamento/forma-pagamento.service';
import { FormaPagamento } from '../../../../core/models/forma-pagamento';
import { Vendedor } from '../../../../core/models/vendedor';
import { UsuarioService } from '../../../../core/services/usuarios/usuario.service';
import * as moment from 'moment/moment';
import { BsDatepickerConfig } from 'ngx-bootstrap';
moment.locale('pt-br');
@Component({
    selector: 'app-movimentacao',
    templateUrl: 'movimentacao.component.html'
})
export class MovimentacaoComponent {
    model: any = [];
    modelMovimentacao: any = {};
    usuario: any;
    pagination: Pagination = new Pagination();
    soma: number;
    formaPagamentos: FormaPagamento[] = new Array<FormaPagamento>();
    vendedores: Vendedor[] = new Array<Vendedor>();
    vendedorSelecionado: Vendedor = new Vendedor();
    formaPagamentoSelecionado: FormaPagamento = new FormaPagamento();

    data: any;
    dataChange: any;
    lojaParam: any;
    lojas: any[] = [];
    loja: string;
    lojaSelecionada: any = {};
    mostrar = { vendedorAsc: false, pagamentoAsc: false };
    datePickerConfig: Partial<BsDatepickerConfig>;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private caixaService: CaixaService,
        private userSerivce: UsuarioService,
        private router: Router,
        private toastr: ToastrService,
        private vendedorService: VendedoresService,
        private formaPagamentoService: FormaPagamentoService
    ) { }

    ngOnInit(): void {

        this.datePickerConfig = Object.assign({},
            {
                dateInputFormat: 'DD/MM/YYYY'
            }
        );
        this.activatedRoute.params.subscribe(params => {

            this.model.lancamentos = this.activatedRoute.snapshot.data['lancamentos'].resultado;
            this.soma = this.model.lancamentos ? this.model.lancamentos.reduce((sum, current) => sum + current.valor, 0) : 0;
            this.data = params['data'];
            this.lojaParam = +params['loja'];

            this.pagination.total = this.model.lancamentos.lenght;
            this.pagination.page = 1;

            this.usuario = this.userSerivce.carregar();
            this.lojas = this.usuario.lojas.sort(p => p.id);

            console.log(moment().toLocaleString());

            this.modelMovimentacao = {
                usuario: this.usuario,
                valor: 0,
                data: new Date().toLocaleString(),
            };

            this.carregarFormaPagamento();
            this.carregarVendedores();
        });

    }

    goToPage(event) {
        this.pagination.page = event.page;
    }

    listar() {
        this.data = moment(this.modelMovimentacao.data).format('DD-MM-YYYY');

        this.list();
    }

    list() {
        const date = moment().format('DD-MM-YYYY');
        this.data = this.data ? this.data : date;

        this.caixaService.carregarCaixa(this.data, this.lojaSelecionada.id).subscribe(response => {

            // response.forEach(p => {
            //     p.data = this.dateTimePipeHour.transform(p.data, 'yyyy-MM-dd HH:mm');
            // });

            this.model.lancamentos = response.resultado;
            this.soma = this.model.lancamentos.reduce((sum, current) => sum + current.valor, 0);
        },
            erro => {
                console.log(erro);
            });
    }

    carregarFormaPagamento() {
        this.formaPagamentoService.carregar().subscribe(
            sucesso => {
                this.formaPagamentos = sucesso.resultado;
                this.formaPagamentoSelecionado.id = 0;
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

    carregarVendedores() {
        this.lojaSelecionada.id = this.lojaParam ? this.lojaParam :
            (this.lojaSelecionada.id > 0 ? this.lojaSelecionada.id : this.usuario.lojas[0].id);

        this.vendedorService.carregar(this.lojaSelecionada.id).subscribe(
            sucesso => {
                this.vendedores = sucesso.resultado;
                this.vendedorSelecionado.id = 0;
                this.list();
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }


    salvar() {

        this.modelMovimentacao.formaPagamento = { id: this.formaPagamentoSelecionado.id };
        this.modelMovimentacao.vendedor = { id: this.vendedorSelecionado.id };
        this.modelMovimentacao.loja = { id: this.lojaSelecionada.id };

        if (this.modelMovimentacao.id > 0) {
            this.caixaService.editar(this.modelMovimentacao).subscribe(
                sucesso => {
                    this.toastr.success('Lançamento cadastrado com sucesso.');
                    this.modelMovimentacao.valor = 0;
                    this.formaPagamentoSelecionado.id = 0;
                    this.vendedorSelecionado.id = 0;
                    this.modelMovimentacao.id = 0;
                    this.list();
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        } else {
            this.caixaService.inserir(this.modelMovimentacao).subscribe(
                sucesso => {
                    this.toastr.success('Lançamento editado com sucesso.');
                    this.modelMovimentacao.valor = 0;
                    this.formaPagamentoSelecionado.id = 0;
                    this.vendedorSelecionado.id = 0;
                    this.modelMovimentacao.id = 0;
                    this.list();
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        }
    }

    selecionarLoja(event) {

        this.lojaSelecionada = {
            id: event.target.value,
            nome: ''
        };

        this.router.navigateByUrl(`/lancamentos/` + this.data + `;loja=` + this.lojaSelecionada.id);
    }

    ordenarVendedorAsc() {

        this.mostrar.vendedorAsc = !this.mostrar.vendedorAsc;

        if (this.mostrar.vendedorAsc) {
            this.model.lancamentos = this.model.lancamentos.sort(function (a, b) {
                if (a.vendedor.nome < b.vendedor.nome) { return -1; }
                if (a.vendedor.nome > b.vendedor.nome) { return 1; }
                return 0;
            });
        }

        if (!this.mostrar.vendedorAsc) {
            this.model.lancamentos = this.model.lancamentos.sort(function (a, b) {
                if (a.vendedor.nome < b.vendedor.nome) { return -1; }
                if (a.vendedor.nome > b.vendedor.nome) { return 1; }
                return 0;
            }).reverse();
        }
    }

    ordenarFormaPagamentoAsc() {

        this.mostrar.pagamentoAsc = !this.mostrar.pagamentoAsc;

        if (this.mostrar.pagamentoAsc) {
            this.model.lancamentos = this.model.lancamentos.sort(function (a, b) {
                if (a.formaPagamento.nome < b.formaPagamento.nome) { return -1; }
                if (a.formaPagamento.nome > b.formaPagamento.nome) { return 1; }
                return 0;
            });
        }

        if (!this.mostrar.pagamentoAsc) {
            this.model.lancamentos = this.model.lancamentos.sort(function (a, b) {
                if (a.formaPagamento.nome < b.formaPagamento.nome) { return -1; }
                if (a.formaPagamento.nome > b.formaPagamento.nome) { return 1; }
                return 0;
            }).reverse();
        }
    }


    visualizar(id) {
        const lancamento = this.model.lancamentos.find(p => p.id == id);

        this.vendedorSelecionado.id = lancamento.vendedor.id;
        this.formaPagamentoSelecionado.id = lancamento.formaPagamento.id;

        this.modelMovimentacao = lancamento;
        this.modelMovimentacao.data = new Date(this.modelMovimentacao.dataDesc);
        this.modelMovimentacao.usuario = this.usuario;
    }

    limpar() {
        this.modelMovimentacao.valor = 0;
        this.formaPagamentoSelecionado.id = 0;
        this.vendedorSelecionado.id = 0;
        this.modelMovimentacao.id = 0;
    }

}

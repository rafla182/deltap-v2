import { Component } from '@angular/core';
import { Pagination } from '../../../../core/models/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment';
import { UsuarioService } from '../../../../core/services/usuarios/usuario.service';
import { BsLocaleService } from 'ngx-bootstrap';

@Component({
    templateUrl: 'caixa.component.html',
    styleUrls: ['./caixa.component.sass']
})
export class CaixaComponent {

    model: any = [];
    pagination: Pagination = new Pagination();
    usuario: any;
    total: number;
    lojas: any[] = [];
    loja: string;
    lojaSelecionada: any = {};
    filtro: any;
    filtroInicio: any;
    filtroFim: any;
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private userSerivce: UsuarioService,
        private _localeService: BsLocaleService
    ) {

    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this._localeService.use('pt-br');
            const inicio = new Date(); // now
            inicio.setDate(inicio.getDate() - 7);

            this.filtroInicio = params['inicio'] ? new Date(params['inicio'].replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : inicio;
            this.filtroFim = params['fim'] ? new Date(params['fim'].replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : new Date();

            this.model.caixas = this.activatedRoute.snapshot.data['caixas'].resultado;
            this.pagination.total = this.model.caixa ? this.model.caixa.lenght : 0;
            this.pagination.page = 1;
            this.total = this.model.caixas.reduce((sum, current) => sum + current.valor, 0);
            this.usuario = this.userSerivce.carregar();
            this.lojas = this.usuario.lojas.sort(p => p.id);
            this.lojaSelecionada = +params['loja'] ? this.lojas.find(p => p.id === +params['loja']) : this.usuario.lojas[0];
        });
    }

    visualizar(data) {
        const date = moment(data).format('DD-MM-YYYY');
        this.router.navigateByUrl(`/lancamentos/` + date + `;loja=` + this.lojaSelecionada.id);
    }

    goToPage(event) {
        this.pagination.page = event.page;
    }

    selecionarLoja(event) {
        this.lojaSelecionada = this.lojas.find(p => p.id === event.target.value);
        this.carregarCaixa();
    }

    carregarCaixa() {
        const inicio = moment(this.filtroInicio).format('DD-MM-YYYY');
        const fim = moment(this.filtroFim).format('DD-MM-YYYY');

        this.router.navigateByUrl(`/caixas;loja=` +
            this.lojaSelecionada.id + `;inicio=` + inicio + `;fim=` + fim);
    }
}

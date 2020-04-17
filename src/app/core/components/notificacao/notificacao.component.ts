import { Component, AfterViewInit, ViewEncapsulation, Renderer2, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NotificacaoService } from '../../services/notificacao.service';

@Component({
    selector: 'app-notificacao',
    templateUrl: './notificacao.component.html',
    styleUrls: ['./notificacao.component.css']
})

export class NotificacaoComponent implements OnInit {

    exibir: any = {};
    notificacao: any = {};


    constructor(
        private router: Router,
        private notificacaoService: NotificacaoService,
    ) { }

    ngOnInit(): void {
        this.notificacao.lista = [];
        this.notificacao.pagina = 1;
        this.notificacao.quantidade = 20;
        this.novas();
        this.listar();
    }

    abrir() {
        this.exibir.notificacao = !this.exibir.notificacao;
        this.notificacaoService.zerarNovas()
            .subscribe(
                sucesso => {
                    this.notificacao.novas = 0;
                })
    }

    novas() {
        this.notificacaoService.novas()
            .subscribe(
                sucesso => {
                    this.notificacao.novas = sucesso.resultado;
                })
    }

    listar() {
        this.notificacaoService.listar(this.notificacao.pagina, this.notificacao.quantidade)
            .subscribe(
                sucesso => {
                    this.notificacao.lista = this.notificacao.lista.concat(sucesso);
                })
    }

    navegar(item) {
        this.notificacaoService.marcarComoLida(item.id).subscribe();
        item.lida = true;
        this.exibir.notificacao = false;
        this.router.navigateByUrl(item.url);
    }

    marcarTudoComoLida() {
        this.notificacaoService.marcarTudoComoLida().subscribe();
        this.notificacao.lista.forEach(item => item.lida = true);
    }

    paginar() {
        this.notificacao.pagina++;
        this.listar();
    }
}

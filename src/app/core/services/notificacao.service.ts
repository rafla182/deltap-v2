import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from './http/http.service';

@Injectable()
export class NotificacaoService {

    private listarUrl: string = 'notificacao/listar';
    private novasUrl: string = 'notificacao/novas';
    private zerarNovasUrl: string = 'notificacao/zerar-novas';
    private marcarComoLidaUrl: string = 'notificacao/marcar-como-lida';
    private marcarTudoComoLidaUrl: string = 'notificacao/marcar-tudo-como-lida';

    constructor(private httpService: HttpService) { }

    listar(pagina: number, quantidade: number) {
        let params = { pagina, quantidade };
        return this.httpService.post(this.listarUrl, params, false);
    }

    novas() {
        return this.httpService.post(this.novasUrl, null, false);
    }

    zerarNovas() {
        return this.httpService.post(this.zerarNovasUrl, null, false);
    }

    marcarComoLida(id: string) {
        let params = { id };
        return this.httpService.post(this.marcarComoLidaUrl, params, false);
    }

    marcarTudoComoLida() {
        return this.httpService.post(this.marcarTudoComoLidaUrl, null, false);
    }
}

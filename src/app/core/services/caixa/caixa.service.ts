import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Movimentacao } from '../../models/caixa';

@Injectable()
export class CaixaService {

    private inserirUrl: string = 'movimentacao/inserir';
    private editarUrl = 'movimentacao/editar/';
    private listarUrl: string = 'caixa/listar';
    private listarMovimentacaoUrl: string = 'movimentacao/listar/';

    constructor(private httpService: HttpService) {
    }

    carregar(loja, inicio, fim) {
        return this.httpService.get(`${this.listarUrl}?loja=${loja}&inicio=${inicio}&fim=${fim}`);
    }

    carregarCaixa(data, loja): any {
        console.log(data);
        return this.httpService.get(`${this.listarMovimentacaoUrl}${loja}/${data}`);
    }

    inserir(movimentacao) {
        const params = { movimentacao };
        return this.httpService.post(`${this.inserirUrl}`, params);
    }

    editar(movimentacao) {
        const params = { movimentacao };
        return this.httpService.post(`${this.editarUrl}`, params);
    }
}

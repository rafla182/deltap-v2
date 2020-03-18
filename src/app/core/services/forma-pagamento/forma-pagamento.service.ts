import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { FormaPagamento } from '../../models/forma-pagamento';

@Injectable()
export class FormaPagamentoService {

    private listarUrl: string = 'forma-pagamento/listar';
    private inserirUrl: string = 'forma-pagamento/inserir';
    private editarUrl = 'forma-pagamento/editar/';
    private visualizarUrl = 'forma-pagamento/visualizar/';
    private excluirUrl = 'forma-pagamento/excluir/';

    constructor(private httpService: HttpService) {
    }

    carregar() {
        return this.httpService.get(`${this.listarUrl}`);
    }

    inserir(formaPagamento: FormaPagamento) {
        const params = { formaPagamento };
        return this.httpService.post(`${this.inserirUrl}`, params);
    }

    editar(formaPagamento: FormaPagamento) {
        const params = { formaPagamento };
        return this.httpService.post(`${this.editarUrl}`, params);
    }

    visualizar(id) {
        return this.httpService.get(`${this.visualizarUrl}${id}`);
    }

    excluir(id) {
        return this.httpService.get(`${this.excluirUrl}${id}`);
    }

}

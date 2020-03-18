import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Vendedor } from '../../models/vendedor';

@Injectable()
export class VendedoresService {

    private listarUrl = 'vendedores/listar/';
    private inserirUrl = 'vendedores/inserir';
    private editarUrl = 'vendedores/editar/';
    private visualizarUrl = 'vendedores/visualizar/';
    private excluirUrl = 'vendedores/excluir/';
    constructor(private httpService: HttpService) {
    }

    carregar(id) {
        return this.httpService.get(`${this.listarUrl}${id}`);
    }

    inserir(vendedor: Vendedor) {
        const params = { vendedor };
        return this.httpService.post(`${this.inserirUrl}`, params);
    }

    editar(vendedor: Vendedor) {
        const params = { vendedor };
        return this.httpService.post(`${this.editarUrl}`, params);
    }

    visualizar(id) {
        return this.httpService.get(`${this.visualizarUrl}${id}`);
    }

    excluir(id) {
        return this.httpService.get(`${this.excluirUrl}${id}`);
    }

}


import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Loja } from '../../models/loja';

@Injectable()
export class LojasService {

    private listarUrl = 'lojas/listar';
    private inserirUrl = 'lojas/inserir';
    private editarUrl = 'lojas/editar/';
    private visualizarUrl = 'lojas/visualizar/';
    private removerUrl = 'lojas/excluir/';
    private ativaDesativaUrl = 'lojas/ativarDesativar/';
    private listarPorEmpresaUrl = 'lojas/listarPorEmpresa/';

    constructor(private httpService: HttpService) {
    }

    carregar() {
        return this.httpService.get(`${this.listarUrl}`);
    }

    carregarPorEmpresa(id) {
        return this.httpService.get(`${this.listarPorEmpresaUrl}${id}`);
    }

    inserir(loja: Loja) {
        const params = { loja };
        return this.httpService.post(`${this.inserirUrl}`, params);
    }

    editar(loja: Loja) {
        const params = { loja };
        return this.httpService.post(`${this.editarUrl}`, params);
    }

    visualizar(id) {
        return this.httpService.get(`${this.visualizarUrl}${id}`);
    }

    remover(id) {
        return this.httpService.get(`${this.removerUrl}${id}`);
    }

    ativaDesativa(id) {
        return this.httpService.get(`${this.ativaDesativaUrl}${id}`);
    }

}

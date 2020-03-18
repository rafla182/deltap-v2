import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Empresa } from '../../models/empresa';

@Injectable()
export class EmpresasService {

    private listarUrl = 'empresas/listar';
    private inserirUrl = 'empresas/inserir';
    private editarUrl = 'empresas/editar/';
    private visualizarUrl = 'empresas/visualizar/';
    private removerUrl = 'empresas/excluir/';
    private ativaDesativaUrl = 'empresas/ativarDesativar/';

    constructor(private httpService: HttpService) {
    }

    carregar() {
        return this.httpService.get(`${this.listarUrl}`);
    }

    inserir(empresa: Empresa) {
        const params = { empresa };
        return this.httpService.post(`${this.inserirUrl}`, params);
    }

    editar(empresa: Empresa) {
        const params = { empresa };
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

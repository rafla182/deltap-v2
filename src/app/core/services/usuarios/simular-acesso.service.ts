import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable()
export class SimularAcessoService {

    private carregarUrl = 'usuario/carregar-empresa';
    private simularUrl = '/simular-acesso/';

    constructor(private httpService: HttpService) {
    }
    carregar() {
        return this.httpService.get(`${this.carregarUrl}`);
    }
    
    simular(id) {
        return this.httpService.get(`${this.simularUrl}${id}`);
    }
}

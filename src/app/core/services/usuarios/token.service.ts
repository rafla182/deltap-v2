import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TokenService {

    constructor() { }

    existe() {
        let token = localStorage.getItem(environment.storageToken);
        return token && token.length > 0;
    }

    carregar() {
        return localStorage.getItem(environment.storageToken);
    }

    salvar(token) {
        localStorage[environment.storageToken] = token;
    }

    remover() {
        localStorage.removeItem(environment.storageToken);
    }

   
}

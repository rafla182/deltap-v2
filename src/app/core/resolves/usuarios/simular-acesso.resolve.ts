import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SimularAcessoService } from '../../services/usuarios/simular-acesso.service';

@Injectable()
export class SimularAcessoResolve implements Resolve<any> {

    constructor(private simularAcesso: SimularAcessoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.simularAcesso.carregar();
    }
}

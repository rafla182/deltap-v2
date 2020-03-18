import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ContaService } from '../../services/conta.service';

@Injectable()
export class UsuariosCadastrarResolve implements Resolve<any> {

    constructor(private contaService: ContaService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {        
        const id = +route.params['id'];
        return this.contaService.visualizar(id);
    }
}

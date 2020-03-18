import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { ContaService } from '../../services/conta.service';
import { Observable } from 'rxjs';

@Injectable()
export class UsuariosResolve implements Resolve<any> {

    constructor(private contaService: ContaService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.contaService.listar();
    }
}

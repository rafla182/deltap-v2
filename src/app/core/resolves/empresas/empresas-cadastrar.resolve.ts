import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpresasService } from '../../services/empresas/empresas.service';

@Injectable()
export class EmpresasCadastrarResolve implements Resolve<any> {

    constructor(private empresasService: EmpresasService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const id = +route.params['id'];
        return this.empresasService.visualizar(id);
    }
}

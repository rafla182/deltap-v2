import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpresasService } from '../../services/empresas/empresas.service';

@Injectable()
export class EmpresasResolve implements Resolve<any> {

    constructor(private empresaService: EmpresasService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.empresaService.carregar();
    }
}

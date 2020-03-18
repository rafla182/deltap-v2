import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { VendedoresService } from '../../services/vendedores/vendedores.service';

@Injectable()
export class VendedoresCadastrarResolve implements Resolve<any> {

    constructor(private vendedoresService: VendedoresService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const id = +route.params['id'];
        return this.vendedoresService.visualizar(id);
    }
}

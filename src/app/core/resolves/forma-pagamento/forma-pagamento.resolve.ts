import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormaPagamentoService } from '../../services/forma-pagamento/forma-pagamento.service';

@Injectable()
export class FormaPagamentoResolve implements Resolve<any> {

    constructor(private formaPagamentoService: FormaPagamentoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.formaPagamentoService.carregar();
    }
}

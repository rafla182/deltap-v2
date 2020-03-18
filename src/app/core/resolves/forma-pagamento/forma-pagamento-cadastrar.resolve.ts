import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { FormaPagamentoService } from '../../services/forma-pagamento/forma-pagamento.service';

@Injectable()
export class FormaPagamentoCadastrarResolve implements Resolve<any> {

    constructor(private formaPagamentoService: FormaPagamentoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const id = +route.params['id'];
        return this.formaPagamentoService.visualizar(id);
    }
}

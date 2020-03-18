
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { LojasService } from '../../services/lojas/lojas.service';

@Injectable()
export class LojasCadastrarResolve implements Resolve<any> {

    constructor(private lojasService: LojasService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const id = +route.params['id'];
        return this.lojasService.visualizar(id);
    }
}

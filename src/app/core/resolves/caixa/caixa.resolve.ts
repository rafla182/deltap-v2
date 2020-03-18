import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CaixaService } from '../../services/caixa/caixa.service';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import * as moment from 'moment/moment';

@Injectable()
export class CaixaResolve implements Resolve<any> {

    constructor(private caixaService: CaixaService,
        private userSerivce: UsuarioService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        console.log(route.params);
        const filtroInicio = route.params['inicio'] ? route.params['inicio'] : moment().add(-7, 'days').format('DD-MM-YYYY');
        const filtroFim = route.params['fim'] ? route.params['fim'] : moment().format('DD-MM-YYYY');

        const usuario = this.userSerivce.carregar();
        const loja = +route.params['loja'] ? +route.params['loja'] : usuario.lojas.sort(p => p.id)[0].id;
        return this.caixaService.carregar(loja, filtroInicio, filtroFim);
    }
}

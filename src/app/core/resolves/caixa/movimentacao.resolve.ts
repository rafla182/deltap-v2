import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CaixaService } from '../../services/caixa/caixa.service';
import * as moment from 'moment/moment';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Usuario } from '../../services/usuarios/usuario';

@Injectable()
export class MovimentacaoResolve implements Resolve<any> {
    usuario: Usuario;

    constructor(private caixaService: CaixaService,
        private userSerivce: UsuarioService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const date = moment().format('DD-MM-YYYY');
        const data = route.params['data'] ? route.params['data'] : date;
        const lojaParam = +route.params['loja'] ? +route.params['loja'] : 0;
        this.usuario = this.userSerivce.carregar();

        if (!(lojaParam > 0)) {
            const loja = this.usuario.lojas.sort(p => p.id);
            return this.caixaService.carregarCaixa(data, loja[0].id);
        }
        return this.caixaService.carregarCaixa(data, lojaParam);
    }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VendedoresService } from '../../services/vendedores/vendedores.service';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Usuario } from '../../services/usuarios/usuario';

@Injectable()
export class VendedoresResolve implements Resolve<any> {
    usuario: Usuario;
    constructor(private vendedorService: VendedoresService, private userSerivce: UsuarioService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.usuario = this.userSerivce.carregar();
        return this.vendedorService.carregar(this.usuario.lojas[0].id);
    }
}

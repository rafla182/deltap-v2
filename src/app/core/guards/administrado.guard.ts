import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ContaService } from '../services/conta.service';
import { UsuarioService } from '../services/usuarios/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AdministradorGuard implements CanActivate {
    constructor(private contaService: ContaService,
        private usuarioService: UsuarioService,
        private toastr: ToastrService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.contaService.logado() && this.usuarioService.administrador()) {
            return true;
        }

        this.toastr.error('Usuário sem permissão de acesso.');
        this.router.navigate(['/']);
    }
}

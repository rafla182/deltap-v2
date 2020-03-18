import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ContaService } from '../services/conta.service';

@Injectable()
export class DeslogadoGuard implements CanActivate {
    constructor(private contaService: ContaService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this.contaService.logado()) {
            return true;
        }

        this.router.navigate(['/dashboard']);
    }
}

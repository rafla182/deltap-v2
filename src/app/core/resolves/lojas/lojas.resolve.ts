
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LojasService } from '../../services/lojas/lojas.service';

@Injectable()
export class LojasResolve implements Resolve<any> {

    constructor(private lojaService: LojasService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.lojaService.carregar();
    }
}

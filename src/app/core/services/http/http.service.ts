import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../components/loading/loading.service';
import { TokenService } from '../usuarios/token.service';
import { environment } from '../../../../environments/environment';
import { UsuarioService } from '../usuarios/usuario.service';
import 'rxjs/Rx';

@Injectable({ providedIn: 'root' })
export class HttpService {

    httpOptions: any;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private tokenService: TokenService,
        private toastr: ToastrService,
        private loadingService: LoadingService,
        private userService: UsuarioService) {
    }

    endPointUrl(path: string) {
        return `${environment.api}${path}`;
    }
    createOptions(blob: boolean = false, form: boolean = false) {

        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Access-Control-Allow-Origin', '*');

        if (!form) {
            headers = headers.append('Content-Type', 'application/json');
        }

        if (this.tokenService.existe()) {
            headers = headers.append('Authorization', 'Bearer ' + this.tokenService.carregar());
        }

        this.httpOptions = {
            headers: headers
        }

        if (!blob) return;

        headers.append('responseType', 'arraybuffer');

        this.httpOptions = {
            headers: headers,
            responseType: 'blob'
        }
    }

    get(url, useLoading = true): Observable<any> {
        this.startLoading(useLoading);
        this.createOptions();
        return this.httpClient.get(this.endPointUrl(url), this.httpOptions)
            .pipe(catchError(erro => this.handleError(erro)))
            .timeout(120000)
            .finally(() => this.stopLoading(useLoading));
    }

    post(url, data, useLoading = true, blob = false, form = false): Observable<any> {
        this.startLoading(useLoading);
        this.createOptions(blob, form);
        data = form ? data : JSON.stringify(data);
        return this.httpClient.post(this.endPointUrl(url), data, this.httpOptions)
            .pipe(catchError(erro => this.handleError(erro)))
            .timeout(120000)
            .finally(() => this.stopLoading(useLoading));
    }

    handleError(response: HttpErrorResponse) {

        if (response.error instanceof ErrorEvent) {
            this.toastr.error(response.error.message);
        } else {
            if (response.status === 401) {
                this.userService.remover();
                this.tokenService.remover();
                this.router.navigateByUrl('/login');
                return Observable.throw([{ message: '' }]);
            }

            if (response.status === 403) {
                this.toastr.error('Usuário sem permissão de acesso.');
                this.router.navigateByUrl('/');
                return Observable.throw([{ message: "" }]);
            }

            response.error.forEach(e => this.toastr.error(e.message));
        }
        return throwError(response.error || [{ message: 'Ocorreu um erro inesperado. Tente novamente.' }]);
    }

    startLoading(useLoading): any {
        if (useLoading) {
            this.loadingService.start();
        }
    }

    stopLoading(useLoading) {
        if (useLoading) {
            this.loadingService.stop();
        }
    }
}
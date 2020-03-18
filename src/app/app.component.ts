import { Component } from '@angular/core';import { ToastrService } from 'ngx-toastr';import { TokenService } from './core/services/usuarios/token.service';import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private toastr: ToastrService, private tokenService: TokenService, private router: Router) { }

    ngOnInit() {
        if (this.tokenService.existe()) {
            this.router.navigateByUrl('/');
        } else {
            this.router.navigateByUrl('/login');
        }
    }

}

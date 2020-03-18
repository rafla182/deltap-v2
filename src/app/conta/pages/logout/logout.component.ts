import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContaService } from '../../../core/services/conta.service';

@Component({
    selector: 'app-logout',
    template: ''
})
export class LogoutComponent implements OnInit {

    constructor(private router: Router, private contaService: ContaService) { }

    ngOnInit() {
        this.logout();
    }

    logout() {
        this.contaService.logout();
        this.router.navigateByUrl('/login');
    }
}

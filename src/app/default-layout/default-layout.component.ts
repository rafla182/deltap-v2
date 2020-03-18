import { Component, OnDestroy, OnInit } from '@angular/core';
import { navItems } from './../_nav';
import { UsuarioService } from '../core/services/usuarios/usuario.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
    public navItems = navItems;
    public sidebarMinimized = true;
    private changes: MutationObserver;
    public element: HTMLElement = document.body;
    public user: any;
    constructor(private userService: UsuarioService) {

        this.changes = new MutationObserver((mutations) => {
            this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
        });

        this.changes.observe(<Element>this.element, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    ngOnInit(): void {
        this.user = this.userService.carregar();
        console.log(this.user);
        var navFilhos = [];
        this.navItems = this.navItems.filter(p => this.user.permissoes.find(a => a.nome === p.role));



        this.navItems.forEach(element => {
            if (element.children) {
                navFilhos.push(
                    {
                        name: element.name,
                        icon: element.icon,
                        role: element.role,
                        children: element.children.filter(p => this.user.permissoes.find(a => a.nome === p.role))
                    }
                )
            } else {
                if (this.user.permissoes.find(a => a.nome === element.role)) {
                    navFilhos.push(element);
                }
            }
        });



        this.navItems = navFilhos;
    }

    ngOnDestroy(): void {
        this.changes.disconnect();
    }
}

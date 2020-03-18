import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Usuario } from '../../services/usuarios/usuario';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    usuario: Usuario;

    exibir: any = {};

    constructor(
        private usuarioService: UsuarioService
    ) { }

    ngOnInit() {
        this.usuario = this.usuarioService.carregar();
        this.subscription = this.usuarioService.alteracaoNoUsuario.subscribe(usuario => {
            this.usuario = usuario;
            console.log('carregar usuario');
            console.log(usuario);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
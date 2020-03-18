import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Usuario } from './usuario';
@Injectable()
export class UsuarioService {

    private usuario: Usuario;
    alteracaoNoUsuario: Subject<Usuario> = new Subject<Usuario>();

    constructor() {
        this.carregar();
    }

    salvar(usuario: Usuario) {
        localStorage[environment.storageUsuario] = JSON.stringify(usuario);
        this.usuario = usuario;
        this.alteracaoNoUsuario.next(this.usuario);
    }

    carregar() {
        if (localStorage[environment.storageUsuario] && localStorage[environment.storageUsuario] !== 'undefined') {
            this.usuario = JSON.parse(localStorage[environment.storageUsuario]);
            this.alteracaoNoUsuario.next(this.usuario);
            return this.usuario;
        }
        return null;
    }

    remover() {
        localStorage.removeItem(environment.storageUsuario);
        this.usuario = null;
        this.alteracaoNoUsuario.next(this.usuario);
    }

    administrador() {
        return this.usuario.administrador;
    }
 }

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from './http/http.service';
import { TokenService } from './usuarios/token.service';
import { UsuarioService } from './usuarios/usuario.service';
import { Usuario } from './usuarios/usuario';

@Injectable()
export class ContaService {

    estaLogado: Subject<boolean> = new Subject<boolean>();

    private cadastrarUrl = 'conta/cadastrar';
    private loginUrl = 'conta/login';
    private lembrarSenhaUrl = 'conta/lembrar-senha';
    private validarTokenUrl = 'conta/validar-token';
    private novaSenhaUrl = 'conta/nova-senha';
    private alterarSenhaUrl = 'usuarios/alterarsenha';
    private alterarEsqueciSenhaUrl = 'usuarios/alterar-esqueci-senha';
    private inscricaoUrl = 'conta/inscricao/';
    private listarUrl = 'usuarios/listar';
    private salvarUrl = 'usuarios/inserir';
    private editarUrl = 'usuarios/editar';
    private visualizarUrl = 'usuarios/visualizar/';
    private permissoesListarUrl = 'permissoes/listar';
    private permissoesPorUsuarioUrl = 'usuarios/permissoes/';
    private permissoesSalvarUrl = 'usuarios/permissoes/salvar';
    private excluirUrl = 'usuarios/excluir/';
    private ativaDesativaUrl = 'usuarios/ativarDesativar/';
    private esqueciUrl = 'conta/esqueci/';


    constructor(private httpService: HttpService, private tokenService: TokenService, private usuarioService: UsuarioService) { }

    cadastrar(nome: string, email: string, senha: string) {
        let params = { nome, email, senha };
        return this.httpService.post(this.cadastrarUrl, params);
    }

    login(email: string, senha: string) {
        let params = { email, senha };
        return this.httpService.post(this.loginUrl, params);
    }

    logado() {
        this.estaLogado.next(this.tokenService.existe());
        return this.tokenService.existe();
    }

    lembrarSenha(email: string) {
        let params = { email };
        return this.httpService.post(this.lembrarSenhaUrl, params);
    }

    validarToken(token: string) {
        let params = { token };
        return this.httpService.post(this.validarTokenUrl, params);
    }

    novaSenha(token: string, senha: string) {
        let params = { token, senha };
        return this.httpService.post(this.novaSenhaUrl, params);
    }

    alterarSenha(model: any) {
        let params = { senhaAntiga: model.senhaAntiga, senhaNova: model.senhaNova };
        return this.httpService.post(this.alterarSenhaUrl, params);
    }

    alterarEsqueciSenha(model: any) {
        let params = { email: model.email, senhaAntiga: model.senhaAntiga, senhaNova: model.senhaNova };
        return this.httpService.post(this.alterarEsqueciSenhaUrl, params);
    }

    logout() {
        console.log("aqui");
        this.usuarioService.remover();
        this.tokenService.remover();
        this.estaLogado.next(false);
    }

    inscricao(inscricaoId: number) {
        return this.httpService.get(`${this.inscricaoUrl}${inscricaoId}`);
    }

    listar() {
        return this.httpService.get(`${this.listarUrl}`);
    }

    inserir(usuario: Usuario) {
        const params = { usuario };
        return this.httpService.post(`${this.salvarUrl}`, params);
    }

    editar(usuario: Usuario) {
        const params = { usuario };
        return this.httpService.post(`${this.editarUrl}`, params);
    }

    visualizar(id) {
        return this.httpService.get(`${this.visualizarUrl}${id}`);
    }

    excluir(id) {
        return this.httpService.get(`${this.excluirUrl}${id}`);
    }

    listarPermissoes() {
        return this.httpService.get(`${this.permissoesListarUrl}`);
    }

    listarPermissoesPorUsuario(id) {
        return this.httpService.get(`${this.permissoesPorUsuarioUrl}${id}`);
    }

    salvarPermissoes(id: number, permissoes: any[]) {
        const params = { permissoes: permissoes, id: id };
        return this.httpService.post(this.permissoesSalvarUrl, params);
    }
    ativaDesativa(id) {
        return this.httpService.get(`${this.ativaDesativaUrl}${id}`);
    }

    esqueci(email) {
        return this.httpService.get(`${this.esqueciUrl}${email}`);
    }
}

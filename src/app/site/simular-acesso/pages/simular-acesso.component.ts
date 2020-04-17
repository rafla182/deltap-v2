import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContaService } from '../../../core/services/conta.service';
import { EmpresasService } from '../../../core/services/empresas/empresas.service';
import { Empresa } from '../../../core/models/empresa';
import { SimularAcessoService } from '../../../core/services/usuarios/simular-acesso.service';
import { LojasService } from '../../../core/services/lojas/lojas.service';
import { Loja } from '../../../core/models/loja';
import { TokenService } from '../../../core/services/usuarios/token.service';
import { UsuarioService } from '../../../core/services/usuarios/usuario.service';

@Component({
    selector: 'app-simular-acesso',
    templateUrl: 'simular-acesso.component.html'
})
export class SimularAcessoComponent implements OnInit {

    empresas: Empresa[] = new Array<Empresa>();
    lojaSelecionada: Loja = new Loja();
    empresaSelecionada: Empresa = new Empresa();
    lojas: Loja[] = new Array<Loja>();
    model: any = [];
    constructor(
        private activatedRoute: ActivatedRoute,
        private empresasService: EmpresasService,
        private simularAcessoService: SimularAcessoService,
        private toastr: ToastrService,
        private router: Router,
        private tokenService: TokenService,
        private userService: UsuarioService,
        private lojasService: LojasService
    ) { }

    ngOnInit(): void {
        this.empresaSelecionada.id = 0;
        this.lojaSelecionada.id = 0;

        this.model = this.activatedRoute.snapshot.data['empresa'];
        this.carregarEmpresas();
    }

    simular() {
        this.simularAcessoService.simular(this.lojaSelecionada.id).subscribe(sucesso => {
            console.log(sucesso);
            this.createToken(sucesso.token, sucesso.usuario);
            this.router.navigateByUrl(`/dashboard`);
        });
    }

    createToken(token, user) {
        this.tokenService.salvar(token);
        this.userService.salvar(user);
    }

    carregarEmpresas() {
        this.empresasService.carregar().subscribe(
            sucesso => {
                this.empresas = sucesso.resultado;
                if (this.model) {
                    if (this.model.loja) {
                        if (this.model.loja.id > 0) {
                            this.empresaSelecionada.id = this.model.loja.empresa.id;
                            this.carregarLojas(this.empresaSelecionada.id);
                        }
                    }
                }
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

    selecionarEmpresa(event) {
        const value = event.target.value;
        this.lojaSelecionada.id = 0;
        this.carregarLojas(value);
    }

    carregarLojas(value) {
        this.lojasService.carregarPorEmpresa(value).subscribe(
            sucesso => {
                this.lojas = sucesso.resultado;
                if (this.model) {
                    if (this.model.loja) {
                        if (this.model.loja.id > 0) {
                            this.lojaSelecionada.id = this.model.loja.id;
                        }
                    }
                }
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

}

import { Component } from '@angular/core';
import { Usuario } from '../../../../core/services/usuarios/usuario';
import { UsuarioService } from '../../../../core/services/usuarios/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { VendedoresService } from '../../../../core/services/vendedores/vendedores.service';

@Component({
    selector: 'app-vendedores-cadastrar',
    templateUrl: 'vendedores-cadastrar.component.html'
})
export class VendedoresCadastrarComponent {

    model: any = {};
    usuario: Usuario;
    lojas: any[];
    loja: string;
    lojaSelecionada: any = {};

    constructor(
        private userSerivce: UsuarioService,
        private vendedorService: VendedoresService,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.usuario = this.userSerivce.carregar();
        this.lojas = this.usuario.lojas;
        this.lojaSelecionada = this.lojas[0];

        if (this.activatedRoute.snapshot.data['vendedor']) {
            this.model = this.activatedRoute.snapshot.data['vendedor'];
        } else {
            this.model = {
                loja: {
                    id: this.lojas[0].id,
                    nome: this.lojas[0].nome
                },
                nome: ''
            };
        }
    }

    salvar() {
        this.model.loja = this.lojaSelecionada;
        if (this.model.id > 0) {
            this.vendedorService.editar(this.model).subscribe(
                sucesso => {
                    this.toastr.success('Usuário editado com sucesso.');
                    this.router.navigateByUrl(`/vendedores`);
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        } else {
            this.vendedorService.inserir(this.model).subscribe(
                sucesso => {
                    this.toastr.success('Usuário cadastrado com sucesso.');
                    this.router.navigateByUrl(`/vendedores`);
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        }
    }

    selecionarLoja(value) {

    }
}

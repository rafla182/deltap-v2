import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from '../../../../core/services/empresas/empresas.service';
import { Empresa } from '../../../../core/models/empresa';
import { LojasService } from '../../../../core/services/lojas/lojas.service';
import { Loja } from '../../../../core/models/loja';
import { ContaService } from '../../../../core/services/conta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-usuarios-cadastrar',
    templateUrl: 'usuarios-cadastrar.component.html'
})
export class UsuariosCadastrarComponent {

    model: any = {};
    empresas: Empresa[] = new Array<Empresa>();
    empresaSelecionada: Empresa = new Empresa();
    lojas: Loja[] = new Array<Loja>();
    dropdownList = [] = new Array<any>();
    selectedItems = [] = new Array<any>();
    dropdownSettings = {};

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private empresasService: EmpresasService,
        private contaService: ContaService,
        private activatedRoute: ActivatedRoute,
        private lojasService: LojasService,
    ) { }

    ngOnInit(): void {

        this.empresaSelecionada.id = 0;
        if (this.activatedRoute.snapshot.data['usuario']) {
            this.model = this.activatedRoute.snapshot.data['usuario'].resultado;
        }

        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'nome',
            selectAllText: 'Selecionar todas',
            unSelectAllText: 'Limpar',
            itemsShowLimit: 4,
            allowSearchFilter: false,
            noDataAvailablePlaceholderText: 'Nenhuma loja selecionada.'
        };
        this.carregarEmpresas();
    }

    carregarEmpresas() {
        this.empresasService.carregar().subscribe(
            sucesso => {
                this.empresas = sucesso.resultado;
                if (this.model.lojas.length > 0) {
                    this.empresaSelecionada.id = this.model.lojas[0].empresa.id;
                    this.carregarLojas(this.empresaSelecionada.id);
                }
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

    selecionarEmpresa(event) {
        const value = event.target.value;
        this.carregarLojas(value);
    }

    carregarLojas(value) {
        this.selectedItems = [];
        this.lojasService.carregarPorEmpresa(value).subscribe(
            sucesso => {
                this.lojas = sucesso.resultado;
                this.dropdownList = this.lojas.map(p => {
                    return {
                        id: p.id,
                        nome: p.nome
                    };
                });

                if (this.model.lojas.length > 0) {
                    this.selectedItems = this.model.lojas.map(p => {
                        return {
                            id: p.id,
                            nome: p.nome
                        };
                    });
                }
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

    salvar() {
        this.selectedItems.forEach(element => {
            if (!(this.model.lojas.find(p => p.id === element.id))) {
                this.model.lojas.push(element);
            }
        });

        if (this.model.lojas.length > 0) {
            if (this.model.id > 0) {
                this.contaService.editar(this.model).subscribe(
                    sucesso => {
                        this.toastr.success('Usuário editado com sucesso.');
                        this.router.navigateByUrl(`/usuarios`);
                    },
                    erro => {
                        erro.forEach(e => this.toastr.error(e.message));
                    });
            } else {
                this.contaService.inserir(this.model).subscribe(
                    sucesso => {
                        this.toastr.success('Usuário cadastrado com sucesso.');
                        this.router.navigateByUrl(`/usuarios`);
                    },
                    erro => {
                        erro.forEach(e => this.toastr.error(e.message));
                    });
            }
        } else {
            this.toastr.error('Selecione uma loja.');
        }
    }

    limpar() {
        this.model = {};
        this.dropdownList = [];
        this.selectedItems = [];
    }

    onItemSelect(item: any) {
        this.selectedItems.push(item);
    }

    onSelectAll(items: any) {
        this.selectedItems = [];
        items.forEach(element => {
            this.onItemSelect(element);
        });

    }
}

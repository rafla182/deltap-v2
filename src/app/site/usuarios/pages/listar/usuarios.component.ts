import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from '../../../../core/models/pagination';
import { ContaService } from '../../../../core/services/conta.service';
import { ToastrService } from 'ngx-toastr';
import { EmpresasService } from '../../../../core/services/empresas/empresas.service';
import { LojasService } from '../../../../core/services/lojas/lojas.service';
import { Empresa } from '../../../../core/models/empresa';
import { Loja } from '../../../../core/models/loja';

@Component({
    selector: 'app-usuarios',
    templateUrl: 'usuarios.component.html'
})
export class UsuariosComponent {

    model: any = [];
    pagination: Pagination = new Pagination();
    modelCadastrar: any = {};
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

        this.model.usuarios = this.activatedRoute.snapshot.data['usuarios'].resultado;
        this.pagination.total = this.model.usuarios.lenght;
        this.pagination.page = 1;

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
    goToPage(event) {
        this.pagination.page = event.page;
    }

    excluir(id: number) {
        this.contaService.excluir(id).subscribe(
            sucesso => {
                this.toastr.success('Exclusão realizada com sucesso.');
                const deletar = this.model.usuarios.find(p => p.id === id);
                const index = this.model.usuarios.indexOf(deletar, 0);
                if (index > -1) {
                    this.model.usuarios.splice(index, 1);
                }
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }

    visualizar(id: number) {

        const usuario = this.model.usuarios.find(p => p.id === id);
        this.empresaSelecionada.id = usuario.lojas[0].empresa.id;
        
        this.carregarLojas(this.empresaSelecionada.id);
        
        this.selectedItems = usuario.lojas;
        this.modelCadastrar = usuario;
    }

    permissoes(id: number) {
        this.router.navigateByUrl(`/usuarios/permissoes/` + id);
    }

    carregarEmpresas() {
        this.empresasService.carregar().subscribe(
            sucesso => {
                this.empresas = sucesso;
                this.empresaSelecionada.id = 0;
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
        if (value !== 0) {
            this.selectedItems = [];
            this.lojasService.carregarPorEmpresa(value).subscribe(
                sucesso => {
                    this.lojas = sucesso;
                    this.dropdownList = this.lojas.map(p => {
                        return {
                            id: p.id,
                            nome: p.nome
                        };
                    });
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        } else {
            this.selectedItems = [];
         }
    }

    salvar() {
        this.modelCadastrar.lojas = [];
        this.selectedItems.forEach(element => {
            if (!(this.modelCadastrar.lojas.find(p => p.id === element.id))) {
                this.modelCadastrar.lojas.push(element);
            }
        });

        if (this.modelCadastrar.lojas.length > 0) {
            if (this.modelCadastrar.id > 0) {
                this.contaService.editar(this.modelCadastrar).subscribe(
                    sucesso => {
                        this.toastr.success('Usuário editado com sucesso.');
                        this.limpar();
                    },
                    erro => {
                        erro.forEach(e => this.toastr.error(e.message));
                    });
            } else {
                this.contaService.inserir(this.modelCadastrar).subscribe(
                    sucesso => {
                        this.toastr.success('Usuário cadastrado com sucesso.');
                        this.limpar();
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
        this.modelCadastrar = {};
        this.empresaSelecionada.id = 0;
        this.dropdownList = [];
        this.selectedItems = [];
        this.list();
    }

    list() {
        this.contaService.listar().subscribe(sucesso => {
            this.model.usuarios = sucesso.resultado;
        });
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


    ativarDesativar(id: number) {
        this.contaService.ativaDesativa(id).subscribe(
            sucesso => {
                this.toastr.success('Modificação realizada com sucesso.');
                this.limpar();
            },
            erro => {
                erro.forEach(e => this.toastr.error(e.message));
            });
    }
}

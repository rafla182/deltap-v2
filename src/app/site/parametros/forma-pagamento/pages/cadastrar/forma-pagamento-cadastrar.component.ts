import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormaPagamentoService } from '../../../../../core/services/forma-pagamento/forma-pagamento.service';

@Component({
    selector: 'app-forma-pgamento-cadastrar',
    templateUrl: 'forma-pagamento-cadastrar.component.html'
})
export class FormaPagamentoCadastrarComponent {

    model: any = {};
    constructor(
        private formaPagamentoService: FormaPagamentoService,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        if (this.activatedRoute.snapshot.data['formaPagamento']) {
            this.model = this.activatedRoute.snapshot.data['formaPagamento'];
        }
    }

    salvar() {

        if (this.model.id > 0) {
            this.formaPagamentoService.editar(this.model).subscribe(
                sucesso => {
                    this.toastr.success('Forma de pagamento editado com sucesso.');
                    this.router.navigateByUrl(`/parametros/forma-pagamento`);
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        } else {
            this.formaPagamentoService.inserir(this.model).subscribe(
                sucesso => {
                    this.toastr.success('Forma de pagamento cadastrado com sucesso.');
                    this.router.navigateByUrl(`/parametros/forma-pagamento`);
                },
                erro => {
                    erro.forEach(e => this.toastr.error(e.message));
                });
        }
    }

}

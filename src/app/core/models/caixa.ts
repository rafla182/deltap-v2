import { Loja } from './loja';
import { Vendedor } from './vendedor';
import { Usuario } from '../services/usuarios/usuario';
import { FormaPagamento } from './forma-pagamento';

// tslint:disable-next-line:one-line
export class Movimentacao {
    usuario: Usuario;
    loja: Loja;
    vendedor: Vendedor;
    valor: number;
    formaPagamento: FormaPagamento;
    data: any;
    id: number;
}

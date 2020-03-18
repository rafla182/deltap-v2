import { Loja } from '../../models/loja';

export class Usuario {
    public id: number;
    public nome: string;
    public email: string;
    public avatar: string;
    public administrador: boolean;
    public lojas: Loja[];
    public senha: string;
}

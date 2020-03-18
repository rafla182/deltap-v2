import { Injectable } from '@angular/core';
import { HttpService } from './http/http.service';

@Injectable()
export class DashboardService {

    private vendaDiariaPorLojaUrl = 'dashboard/vendasdiariasporLoja/';
    private vendasPorMesUrl = 'dashboard/vendaspormes/';
    private vendasPorVendedorUrl = 'dashboard/vendasporvendedor/';
    private qtdVendasPorMesLojaUrl = 'dashboard/quantidadevendasporloja/';
    private rankingVendasMesVendedorUrl = 'dashboard/rankingvendasmesporvendedor/';
    private acumuladoVendaPorPeriodoUrl = 'dashboard/acumuladovendaporperiodo/';
    private acumuladoValorVendaPorPeriodoUrl = 'dashboard/acumuladovalorvendaporperiodo/';
    private comparativoVendasPorDiaPorLojaUrl = 'dashboard/comparativovendaspordiaporloja/';
    private comparativoVendasPorMesPorLojaUrl = 'dashboard/comparativovendaspormesporloja/';
    private rankingVendasMesVendedorPorLojaUrl = 'dashboard/rankingvendasvendedorpormesloja/';
    private historicovendasporvendedorUrl = 'dashboard/historicovendasporvendedor/';
    private acumuladoValorVendaPorVendedorUrl = 'dashboard/acumuladovalorvendasporvendedor/';
    private numeroQtdVendasPorMesUrl = 'dashboard/numeroqtdvendaspormes/';
    private comparativoNumeroVendasPorLojaUrl = 'dashboard/comparativonumerovendasporloja/';
    private comparativoTicketMedioVendasPorLojaUrl = 'dashboard/comparativoticketmediovendasporloja/';
    private comparativoTicketMedioVendasPorFuncionarioUrl = 'dashboard/comparativoticketmediovendasporfuncionario/';

    constructor(private httpService: HttpService) {
    }

    vendasDiariasPorLoja(lojaID, mes) {
        return this.httpService.get(`${this.vendaDiariaPorLojaUrl}${mes}/${lojaID}`);
    }

    vendasPorMes(lojaID) {
        return this.httpService.get(`${this.vendasPorMesUrl}${lojaID}`);
    }

    vendasPorVendedor(lojaID) {
        return this.httpService.get(`${this.vendasPorVendedorUrl}${lojaID}`);
    }

    qtdVendasPorMesLoja(lojaID) {
        return this.httpService.get(`${this.qtdVendasPorMesLojaUrl}${lojaID}`);
    }

    rankingVendasMesVendedor(lojaID) {
        return this.httpService.get(`${this.rankingVendasMesVendedorUrl}${lojaID}`);
    }

    acumuladoVendaPorPeriodo(lojaID) {
        return this.httpService.get(`${this.acumuladoVendaPorPeriodoUrl}${lojaID}`);
    }

    acumuladoValorVendaPorPeriodo(lojaID) {
        return this.httpService.get(`${this.acumuladoValorVendaPorPeriodoUrl}${lojaID}`);
    }

    comparativoVendasPorDiaPorLoja(lojaID) {
        return this.httpService.get(`${this.comparativoVendasPorDiaPorLojaUrl}${lojaID}`);
    }

    comparativoVendasPorMesPorLoja(lojaID) {
        return this.httpService.get(`${this.comparativoVendasPorMesPorLojaUrl}${lojaID}`);
    }

    rankingVendasMesVendedorPorLoja(mes, lojaID) {
        return this.httpService.get(`${this.rankingVendasMesVendedorPorLojaUrl}${mes}/${lojaID}`);
    }

    historicoVendaPorVendedor(vendedorId, lojaID) {
        return this.httpService.get(`${this.historicovendasporvendedorUrl}${vendedorId}/${lojaID}`);
    }

    acumuladoValorVendaPorVendedor(lojaID) {
        return this.httpService.get(`${this.acumuladoValorVendaPorVendedorUrl}${lojaID}`);
    }

    numeroQtdVendasPorMes(lojaID) {
        return this.httpService.get(`${this.numeroQtdVendasPorMesUrl}${lojaID}`);
    }

    comparativoNumeroVendasPorLoja(lojaID) {
        return this.httpService.get(`${this.comparativoNumeroVendasPorLojaUrl}${lojaID}`);
    }

    comparativoTicketMedioVendasPorLoja(lojaID) {
        return this.httpService.get(`${this.comparativoTicketMedioVendasPorLojaUrl}${lojaID}`);
    }

    comparativoTicketMedioVendasPorFuncionario(lojaID) {
        return this.httpService.get(`${this.comparativoTicketMedioVendasPorFuncionarioUrl}${lojaID}`);
    }
}

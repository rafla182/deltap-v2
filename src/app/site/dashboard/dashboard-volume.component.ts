import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DashboardService } from '../../core/services/dashboard.services';
import { Color, BaseChartDirective } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as moment from 'moment/moment';
import { UsuarioService } from '../../core/services/usuarios/usuario.service';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { getRandomString } from 'selenium-webdriver/safari';
import { VendedoresService } from '../../core/services/vendedores/vendedores.service';

@Component({
    templateUrl: 'dashboard-volume.component.html',
    styleUrls: ['dashboard.component.sass','dashboard-volume.component.sass']

})
export class DashboardVolumeComponent implements OnInit {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    numeroQtdVendasPorMesData: ChartDataSets[] = [];
    numeroQtdVendasPorMesLabels = [];
    numeroQtdVendasPorMesColors: Array<any> = [];
    numeroQtdVendasPorMesLegenda = false;
    numeroQtdVendasPorMesTipo = 'bar';
    numeroQtdVendasPorMesOptions: (ChartOptions) = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // steps: 20,
                    // stepValue: 20,
                    min: 0
                }
            }],
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                }
            }]
        },
        elements: {
            line: {
                borderWidth: 2,
                tension: 0
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
        plugins: {
            labels: {
                render: 'value',
                precision: 2,
                showZero: false,
                fontSize: 12,
                 fontColor: '#000', fontStyle: 'bold',
                fontFamily: "Tahoma",
                position: 'default',
                showActualPercentages: true,
                outsidePadding: 6,
                textMargin: 6
            }
        }
    };
    numeroQtdVendasPorMesAcumulado: any;
    numeroQtdVendasPorMesMedia: any;
    
    comparativoTicketVendasPorFuncionarioData: ChartDataSets[] = [];
    comparativoTicketVendasPorFuncionarioLabels = [];
    comparativoTicketVendasPorFuncionarioColors: Array<any> = [];
    comparativoTicketVendasPorFuncionarioLegenda = true;
    comparativoTicketVendasPorFuncionarioOptions: (ChartOptions) = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips,
            // spanGaps: true,
            intersect: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
                // labelColor: function (tooltipItem, chart) {
                //     return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
                // },
                label: function (t, d) {
                    const xLabel = d.datasets[t.datasetIndex].label;
                    const yLabel = t.yLabel >= 1000 ? 'R$' + t.yLabel.toString().split('.').join(',') : 'R$' + t.yLabel;
                    return xLabel + ': ' + yLabel;
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'bottom',
            // label: {
            //     boxWidth: 2,
            //     padding: 0,
            //     usePointStyle: true
            // }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                }
            }],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        // steps: 20,
                        // stepValue: 20,
                        min: 0,
                        callback: function (value, index, values) {
                            if (value >= 1000) {
                                return 'R$' + value.toString().split('.').join(',');
                            } else {
                                return 'R$' + value;
                            }
                        }
                    }
                }
            ]
        },
        plugins: [ChartAnnotation],
        elements: {
            line: {
                borderWidth: 2,
                tension: 0,
            },
            point: {
                radius: 2,
                hitRadius: 5,
                hoverRadius: 4,
            }
        }
    };
    comparativoTicketVendasPorFuncionarioTipo = 'line';
    comparativoTicketVendasPorFuncionarioDados: [];

    usuario: any;
    mes: any;
    month: any;

    mesSelectVendasMesPorVendedor: any;
    vendedorSelecionado: any = {};
    vendedores: Array<any> = [];
    lojas: Array<any> = [];
    lojaSelecionada: any = {};
    metaVendedor: 0;
    metaLoja: 0;
    constructor(
        private dashboardService: DashboardService,
        private usuarioService: UsuarioService,
        private vendedorService: VendedoresService
    ) { }

    ngOnInit() {

        this.usuario = this.usuarioService.carregar();
        this.lojas = this.usuario.lojas;
        console.log(this.lojas);
        this.lojaSelecionada = this.lojas[0];
        this.metaLoja = this.lojaSelecionada.metaMensal;

        const d = new Date();
        this.month = new Array();
        this.month[0] = 'Janeiro';
        this.month[1] = 'Fevereiro';
        this.month[2] = 'Março';
        this.month[3] = 'Abril';
        this.month[4] = 'Maio';
        this.month[5] = 'Junho';
        this.month[6] = 'Julho';
        this.month[7] = 'Agosto';
        this.month[8] = 'Setembro';
        this.month[9] = 'Outubro';
        this.month[10] = 'Novembro';
        this.month[11] = 'Dezembro';
        this.mes = d.getMonth() + 1;
        this.mesSelectVendasMesPorVendedor = d.getMonth() + 1;

        this.carregarDashboard();
    }

    carregarDashboard() {
        this.listarNumeroQtdVendasPorMes();
        this.listarComparativoTicketMedioVendasPorFuncionario();
    }


    listarNumeroQtdVendasPorMes() {
        this.dashboardService.numeroQtdVendasPorMes(this.lojaSelecionada.id).subscribe(response => {

            this.numeroQtdVendasPorMesLabels = this.meses.slice(0, this.mes);
            const colors = [];

            this.numeroQtdVendasPorMesData.forEach(element => {
                const color = this.getRandomColor(colors);
                colors.push(color);
            });

            const data = [];
            this.meses.forEach(mes => {
                const x = response.resultado.find(p => p.mes === mes);
                if (x) {
                    data.push(x.quantidade);
                } else {
                    data.push(0);
                }
            });

            this.numeroQtdVendasPorMesData.push(
                {
                    data: data,
                    label: ''
                });
            console.log(this.numeroQtdVendasPorMesData);
            this.numeroQtdVendasPorMesLabels.forEach(p => {
                const color = this.getRandomColor(colors);
                colors.push(color);
            });

            this.numeroQtdVendasPorMesColors.push({
                backgroundColor: colors
            });

            this.numeroQtdVendasPorMesAcumulado = response.resultado.map(p => parseInt(p.quantidade)).reduce((sum, current) => sum + current);
            this.numeroQtdVendasPorMesMedia = (response.resultado.map(p => parseInt(p.quantidade)).reduce((sum, current) => sum + current)
                / response.resultado.map(p => parseInt(p.quantidade)).length).toFixed(2);
        });
    }

    listarComparativoTicketMedioVendasPorFuncionario() {
        this.dashboardService.comparativoTicketMedioVendasPorFuncionario(this.lojaSelecionada.empresa.id).subscribe(response => {
            this.comparativoTicketVendasPorFuncionarioLabels = this.meses.slice(0, this.mes);
            const colors = [];
            response.resultado.map(p => p.vendedor).filter((v, i, a) => a.indexOf(v) === i)
                .forEach(vendedor => {

                    const valoresVendedor = response.resultado.filter(p => p.vendedor === vendedor);

                    const data = [];
                    this.meses.forEach(mes => {
                        const x = valoresVendedor.find(p => p.mes === mes);
                        if (x) {
                            data.push(x.ticketMedio);
                        } else {
                            data.push(0);
                        }
                        colors.push(this.getRandomColor(colors));
                    });

                    this.comparativoTicketVendasPorFuncionarioData.push(
                        {
                            data: data,
                            label: vendedor
                        });

                    const color = this.getRandomColor(colors);
                    this.comparativoTicketVendasPorFuncionarioColors.push({
                        backgroundColor: color,
                        borderColor: color,
                        pointBackgroundColor: color,
                        labelColor: color,
                        pointBorderColor: color,
                        fill: false
                    });

                });
        });
    }

    getRandomColor(coresSelecionadas: any) {
        const collors = ['#3B2080',
        '#B294FF',
        '#7640FF',
        '#7B7785',
        '#6034CC',
        '#590080',
        '#CC54FF',
        '#B300FF',
        '#806200',
        '#FFD754',
        '#FFC400',
        '#857B5A',
        '#CC9C00',
        '#005380',
        '#54C3FF',
        '#00A6FF',
        '#5A7685',
        '#0086CC'];
        if (coresSelecionadas.length <= 0) {
            return  collors[Math.floor(Math.random() * collors.length)];
        } else {
            let random = collors[Math.floor(Math.random() * collors.length)];
            if (coresSelecionadas.some(c => c === random)) {
                random = collors[Math.floor(Math.random() * collors.length)];
            }

            return random;
        }
    }

    selecionarMesVendasMesPorVendedor(event) {
        this.mesSelectVendasMesPorVendedor = event.target.value;
    }


    selecionarLoja(event) {
        this.lojaSelecionada = this.lojas.find(p => (p.id === parseInt(event.target.value)) || (p.id === event.target.value));
        this.numeroQtdVendasPorMesData = [];
        this.comparativoTicketVendasPorFuncionarioData = [];
        this.carregarDashboard();
    }
}



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
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.sass']

})
export class DashboardComponent implements OnInit {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    mesSelect: any;
    meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    vendaDiariaPorLojaData: ChartDataSets[] = [];
    vendaDiariaPorLojaLegenda = false;
    vendaDiariaPorLojaLabels = [];
    vendaDiariaPorLojaColors: Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: '#6610f2',
            pointBackgroundColor: '#6610f2',
            labelColor: '#6610f2',
            pointBorderColor: '#6610f2'
        }
    ];
    vendaDiariaPorLojaTipo = 'line';
    vendaDiariaPorLojaOptions: (ChartOptions) = {

        tooltips: {
            enabled: false,
            custom: CustomTooltips,
            // spanGaps: true,
            intersect: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
                labelColor: function (tooltipItem, chart) {
                    return {
                        borderColor: 'rgb(255, 0, 0)',
                        backgroundColor: 'rgb(255, 0, 0)',
                    };
                },
                label: function (t, d) {
                    const xLabel = d.datasets[t.datasetIndex].label;
                    const yLabel = t.yLabel >= 1000 ? 'R$' + t.yLabel.toString().split('.').join(',') : 'R$' + t.yLabel;
                    return xLabel + ': ' + yLabel;
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                }
            }],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 20,
                        stepSize: 20,
                        callback: function (value, index, values) {
                            if (parseInt(value) >= 1000) {
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
    vendasDiariaAcumulado: number;
    vendasDiariasMedia;

    vendasPorMesData: ChartDataSets[] = [];
    vendasPorMesLabels = [];
    vendasPorMesColors: Array<any> = [
        { // brandDanger
            backgroundColor: '#f8cb00',
            borderColor: '#f8cb00',
            pointHoverBackgroundColor: '#fff'
        }
    ];
    vendasPorMesLegenda = false;
    vendasMesTipo = 'bar';
    vendasMesOptions: (ChartOptions) = {
        layout: {
            padding: {
                top: 20
            }
        },
        tooltips: {
            enabled: false,
            custom: CustomTooltips,
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
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // steps: 5,
                    // stepValue: 5,
                    min: 0,
                    callback: function (value, index, values) {
                        if (parseInt(value) >= 1000) {
                            return 'R$' + value.toString().split('.').join(',');
                        } else {
                            return 'R$' + value;
                        }
                    }
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
                render: function (args) {
                    return 'R$' + args.value;
                },
                precision: 2,
                showZero: false,
                fontSize: 12,
                fontColor: '#000', fontStyle: 'bold',
                fontFamily: "Tahoma",
                position: 'outside',
                showActualPercentages: true,
                outsidePadding: 6,
                textMargin: 6
            }
        }
    };
    vendasMesAcumulado: number;
    vendasMesMedia;

    usuario: any;
    mes: any;
    month: any;
    mesSelectVendasMesPorVendedor: any;
    lojas: Array<any> = [];
    lojaSelecionada: any = {};
    metaVendedor: 0;
    metaLoja: 0;
    constructor(
        private dashboardService: DashboardService,
        private usuarioService: UsuarioService
    ) { }

    ngOnInit() {
        console.log("aqui");
        this.usuario = this.usuarioService.carregar();
        this.lojas = this.usuario.lojas;

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
        this.mesSelect = d.getMonth() + 1;

        // this.vendasMesOptions.annotation = {
        //     annotations: [
        //         {
        //             type: 'box',
        //             drawTime: 'afterDatasetsDraw',
        //             yScaleID: 'y-axis-0',
        //             yMin: 0,
        //             yMax: this.metaLoja,
        //             backgroundColor: 'rgba(255,0,0,0.1)',
        //             borderWidth: 1,
        //             borderColor: '#ff1a1a',
        //             //value: 5000,
        //             id: 'a-line-1',
        //             mode: 'horizontal',
        //             scaleID: 'y-axis-0',
        //             //drawTime: 'afterDatasetsDraw',
        //             // type: 'line',
        //             //borderColor: 'red',
        //             //borderWidth: 2,
        //             label: {
        //                 backgroundColor: 'rgba(255,0,0,0.1)',
        //                 fontFamily: "sans-serif",
        //                 fontSize: 12,
        //                 fontStyle: "bold",
        //                 fontColor: "#fff",
        //                 xPadding: 6,
        //                 yPadding: 6,
        //                 cornerRadius: 6,
        //                 position: "center",
        //                 xAdjust: 0,
        //                 yAdjust: 0,
        //                 enabled: true,
        //                 content: this.metaLoja
        //             }
        //         }
        //     ],
        //     drawTime: 'afterDatasetsDraw'
        // };

        this.carregarDashboard();
    }

    carregarDashboard() {
        this.listarVendaDiariaPorLoja();
        this.listarVendasPorMes();

    }

    listarVendaDiariaPorLoja() {

        this.dashboardService.vendasDiariasPorLoja(this.lojaSelecionada.id, this.mesSelect).subscribe(response => {

            this.vendaDiariaPorLojaLabels = response.resultado.map(p => p.data);
            this.vendaDiariaPorLojaData.push(
                {
                    data: response.resultado.map(p => p.valor),
                    label: ''
                });
            this.vendasDiariaAcumulado = response.resultado.map(p => p.valor).reduce((sum, current) => sum + current);
            this.vendasDiariasMedia = (response.resultado.map(p => p.valor).reduce((sum, current) => sum + current)
                / response.resultado.map(p => p.valor).length).toFixed(2);
        });
    }

    selectMes(event) {
        this.mesSelect = event.target.value;
        this.vendaDiariaPorLojaData = [];
        this.listarVendaDiariaPorLoja();
    }

    listarVendasPorMes() {

        this.dashboardService.vendasPorMes(this.lojaSelecionada.id).subscribe(response => {
            this.vendasPorMesLabels = this.meses.slice(0, this.mes);

            const data = [];
            this.meses.forEach(mes => {
                const x = response.resultado.find(p => p.mes === mes);
                if (x) {
                    data.push(x.valor);
                } else {
                    data.push(0);
                }
            });

            this.vendasPorMesData.push(
                {
                    data: data,
                    label: ''
                });

            this.vendasMesAcumulado = response.resultado.map(p => p.valor).reduce((sum, current) => sum + current);
            console.log(this.vendasMesAcumulado);
            this.vendasMesMedia = (response.resultado.map(p => p.valor).reduce((sum, current) => sum + current)
                / response.resultado.map(p => p.valor).length).toFixed(2);
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
            return collors[Math.floor(Math.random() * collors.length)];
        } else {
            let random = collors[Math.floor(Math.random() * collors.length)];
            if (coresSelecionadas.some(c => c === random)) {
                random = collors[Math.floor(Math.random() * collors.length)];
            }

            return random;
        }
    }

    selecionarLoja(event) {
        this.lojaSelecionada = this.lojas.find(p => (p.id === parseInt(event.target.value)) || (p.id === event.target.value));
        this.metaLoja = this.lojaSelecionada.metaMensal > 0 ? this.lojaSelecionada.metaMensal : 0;
        this.vendaDiariaPorLojaData = [];
        this.vendasPorMesData = [];
        this.carregarDashboard();
    }
}



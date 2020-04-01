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
    templateUrl: 'dashboard-ranking.component.html',
    styleUrls: ['dashboard.component.sass','dashboard-ranking.component.sass']

})
export class DashboardRankingComponent implements OnInit {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    vendaDiariaPorLojaTipo = 'line';

    rankingVendasMesVendedorData: ChartDataSets[] = [];
    rankingVendasMesVendedorLabels = [];
    rankingVendasMesVendedorColors: Array<any> = [];
    rankingVendasMesVendedorLegenda = true;
    rankingVendasMesVendedorOptions: (ChartOptions ) = {
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

    vendasPorMesPorVendedorData: ChartDataSets[] = [];
    vendasPorMesPorVendedorLabels = [];
    vendasPorMesPorVendedorColors = [];
    vendasPorMesPorVendedorLegenda = false;
    vendasMesPorVendedorTipo = 'bar';
    vendasMesPorVendedorOptions: (ChartOptions) = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // steps: 20,
                    // stepValue: 20,
                    max: 10000,
                    min: 0,
                    callback: function (value, index, values) {
                        if (value >= 1000) {
                            return 'R$' + value.toString().split('.').join(',');
                        } else {
                            return 'R$' + value;
                        }
                    }
                }
            }],
            xAxes: [{

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
                position: 'default',
                showActualPercentages: true,
                outsidePadding: 6,
                textMargin: 6
            }
        }
    };

    historicoVendaPorVendedorData: ChartDataSets[] = [];
    historicoVendaPorVendedorLabels = [];
    historicoVendaPorVendedorColors = [
        {
            backgroundColor: '#f8cb00',
            borderColor: '#f8cb00',
            pointHoverBackgroundColor: '#fff'
        }
    ];
    historicoVendaPorVendedorLegenda = false;
    historicoVendaPorVendedorTipo = 'bar';
    historicoVendaPorVendedorOptions: (ChartOptions) = {
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
                        if (value >= 1000) {
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
    historicoVendaAcumulado: any;
    historicoVendaMedia: any;

    acumuladoValorVendasPorFuncionarioData: ChartDataSets[] = [];
    acumuladoValorVendasPorFuncionarioLabels = [];
    acumuladoValorVendasPorFuncionarioColors: Array<any> = [];
    acumuladoValorVendasPorFuncionarioLegenda = false;
    acumuladoValorVendasPorFuncionarioTipo = 'pie';
    acumuladoValorVendasPorFuncionarioOptions: (ChartOptions) = {
        legend: {
            position: 'bottom',
            // label: {
            //     boxWidth: 5,
            //     padding: 0,
            //     usePointStyle: true

            // }
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            enabled: true,
            callbacks: {
                //label: function (tooltipItem, data) {
                    // const allData = data.datasets[tooltipItem.datasetIndex].data;
                    // const tooltipLabel = data.labels[tooltipItem.index];
                    // const tooltipData = allData[tooltipItem.index];
                    // let total = 0.0;
                    // for (let i in allData) {
                    //     total += parseFloat(allData[i]);
                    // }
                    // const tooltipPercentage = (parseFloat(tooltipData) / total) * 100;
                    // return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage.toFixed(2) + '%)';
                //}
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
    acumuladoValorVendasPorFuncionarioDados = [];

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

        this.carregarVendedores();
        this.carregarDashboard();
    }

    carregarDashboard() {
        this.listarRankingVendasMesVendedor();
        this.listarRankingVendasMesVendedorPorLoja();
        this.listarAcumuladoValorVendaPorVendedor();
    }

    listarRankingVendasMesVendedor() {
        this.dashboardService.rankingVendasMesVendedor(this.lojaSelecionada.id).subscribe(response => {
            this.rankingVendasMesVendedorLabels = this.meses.slice(0, this.mes);;
            const colors = [];
            response.resultado.map(p => p.vendedor).filter((v, i, a) => a.indexOf(v) === i)
                .forEach(vendedor => {

                    const valoresVendedor = response.resultado.filter(p => p.vendedor === vendedor);

                    const data = [];
                    this.meses.forEach(mes => {
                        const x = valoresVendedor.find(p => p.mes === mes);
                        if (x) {
                            data.push(x.valor);
                        } else {
                            data.push(0);
                        }

                        colors.push(this.getRandomColor(colors));
                    });

                    this.rankingVendasMesVendedorData.push(
                        {
                            data: data,
                            label: vendedor
                        });

                    const color = this.getRandomColor(colors);
                    
                    this.rankingVendasMesVendedorColors.push({
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

    listarRankingVendasMesVendedorPorLoja() {

        this.dashboardService.rankingVendasMesVendedorPorLoja(this.mesSelectVendasMesPorVendedor,
            this.lojaSelecionada.id).subscribe(response => {

            this.vendasPorMesPorVendedorLabels = response.resultado.map(p => p.vendedor);
            const cores = [];

            this.vendasPorMesPorVendedorData.push(
                {
                    data: response.resultado.map(p => p.valor ? p.valor.toFixed(2) : 0),
                    label: ''
                });

            this.vendasPorMesPorVendedorLabels.forEach(p => {
                const cor = this.getRandomColor(cores);
                cores.push(cor);
            });

            this.vendasPorMesPorVendedorColors.push({
                backgroundColor: cores
            });
        });
    }

    listarHistoricoVendaPorVendedor() {
        this.dashboardService.historicoVendaPorVendedor(this.vendedorSelecionado.id, this.lojaSelecionada.id).subscribe(response => {


            // this.historicoVendaPorVendedorOptions.annotation = {
            //     annotations: [
            //         {
            //             type: 'box',
            //             drawTime: 'afterDatasetsDraw',
            //             yScaleID: 'y-axis-0',
            //             yMin: 0,
            //             yMax: this.metaVendedor,
            //             backgroundColor: 'rgba(255,0,0,0.1)',
            //             borderWidth: 1,
            //             borderColor: '#ff1a1a',
            //             id: 'a-line-1',
            //             mode: 'horizontal',
            //             scaleID: 'y-axis-0',
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

            this.historicoVendaPorVendedorLabels = this.meses.slice(0, this.mes);;
            const data = [];
            this.meses.forEach(mes => {
                const x = response.resultado.find(p => p.mes === mes);
                if (x) {
                    data.push(x.valor);
                } else {
                    data.push(0);
                }
            });

            this.historicoVendaPorVendedorData.push(
                {
                    data: data,
                    label: ''
                });
            
            this.historicoVendaAcumulado = response.resultado.map(p => p.valor).reduce((sum, current) => sum + current);
            this.historicoVendaMedia = (response.resultado.map(p => p.valor).reduce((sum, current) => sum + current)
                / response.resultado.map(p => p.valor).length).toFixed(2);
        });
    }

    listarAcumuladoValorVendaPorVendedor() {
        this.dashboardService.acumuladoValorVendaPorVendedor(this.lojaSelecionada.empresa.id).subscribe(response => {
            this.acumuladoValorVendasPorFuncionarioLabels = response.resultado.map(p => p.vendedor);


            this.acumuladoValorVendasPorFuncionarioData.push(
                {
                    data: response.resultado.map(p => p.valor ? p.valor.toFixed(2) : 0),
                    label: ''
                });
            const colors = [];
            this.acumuladoValorVendasPorFuncionarioLabels.forEach(p => {

                const color = this.getRandomColor(colors);
                const data = response.resultado.find(x => x.vendedor === p);

                this.acumuladoValorVendasPorFuncionarioDados.push({
                    valor: data.valor,
                    vendedor: data.vendedor,
                    color: color,
                    // porcentagem: (parseFloat(data.valor) * 100 /
                    //     (this.acumuladoValorVendasPorFuncionarioData[0].data
                    //     .reduce((sum, current) => parseFloat(sum) + parseFloat(current)))).toFixed(2)
                });

                colors.push(color);
            });

            this.acumuladoValorVendasPorFuncionarioColors.push({
                backgroundColor: colors
            });

            this.acumuladoValorVendasPorFuncionarioDados = this.acumuladoValorVendasPorFuncionarioDados.sort((a, b) => {
                return a.valor - b.valor;
            }).reverse();
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
        this.vendasPorMesPorVendedorData = [];
        this.vendasPorMesPorVendedorColors = [];
        this.listarRankingVendasMesVendedorPorLoja();
    }

    carregarVendedores() {
        this.vendedorService.carregar(this.usuario.lojas[0].id).subscribe(response => {
            this.vendedores = response.resultado;
            if (this.vendedores) {
                this.vendedorSelecionado.id = response.resultado[0].id;
                this.metaVendedor = this.vendedores.find(p => p.id === this.vendedorSelecionado.id).metaMensal;
            }


            this.listarHistoricoVendaPorVendedor();
        });
    }

    selecionarHistoricoVendaPorVendedor(event) {
        this.vendedorSelecionado.id = event.target.value;
        this.metaVendedor = this.vendedores.find(p => p.id === parseInt(event.target.value)).metaMensal;
        this.historicoVendaPorVendedorData = [];
        this.listarHistoricoVendaPorVendedor();
    }

    selecionarLoja(event) {
        this.lojaSelecionada = this.lojas.find(p => (p.id === parseInt(event.target.value)) || (p.id === event.target.value));

        this.rankingVendasMesVendedorData = [];
        this.historicoVendaPorVendedorData = [];
        this.vendasPorMesPorVendedorData = [];
        this.acumuladoValorVendasPorFuncionarioData = [];
        this.acumuladoValorVendasPorFuncionarioDados = [];
        this.listarHistoricoVendaPorVendedor();
        this.carregarDashboard();
    }
}



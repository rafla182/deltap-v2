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
    templateUrl: 'dashboard-comparativo.component.html',
    styleUrls: ['dashboard.component.sass', 'dashboard-comparativo.component.sass']

})
export class DashboardComparativoComponent implements OnInit {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    acumuladoValorVendasPorMesData: ChartDataSets[] = [];
    acumuladoValorVendasPorMesLabels = [];
    acumuladoValorVendasPorMesColors: Array<any> = [];
    acumuladoValorVendasPorMesLegenda = false;
    acumuladoValorVendasPorMesTipo = 'pie';
    acumuladoValorVendasOptions: (ChartOptions) = {
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
                // label: function (tooltipItem, data) {
                //    const allData = data.datasets[tooltipItem.datasetIndex].data;
                //     const tooltipLabel = data.labels[tooltipItem.index];
                //     const tooltipData = allData[tooltipItem.index];
                //     let total = 0.0;
                //     for (let i in allData) {
                //         total += parseFloat(allData[i]);
                //     }
                //     const tooltipPercentage = (parseFloat(tooltipData) / total) * 100;
                //     return tooltipLabel + ': R$' + tooltipData + ' (' + tooltipPercentage.toFixed(2) + '%)';
                // }
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
    acumuladoValorVendasPorMesDados = [];

    comparativoVendasPorDiaPorLojaData: ChartDataSets[] = [];
    comparativoVendasPorDiaPorLojaLabels = [];
    comparativoVendasPorDiaPorLojaColors: Array<any> = [];
    comparativoVendasPorDiaPorLojaLegenda = true;
    comparativoVendasPorDiaPorLojaOptions: (ChartOptions ) = {
        legend: {
            // label: {
            //     boxWidth: 5,
            //     padding: 0,
            //     usePointStyle: true,
            //     fontFamily: "Roboto, 'Segoe UI', Tahoma, sans-serif"
            // }
        },
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

    comparativoVendasPorMesPorLojaData: ChartDataSets[] = [];
    comparativoVendasPorMesPorLojaLabels = [];
    comparativoVendasPorMesPorLojaColors: Array<any> = [];
    comparativoVendasPorMesPorLojaLegenda = true;
    comparativoVendasPorMesPorLojaTipo = 'bar';
    comparativoVendasPorMesPorLojaOptions: (ChartOptions) = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips,
            intersect: true,
            // fontFamily: "Tahoma",
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
                    return 'R$' + args.value.toString().split('.').join(',');
                },
                precision: 2,
                showZero: false,
                fontSize: 10,
                fontStyle: 'bold',
                fontColor: '#000',
                fontFamily: "Tahoma",
                position: 'outside',
                showActualPercentages: true,
                outsidePadding: 6,
                textMargin: 6
            }
        }
    };

    acumuladoValorVendasPorFuncionarioData: ChartDataSets[] = [];
    acumuladoValorVendasPorFuncionarioLabels = [];
    acumuladoValorVendasPorFuncionarioColors: Array<any> = [];
    acumuladoValorVendasPorFuncionarioLegenda = false;
    acumuladoValorVendasPorFuncionarioTipo = 'pie';
    acumuladoValorVendasPorFuncionarioOptions: (ChartOptions ) = {
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
                // label: function (tooltipItem, data) {
                //     const allData = data.datasets[tooltipItem.datasetIndex].data;
                //     const tooltipLabel = data.labels[tooltipItem.index];
                //     const tooltipData = allData[tooltipItem.index];
                //     let total = 0.0;
                //     for (let i in allData) {
                //         total += parseFloat(allData[i]);
                //     }
                //     const tooltipPercentage = (parseFloat(tooltipData) / total) * 100;
                //     return tooltipLabel + ': R$' + tooltipData + ' (' + tooltipPercentage.toFixed(2) + '%)';
                // }
            }
        },
        plugins: {
            labels: {
                render: function (args) {
                    return 'R$' + args.value.toString().split('.').join(',');
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

    numeroQtdVendasPorMesData: ChartDataSets[] = [];
    numeroQtdVendasPorMesLabels = [];
    numeroQtdVendasPorMesColors: Array<any> = [];
    numeroQtdVendasPorMesLegenda = false;
    numeroQtdVendasPorMesTipo = 'bar';
    numeroQtdVendasPorMesOptions: (ChartOptions ) = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips,
            intersect: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
                // labelColor: function (tooltipItem, chart) {
                //     return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
                // }
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
                position: 'outside',
                showActualPercentages: true,
                outsidePadding: 6,
                textMargin: 6
            }
        }
    };
    numeroQtdVendasPorMesAcumulado: any;
    numeroQtdVendasPorMesMedia: any;

    acumuladoVendasPorMesData: ChartDataSets[] = [];
    acumuladoVendasPorMesLabels = [];
    acumuladoVendasPorMesColors: Array<any> = [];
    acumuladoVendasPorMesLegenda = false;
    acumuladoVendasPorMesTipo = 'pie';
    acumuladoVendasOptions: (ChartOptions) = {
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
                // label: function (tooltipItem, data) {
                //     const allData = data.datasets[tooltipItem.datasetIndex].data;
                //     const tooltipLabel = data.labels[tooltipItem.index];
                //     const tooltipData = allData[tooltipItem.index];
                //     let total = 0.0;
                //     for (let i in allData) {
                //         total += parseFloat(allData[i]);
                //     }
                //     const tooltipPercentage = (parseFloat(tooltipData) / total) * 100;
                //     return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage.toFixed(2) + '%)';
                // }
            }
        },
        plugins: {
            labels: {
                render: function (args) {
                    return args.value;
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
    acumuladoVendasPorMesDados = [];

    comparativoNumeroVendasPorLojaData: ChartDataSets[] = [];
    comparativoNumeroVendasPorLojaLabels = [];
    comparativoNumeroVendasPorLojaColors: Array<any> = [];
    comparativoNumeroVendasPorLojaLegenda = true;
    comparativoNumeroVendasPorLojaOptions: (ChartOptions ) = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips,
            // spanGaps: true,
            intersect: true,
            mode: 'index',
            position: 'nearest'
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'bottom',
            // label: {
            //     boxWidth: 5,
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
                        maxTicksLimit: 5,
                        stepSize: 5
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
    comparativoNumeroVendasPorLojaTipo = 'line';
    comparativoNumeroVendasPorLojaDados: [];
    vendaDiariaPorLojaTipo = 'line';
    comparativoNumeroVendasPorAcumulado: any;
    comparativoNumeroVendasPorMedia: any;


    comparativoTicketVendasPorLojaData: ChartDataSets[] = [];
    comparativoTicketVendasPorLojaLabels = [];
    comparativoTicketVendasPorLojaColors: Array<any> = [];
    comparativoTicketVendasPorLojaLegenda = true;
    comparativoTicketVendasPorLojaOptions: (ChartOptions ) = {
        legend: {
            position: 'bottom',
            // label: {
            //     boxWidth: 5,
            //     padding: 0,
            //     usePointStyle: true

            // }
        },
        tooltips: {
            enabled: false,
            custom: CustomTooltips,
            // spanGaps: true,
            intersect: true,
            mode: 'index',
            position: 'nearest'
        },
        responsive: true,
        maintainAspectRatio: false,
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
                        maxTicksLimit: 20,
                        stepSize: 20
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
    comparativoTicketVendasPorLojaTipo = 'line';
    comparativoTicketVendasPorLojaDados: [];
    comparativoTicketVendasPorLojaAcumulado: any;
    comparativoTicketVendasPorLojaMedia: any;

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
        this.listarAcumulativoVendasPorMesLoja();
        this.listarAcumulativoValorVendasPorMesLoja();
        this.listarComparativoVendasPorDiaPorLoja();
        this.listarComparativoVendasPorMesPorLoja();
        this.listarAcumuladoValorVendaPorVendedor();
        this.listarNumeroQtdVendasPorMes();
        this.listarComparativoNumeroVendasPorLoja();
        this.listarComparativoTicketMedioVendasPorLoja();
    }

    listarAcumulativoVendasPorMesLoja() {
        this.dashboardService.acumuladoVendaPorPeriodo(this.lojaSelecionada.empresa.id).subscribe(response => {
            this.acumuladoVendasPorMesLabels = response.map(p => p.loja);

            this.acumuladoVendasPorMesData.push(
                {
                    data: response.map(p => p.quantidade),
                    label: ''
                });
            const colors = [];
            this.acumuladoVendasPorMesLabels.forEach(p => {

                const color = this.getRandomColor(colors);
                const data = response.find(x => x.loja === p);

                this.acumuladoVendasPorMesDados.push({
                    quantidade: data.quantidade,
                    loja: data.loja,
                    color: color
                });

                colors.push(color);
            });

            this.acumuladoVendasPorMesColors.push({
                backgroundColor: colors
            });

            console.log(this.acumuladoVendasPorMesData);
            this.acumuladoVendasPorMesDados = this.acumuladoVendasPorMesDados.sort((a, b) => {
                return a.quantidade - b.quantidade;
            }).reverse();

            // this.acumuladoVendasDados = response;
            // this.acumuladoVendasPorMesData.push(
            //     {
            //         data: response.map(p => p.quantidade),
            //         label: ''
            //     });

            // this.acumuladoVendasPorMesLabels.forEach(p => {
            //     const color = this.getRandomColor();

            //     this.acumuladoVendasPorMesColors.push({
            //         backgroundColor: color,
            //         borderColor: color,
            //         pointBackgroundColor: color,
            //         labelColor: color,
            //         pointBorderColor: color,
            //         fill: false
            //     });
            // });

        });
    }

    listarAcumulativoValorVendasPorMesLoja() {
        this.dashboardService.acumuladoValorVendaPorPeriodo(this.lojaSelecionada.empresa.id).subscribe(response => {

            // this.acumuladoValorVendasPorMesLabels = response.map(p => p.loja);
            // this.acumuladoValorVendasDados = response;
            // this.acumuladoValorVendasPorMesData.push(
            //     {
            //         data: response.map(p => p.valor),
            //         label: ''
            //     });

            // this.acumuladoValorVendasPorMesLabels.forEach(p => {
            //     const color = this.getRandomColor();

            //     this.acumuladoValorVendasPorMesColors.push({
            //         backgroundColor: color,
            //         borderColor: color,
            //         pointBackgroundColor: color,
            //         labelColor: color,
            //         pointBorderColor: color,
            //         fill: false
            //     });
            // });
            this.acumuladoValorVendasPorMesLabels = response.map(p => p.loja);

            this.acumuladoValorVendasPorMesData.push(
                {
                    data: response.map(p => p.valor ? p.valor.toFixed(2) : 0),
                    label: ''
                });
            const colors = [];
            this.acumuladoValorVendasPorMesLabels.forEach(p => {

                const color = this.getRandomColor(colors);
                const data = response.find(x => x.loja === p);

                this.acumuladoValorVendasPorMesDados.push({
                    valor: data.valor,
                    loja: data.loja,
                    color: color
                });

                colors.push(color);
            });

            this.acumuladoValorVendasPorMesColors.push({
                backgroundColor: colors
            });

            this.acumuladoValorVendasPorMesDados = this.acumuladoValorVendasPorMesDados.sort((a, b) => {
                return a.valor - b.valor;
            }).reverse();

        });
    }

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    listarComparativoVendasPorDiaPorLoja() {
        this.dashboardService.comparativoVendasPorDiaPorLoja(this.lojaSelecionada.empresa.id).subscribe(response => {
            const today = new Date();
            const year = today.getFullYear();
            const mes = today.getMonth();
            const daysMonth = this.daysInMonth(mes, year);
            const dias = new Array(daysMonth);
            const diasArray = [];
            for (let i = 0; i < dias.length; i++) {
                diasArray.push(i + 1);
            }

            this.comparativoVendasPorDiaPorLojaLabels = diasArray;
            console.log(diasArray);
            const colors = [];

            response.map(p => p.loja).filter((v, i, a) => a.indexOf(v) === i)
                .forEach(loja => {

                    const valoresLoja = response.filter(p => p.loja === loja);

                    const data = [];
                    diasArray.forEach(dia => {
                        const x = valoresLoja.find(p => p.data == dia);
                        if (x) {
                            data.push(x.valor);
                        } else {
                            data.push(0);
                        }

                        colors.push(this.getRandomColor(colors));
                    });

                    this.comparativoVendasPorDiaPorLojaData.push(
                        {
                            data: data,
                            label: loja
                        });

                });
        });
    }

    listarComparativoVendasPorMesPorLoja() {
        this.dashboardService.comparativoVendasPorMesPorLoja(this.lojaSelecionada.empresa.id).subscribe(response => {
            this.comparativoVendasPorMesPorLojaLabels = this.meses.slice(0, this.mes);
            const colors = [];

            response.map(p => p.loja).filter((v, i, a) => a.indexOf(v) === i)
                .forEach(loja => {

                    const valoresLoja = response.filter(p => p.loja === loja);

                    const data = [];
                    this.meses.forEach(mes => {
                        const x = valoresLoja.find(p => p.mes === mes);
                        if (x) {
                            data.push(x.valor);
                        } else {
                            data.push(0);
                        }

                        colors.push(this.getRandomColor(colors));
                    });

                    this.comparativoVendasPorMesPorLojaData.push(
                        {
                            data: data,
                            label: loja
                        });

                    const color = this.getRandomColor(colors);
                    this.comparativoVendasPorMesPorLojaColors.push({
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


    listarAcumuladoValorVendaPorVendedor() {
        this.dashboardService.acumuladoValorVendaPorVendedor(this.lojaSelecionada.empresa.id).subscribe(response => {
            this.acumuladoValorVendasPorFuncionarioLabels = response.map(p => p.vendedor);


            this.acumuladoValorVendasPorFuncionarioData.push(
                {
                    data: response.map(p => p.valor ? p.valor.toFixed(2) : 0),
                    label: ''
                });
            const colors = [];
            this.acumuladoValorVendasPorFuncionarioLabels.forEach(p => {

                const color = this.getRandomColor(colors);
                const data = response.find(x => x.vendedor === p);

                // this.acumuladoValorVendasPorFuncionarioDados.push({
                //     valor: data.valor,
                //     vendedor: data.vendedor,
                //     color: color,
                //     porcentagem: (parseFloat(data.valor) * 100 /
                //         (this.acumuladoValorVendasPorFuncionarioData[0].data
                //             .reduce((sum, current) => parseFloat(sum) + parseFloat(current)))).toFixed(2)
                // });

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


    listarNumeroQtdVendasPorMes() {
        this.dashboardService.numeroQtdVendasPorMes(this.lojaSelecionada.id).subscribe(response => {

            this.numeroQtdVendasPorMesLabels = this.meses.slice(0, this.mes);

            this.numeroQtdVendasPorMesData.forEach(element => {
                const color = this.getRandomColor(colors);
                colors.push(color);
            });

            const colors = [];
            this.numeroQtdVendasPorMesLabels.forEach(p => {

                const color = this.getRandomColor(colors);
                colors.push(color);
            });

            this.numeroQtdVendasPorMesColors.push({
                backgroundColor: colors
            });


            const data = [];
            this.meses.forEach(mes => {
                const x = response.find(p => p.mes === mes);
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

            this.numeroQtdVendasPorMesAcumulado = response.map(p => parseInt(p.quantidade)).reduce((sum, current) => sum + current);
            this.numeroQtdVendasPorMesMedia = (response.map(p => parseInt(p.quantidade)).reduce((sum, current) => sum + current)
                / response.map(p => parseInt(p.quantidade)).length).toFixed(2);
        });
    }

    listarComparativoNumeroVendasPorLoja() {
        this.dashboardService.comparativoNumeroVendasPorLoja(this.lojaSelecionada.empresa.id).subscribe(response => {
            this.comparativoNumeroVendasPorLojaLabels = this.meses.slice(0, this.mes);
            const colors = [];
            response.map(p => p.loja).filter((v, i, a) => a.indexOf(v) === i)
                .forEach(loja => {

                    const valoresLoja = response.filter(p => p.loja === loja);

                    const data = [];
                    this.meses.forEach(mes => {
                        const x = valoresLoja.find(p => p.mes === mes);
                        if (x) {
                            data.push(x.quantidade);
                        } else {
                            data.push(0);
                        }
                        colors.push(this.getRandomColor(colors));
                    });

                    this.comparativoNumeroVendasPorLojaData.push(
                        {
                            data: data,
                            label: loja
                        });

                    const color = this.getRandomColor(colors);
                    this.comparativoNumeroVendasPorLojaColors.push({
                        backgroundColor: color,
                        borderColor: color,
                        pointBackgroundColor: color,
                        labelColor: color,
                        pointBorderColor: color,
                        fill: false
                    });

                });
            console.log(response);
            this.comparativoNumeroVendasPorAcumulado = response.map(p => parseInt(p.quantidade)).reduce((sum, current) => sum + current);
            this.comparativoNumeroVendasPorMedia = (response.map(p => parseInt(p.quantidade)).reduce((sum, current) => sum + current)
                / response.map(p => parseInt(p.quantidade)).length).toFixed(2);
        });
    }

    listarComparativoTicketMedioVendasPorLoja() {
        this.dashboardService.comparativoTicketMedioVendasPorLoja(this.lojaSelecionada.empresa.id).subscribe(response => {
            this.comparativoTicketVendasPorLojaLabels = this.meses.slice(0, this.mes);;
            const colors = [];
            response.map(p => p.loja).filter((v, i, a) => a.indexOf(v) === i)
                .forEach(loja => {

                    const valoresLoja = response.filter(p => p.loja === loja);

                    const data = [];
                    this.meses.forEach(mes => {
                        const x = valoresLoja.find(p => p.mes === mes);
                        if (x) {
                            data.push(x.ticketMedio);
                        } else {
                            data.push(0);
                        }
                        colors.push(this.getRandomColor(colors));
                    });

                    this.comparativoTicketVendasPorLojaData.push(
                        {
                            data: data,
                            label: loja
                        });

                    const color = this.getRandomColor(colors);
                    this.comparativoTicketVendasPorLojaColors.push({
                        backgroundColor: color,
                        borderColor: color,
                        pointBackgroundColor: color,
                        labelColor: color,
                        pointBorderColor: color,
                        fill: false
                    });

                });

            this.comparativoTicketVendasPorLojaAcumulado = response.map(p => p.ticketMedio).reduce((sum, current) => sum + current);
            this.comparativoTicketVendasPorLojaMedia = (response.map(p => p.ticketMedio).reduce((sum, current) => sum + current)
                / response.map(p => p.ticketMedio).length).toFixed(2);
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

        this.comparativoVendasPorDiaPorLojaData = [];
        this.comparativoVendasPorMesPorLojaData = [];
        this.acumuladoValorVendasPorMesData = [];
        this.acumuladoValorVendasPorFuncionarioData = [];
        this.acumuladoValorVendasPorFuncionarioDados = [];
        this.acumuladoValorVendasPorMesDados = [];
        this.numeroQtdVendasPorMesData = [];
        this.comparativoNumeroVendasPorLojaData = [];
        this.acumuladoVendasPorMesData = [];
        this.carregarDashboard();
    }
}



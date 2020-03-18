import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
    templateUrl: 'faturamento.component.html'
})
export class FaturamentoComponent implements OnInit {

    // public mainChartData1: Array<number> = [];
    // public mainChartData2: Array<number> = [];
    // public mainChartData3: Array<number> = [];
    // radioModel: string = 'Month';

    // public mainChartData: Array<any> = [
    //     {
    //         data: this.mainChartData1,
    //         label: 'Vendas'
    //     },
    //     {
    //         data: this.mainChartData2,
    //         label: 'Acumulado'
    //     }
    // ];
    // public mainChartOptions: any = {
    //     tooltips: {
    //         enabled: false,
    //         custom: CustomTooltips,
    //         intersect: true,
    //         mode: 'index',
    //         position: 'nearest',
    //         callbacks: {
    //             labelColor: function (tooltipItem, chart) {
    //                 return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
    //             }
    //         }
    //     },
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     scales: {
    //         xAxes: [{
    //             gridLines: {
    //                 drawOnChartArea: false,
    //             },
    //             ticks: {
    //                 callback: function (value: any) {
    //                     return value.charAt(0);
    //                 }
    //             }
    //         }],
    //         yAxes: [{
    //             ticks: {
    //                 beginAtZero: true,
    //                 maxTicksLimit: 5,
    //                 stepSize: Math.ceil(250 / 5),
    //                 max: 250
    //             }
    //         }]
    //     },
    //     elements: {
    //         line: {
    //             borderWidth: 2
    //         },
    //         point: {
    //             radius: 0,
    //             hitRadius: 10,
    //             hoverRadius: 4,
    //             hoverBorderWidth: 3,
    //         }
    //     },
    //     legend: {
    //         display: false
    //     }
    // };
    // public mainChartColours: Array<any> = [
    //     { // brandInfo
    //         backgroundColor: hexToRgba(getStyle('--info'), 10),
    //         borderColor: getStyle('--info'),
    //         pointHoverBackgroundColor: '#fff'
    //     },
    //     { // brandSuccess
    //         backgroundColor: 'transparent',
    //         borderColor: getStyle('--success'),
    //         pointHoverBackgroundColor: '#fff'
    //     },
    //     { // brandDanger
    //         backgroundColor: 'transparent',
    //         borderColor: getStyle('--danger'),
    //         pointHoverBackgroundColor: '#fff',
    //         borderWidth: 1,
    //         borderDash: [8, 5]
    //     }
    // ];
    // public mainChartLegend = false;
    // public mainChartType = 'line';



    // ngOnInit(): void {

    //     this.mainChartData1.push(2389.80, 4520, 3030, 2160);
    //     this.mainChartData2.push(2389.80, 6758.80, 9788.80, 11948.80);
    // }

    radioModel: string = 'Month';
    public mainChartLabels: Array<any> = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];

    // mainChart
    public mainChartData1: Array<number> = [];
    public mainChartData2: Array<number> = [];

    public mainChartData: Array<any> = [
        {
            data: this.mainChartData1,
            label: 'Vendas'
        },
        {
            data: this.mainChartData2,
            label: 'Acumulado'
        }
    ];
    /* tslint:disable:max-line-length */
    /* tslint:enable:max-line-length */
    public mainChartOptions: any = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips,
            intersect: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
                labelColor: function (tooltipItem, chart) {
                    return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                },
                ticks: {
                    callback: function (value: any) {
                        return value;
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(20000 / 5),
                    max: 20000
                }
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
        legend: {
            display: false
        }
    };
    public mainChartColours: Array<any> = [
        { // brandInfo
            backgroundColor: hexToRgba(getStyle('--info'), 10),
            borderColor: getStyle('--info'),
            pointHoverBackgroundColor: '#fff'
        },
        { // brandSuccess
            backgroundColor: 'transparent',
            borderColor: getStyle('--success'),
            pointHoverBackgroundColor: '#fff'
        },
        { // brandDanger
            backgroundColor: 'transparent',
            borderColor: getStyle('--danger'),
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5]
        }
    ];
    public mainChartLegend = false;
    public mainChartType = 'line';

    // barChart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];
    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData: any[] = [
        { data: [172.22, 347.69, 80, 81, 56, 55, 40], label: 'Pedro' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Pedro' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Jhonatan' },
        { data: [328, 548, 430, 196, 386, 276, 903], label: 'Loja' }
    ];


    ngOnInit(): void {

        this.mainChartData1.push(2389.80, 4520, 3030, 2160);
        this.mainChartData2.push(2389.80, 6758.80, 9788.80, 11948.80);
    }
}


import { Component } from '@angular/core';
import { Gantt } from "./gantt-chart/ganttModel"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';
    plotband: any;

    gantt1: Gantt;
    gantt2: Gantt;
    gantt3: Gantt;

    constructor() {
        this.gantt1 = new Gantt("01/01/2016", "10/12/2016", "03/15/2016", "12/23/2016", 8);
        this.gantt2 = new Gantt("02/01/2016", "10/12/2016", "03/15/2016", "11/23/2016", 8);
        this.gantt3 = new Gantt("03/01/2016", "6/30/2016", "03/30/2016", "08/30/2016", 8);
    }
    options: Object;

    generatePlotBands(x: number): void {


        this.plotband = null;
        this.plotband = [{
            from: 0,
            to: 30 * x,
            color: '#2ecc71' // green,
            , events: {
                onchange: function (e) {
                    this.svgElem.attr('fill', this.options.color);
                }
            }

        }

            // {
            //     from: 30 * x,
            //     to: 60 * x,
            //     color: '#f39c12' // orange
            // }, {
            //     from: 60 * x,
            //     to: 90 * x,
            //     color: '#e74c3c' // red
            // }

        ];

    }
    getChartOptions(plotband: any, x: number): void {
        this.options = {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                spacingTop: 0,
                spacingBottom: 0,
            },
            plotOptions: {
                gauge: {
                    dial: {
                        backgroundColor: '#1ca4bc'
                    },

                    pivot: {
                        backgroundColor: "#1ca4bc"
                    },

                    dataLabels: {
                        color: "#1ca4bc",
                        borderWidth: 0,
                        format: '[ {y} ]'
                    },
                },


            },

            title: {
                text: ''
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {},
                    borderWidth: 0,
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 90,

                minorTickLength: 0,
                tickPixelInterval: 30,

                tickLength: 0,

                labels: {
                    step: 2,
                    rotation: 'auto'
                },

                title: {
                    text: ''
                },
                plotBands: plotband
            },

            series: [{
                name: 'Target',
                data: [50 * x],
                tooltip: {
                    /*valueSuffix: ''*/
                }
            }]
        };
    }
    onchange(): void {
        this.chart = null;
        // this.chart.options.yAxis[0].plotBands[0].borderColor="#FFF"
        this.generatePlotBands(20)
        this.getChartOptions(this.plotband, 8);
    }
    chart: Object;
    saveInstance(chartInstance): void {
        this.chart = chartInstance;

        console.log("current chart", chartInstance)
        console.log("plotoptions yAxis plotBands", chartInstance.options.yAxis[0].plotBands)
        //   chartInstance.options.plotOptions.gauge.pivot.backgroundColor="#FFF";
    }
}

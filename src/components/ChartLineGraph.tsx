import * as React          from "react";
import {Line as LineChart} from "react-chartjs-2";
import "react-chartjs-2";

interface IChartLineGraph {
    title: string;
    chartLabels: any;
    chartData: any;
}

export const ChartLineGraph = (clg: IChartLineGraph) => {

    const cData: any = {
        labels:   clg.chartLabels,
        datasets: [{
            label:           clg.title,
            data:            clg.chartData,
            backgroundColor: ['rgba(255, 99, 123, 0.2)'],
            borderColor:     ['rgba(255, 99, 132, 1)'],
            // borderWidth:     1
        }]
    };

    const cOptions: any = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    return <LineChart data={cData} options={cOptions}/>;
};

export default ChartLineGraph;

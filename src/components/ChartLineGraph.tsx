import * as React          from "react";

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

    return <div className="LineChart">{}</div>
    // return <LineChart data={cData} options={cOptions}/>;
};

export default ChartLineGraph;

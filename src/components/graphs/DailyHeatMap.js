import React, { Component } from 'react';
import {Card} from '@material-ui/core';
import { XYPlot, XAxis, YAxis, HeatmapSeries } from 'react-vis';
import 'react-vis/dist/style.css';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const times = [
    "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 AM",
    "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM"
];

export class DailyHeatMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: props.data,
            width: props.width
        };
    };
    parseTimeData(weeklyTimeData) {
        let dailyGraph = [];
        let maxes = [];
        weeklyTimeData.forEach(day => {
            maxes.push(Math.max.apply(null, day))
        });
        let max = Math.max.apply(null, maxes);
        weeklyTimeData.forEach((day, i) => {
            day.forEach((time, j) => {
                dailyGraph.push({
                    x: days[i],
                    y: times[j],
                    color: `rgba(246, 128, 128, ${time === 0 ? 0.1 : (time)/max})`
                });
            });
        });
        return dailyGraph;
    }
    render() {
        let width = this.props.width
        return (
            <Card className="daily-chart">
                <XYPlot xType="ordinal" yType="ordinal" margin={60} width={width} height={1.8*width}>
                <XAxis orientation="top" />
                <YAxis />
                <HeatmapSeries
                    colorType="literal"
                    style={{
                        stroke: 'white',
                        strokeWidth: '0px',
                        rectStyle: {
                            rx: 0,
                            ry: 0
                        }
                    }}
                    data={this.parseTimeData(this.props.data)}
                    />
                </XYPlot>
            </Card>
        )
    }
}

export default DailyHeatMap;

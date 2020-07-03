import React from "react";
import PropTypes from 'prop-types';
import Chart from "react-apexcharts";

export function AreaGraph({ data }) {
    let colors;
    // Compare two most recent data points to determine the graph color
    if (Number(data[data.length - 1].y) >= Number(data[data.length - 2].y)){
        colors = {
            fill: "#00ff00",
            stroke: "#00aa00",
        }
    }
    else {
        colors = {
            fill: "#ff0000",
            stroke: "#aa0000",
        }
    }

    const series = [{
        data: Array.from(data, d => d.y),
    }]
    const options = {
        annotations: {
            xaxis: [
                {
                    x: new Date("05 Jan 2020").getTime(),
                    x2: new Date("06 Jan 2020").getTime(),
                    borderColor: "#FFFFFF",
                    label: {
                        borderColor: "#FFFFFF",
                        text: "Predicted",
                        style: {
                            fontFamily: "iceland regular",
                            fontSize: "14px",
                            color: "#FFFFFF",
                            background: "#555555",
                        },
                    }
                }
            ]
        },
        chart: {
            title: {
                show: true,
            },
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            colors: colors.fill,
        },
        stroke: {
            colors: [colors.stroke],
        },
        title: {
            text: "Stock Prices",
            align: "center",
            style: {
                fontFamily: "iceland regular",
                fontSize: "25px",
                color: "#ffffff",
            },
        },
        tooltip: {
            enabled: false,
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: "#ffffff",
                    fontFamily: "iceland regular",
                }
            },
            categories: Array.from(data, d => d.x),
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#ffffff",
                    fontFamily: "iceland regular",
                }
            }
        }
    }

    return (
            <Chart 
                options={options} 
                series={series} 
                type="area"
                height={"95%"}
            ></Chart>
    );
} 

AreaGraph.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.any.isRequired,
            y: PropTypes.any.isRequired,
        }).isRequired,
    ),
}
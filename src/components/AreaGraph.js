import React from "react";
import PropTypes from 'prop-types';
import Chart from "react-apexcharts";

export function AreaGraph({ data, positiveColor }) {
    let colors;
    if (positiveColor){
        // Green
        colors = {
            fill: "#00ff00",
            stroke: "#00aa00",
        }
    }
    else {
        // Red
        colors = {
            fill: "#ff0000",
            stroke: "#aa0000",
        }
    }

    const annotation = {
        start: data[data.length - 2].x,
        end: data[data.length - 1].x,
    }

    const series = [{
        data: Array.from(data, d => d.y),
    }]
    const options = {
        annotations: {
            xaxis: [
                {
                    x: annotation.start.getTime(),
                    x2: annotation.end.getTime(),
                    borderColor: "#FFFFFF",
                    label: {
                        borderColor: "#FFFFFF",
                        text: "Predicted",
                        style: {
                            fontFamily: "iceland regular",
                            fontSize: "18px",
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
            text: "Stock Closing Prices",
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
            categories: Array.from(data, d => d.x.getTime()),
            type: 'datetime',
            labels: {
                offsetX: -6,
                style: {
                    colors: "#ffffff",
                    fontFamily: "iceland regular",
                }
            },
        },
        yaxis: {
            title: {
                text: "Closing Price ($)",
                style: {
                    color: "#ffffff",
                    fontFamily: "iceland regular",
                    fontSize: "20px",
                },
            },
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
            x: PropTypes.instanceOf(Date).isRequired,
            y: PropTypes.any.isRequired,
        }).isRequired,
    ),
    positiveColor: PropTypes.bool.isRequired,
}

export function SmallAreaGraph({ data, positiveColor }) {
    let colors;
    if (positiveColor){
        // Green
        colors = {
            fill: "#00ff00",
            stroke: "#00aa00",
        }
    }
    else {
        // Red
        colors = {
            fill: "#ff0000",
            stroke: "#aa0000",
        }
    }

    const series = [{
        data: Array.from(data, d => d.y),
    }]
    const options = {
        chart: {
            title: {
                show: false,
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
        tooltip: {
            enabled: false,
        },
        xaxis: {
            categories: Array.from(data, d => d.x.getTime()),
            type: 'datetime',
            labels: {
                offsetX: -6,
                style: {
                    colors: "#ffffff",
                    fontFamily: "iceland regular",
                }
            },
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
                height={"100%"}
                width={"500px"}
            ></Chart>
    );
} 

AreaGraph.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.instanceOf(Date).isRequired,
            y: PropTypes.any.isRequired,
        }).isRequired,
    ),
    positiveColor: PropTypes.bool.isRequired,
}

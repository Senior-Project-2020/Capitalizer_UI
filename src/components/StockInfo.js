import React from "react";
import PropTypes from 'prop-types';
import { startCase } from "lodash";

export function StockInfo({ data }) {
    var dataElements = [];
    var hiddenData = ["id", "stock", "date"];

    // Create paragraph elements for the displayed data
    for(const [key, value] of Object.entries(data)) {
        if (!hiddenData.includes(key)) {
            if (key === "volume"){
                dataElements.push(<p key={key}>{startCase(key.replace(/_/g, " ")) + ": " + value}</p>)
            }
            else if (key === "predicted_closing_price") {
                dataElements.push(<p key={key}>{startCase("Previous " + key.replace(/_/g, " ")) + ": " + value.toFixed(2)}</p>)
            }
            else {
                // Add dollar sign and use two decimal places for fields with money data
                dataElements.push(<p key={key}>{startCase(key.replace(/_/g, " ")) + ": $" + value.toFixed(2)}</p>);
            }
        }
    }

    return dataElements;
}

StockInfo.propTypes = {
    data: PropTypes.object.isRequired
}
import React from "react";
import PropTypes from 'prop-types';
import { startCase } from "lodash";

export function StockInfo({ data }) {
    var dataElements = [];
    var hiddenData = ["id", "stock", "date"];

    // Create paragraph elements for the displayed data
    for(const [key, value] of Object.entries(data)) {
        if (!hiddenData.includes(key)) {
            dataElements.push(<p key={key}>{startCase(key.replace(/_/g, " ")) + ": " + value}</p>);
        }
    }

    return dataElements;
}

StockInfo.propTypes = {
    data: PropTypes.object.isRequired
}
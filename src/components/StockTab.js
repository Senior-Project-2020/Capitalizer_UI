import React, { useContext } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { CapitalizerContext } from "../Context";

export function StockTab({ stock, price, isSelected, isTop, setSelectedTab }) {
    const [, updateState] = useContext(CapitalizerContext);

    const change = round(price.predicted_closing_price - price.opening_price, 2);
    const percentChange = round(change / price.opening_price * 100, 2);

    let style = {
        "width": "92.5%",
    };

    if (isTop){
        // If on top, add radius to top left corner
        style = { ...style, "borderRadius": "15px 0px 0px 0px"}
    }

    if (isSelected){
        // Increase the width, change the color, and add rounded corners on left side
        style = {
            "width": "96%", 
            "background": "rgba(255, 255, 255, 0.30)",
            "borderRadius": "10px 0px 0px 10px"
        };
    }

    return (
        <TabContainer
            className={stock.symbol}
            style={style}
            onClick={() => setSelectedTab(stock.symbol)}
        >
            <TabTable>
                <tbody>
                    <tr>
                        <SymbolHeader stockSymbol={stock.symbol}></SymbolHeader>
                        <TableHeader label={"Opening:"}></TableHeader>
                        <TableHeader label={"Predicted:"}></TableHeader>
                        <TableHeaderGap></TableHeaderGap>
                        <TableHeader label={"Change:"}></TableHeader>
                    </tr>
                    <tr>
                        <TableData data={price.opening_price}></TableData>
                        <TableData data={price.predicted_closing_price}></TableData>
                        <TableData data={change + " (" + percentChange + "%)"}></TableData>
                    </tr>
                </tbody>
            </TabTable>
        </TabContainer>
    )
}

StockTab.propTypes = {
    stock: PropTypes.shape({
        symbol: PropTypes.string,
    }).isRequired,
    price: PropTypes.shape({
        opening_price: PropTypes.number,
        predicted_closing_price: PropTypes.number,
    }).isRequired,
}

const TabContainer = styled.div`
    display: block;
    margin-left: auto;
    margin-right: 0;
    border-style: solid;
    border-width: 1px 1px 1px 0px;
    border-color: black;
    padding: 10px;
    background: rgba(255, 255, 255, 0.16);
`;

const TabTable = styled.table`
    width: 100%;
`;

const SymbolHeaderContainer = styled.header`
    font-size: 30px;
`;

const SymbolHeader = ({ stockSymbol }) => {
    return (
        <th style={{ "width": "25%" }} rowSpan="2">
            <SymbolHeaderContainer>{stockSymbol}</SymbolHeaderContainer>
        </th>
    );
}

const TableHeader = ({ label }) => {
    return (
        <th style={{ "width": "20%" }}>{label}</th>
    );
}

const TableHeaderGap = () => {
    return (
        <th style={{ "width": "15%" }} rowSpan="2"></th>
    );
}

const TableData = ({ data }) => {
    return (
        <td style={{ "textAlign": "center" }}>{data}</td>
    );
}

// Helper function to round number "n" to decimal places "p"
function round(n, p) {
    const n1 = n * Math.pow(10, p + 1);
    const n2 = Math.floor(n1 / 10);
    if (n1 >= (n2 * 10 + 5)) {
        return (n2 + 1) / Math.pow(10, p);
    }
    return n2 / Math.pow(10, p);
}
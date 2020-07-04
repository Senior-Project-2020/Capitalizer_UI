import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

export function StockTab({ stock, price, isSelected, isTop, setSelectedTab }) {
    const change = price.predicted_closing_price - price.opening_price;
    const percentChange = change / price.opening_price * 100;

    // Update tab container's style depending on isSelected and isTop props
    let style;

    if (isTop){
        // If on top, add radius to top left corner
        style = { ...style, "borderRadius": "15px 0px 0px 0px"}
    }

    if (isSelected){
        // Increase the width, change the color, and add rounded corners on left side
        style = {
            "margin": "0% 0% 0% -5%", 
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
                        <TableData data={"$" + price.opening_price.toFixed(2)}></TableData>
                        <TableData data={"$" + price.predicted_closing_price.toFixed(2)}></TableData>
                        <TableData data={"$" + change.toFixed(2) + " (" + percentChange.toFixed(2) + "%)"}></TableData>
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
    isSelected: PropTypes.bool.isRequired,
    isTop: PropTypes.bool.isRequired,
}

const TabContainer = styled.div`
    display: block;
    margin-left: auto;
    margin-right: 0;
    border-style: solid;
    border-width: 1px 1px 1px 0px;
    border-color: black;
    padding: 2.75%;
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
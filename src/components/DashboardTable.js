import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { StockDetail } from "./StockDetail";
import { StockTab } from "./StockTab";
import { CapitalizerContext } from "../Context";

export function DashBoardTable({ stocks }) {
    const [state,] = useContext(CapitalizerContext);

    useEffect(() => {
        console.log("selectedBuyTab: " + state.selectedBuyTab);
    }, [state.selectedBuyTab]);
    
    return(
        <DashBoardTableContainer>
            <div style={{"width": "45%", "borderStyle": "solid", "borderWidth": "1px 1px 1px 0px", "borderColor": "black"}}>
                <StockTab stock={stocks[0].stock} price={stocks[0].price}></StockTab>
                <StockTab stock={stocks[1].stock} price={stocks[1].price}></StockTab>
            </div>
            <StockDetail stock={stocks[0].stock} price={stocks[0].price}></StockDetail>
        </DashBoardTableContainer>
    )
}

DashBoardTable.propTypes = {
    stocks: PropTypes.arrayOf(
        PropTypes.shape({
            stock: PropTypes.shape({
                name: PropTypes.string,
                symbol: PropTypes.string,
            }).isRequired,
            price: PropTypes.object.isRequired,
        }),
    ).isRequired,
}

const DashBoardTableContainer = styled.article`
    background: rgba(255, 255, 255, 0.16);
    padding: 20px;
    border-radius: 15px;
    color: white;
`;
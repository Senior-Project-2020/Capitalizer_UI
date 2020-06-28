import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { StockDetail } from "./StockDetail";

export function DashBoardTable({ stocks }) {
    return(
        <DashBoardTableContainer>
            <StockDetail stock={stocks[0].stock} price={stocks[0].price} is></StockDetail>
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
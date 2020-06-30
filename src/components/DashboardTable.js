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
            <TopContainer>
                <TabsContainer>
                    <StockTab stock={stocks[0].stock} price={stocks[0].price} isSelected={false} isTop={true}></StockTab>
                    <StockTab stock={stocks[1].stock} price={stocks[1].price} isSelected={true} isTop={false}></StockTab>
                    <StockTab stock={stocks[0].stock} price={stocks[0].price} isSelected={false} isTop={false}></StockTab>
                    <StockTab stock={stocks[1].stock} price={stocks[1].price} isSelected={false} isTop={false}></StockTab>
                    <StockTab stock={stocks[1].stock} price={stocks[1].price} isSelected={false} isTop={false}></StockTab>
                </TabsContainer>
                <GraphContainer>
                    <p>Graph Here</p>
                </GraphContainer>
            </TopContainer>
            <DetailContainer>
                <StockDetail stock={stocks[0].stock} price={stocks[0].price}></StockDetail>
            </DetailContainer>
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
    color: white;
`;

const TopContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const TabsContainer = styled.div`
    width: 50%;
`;

const GraphContainer = styled.div`
    width: 50%;
    display: block;
    margin-left: auto;
    margin-right: 0;
    background: black;
    border-radius: 0px 15px 0px 0px;
`;

const DetailContainer = styled.div`
    display: block;
    margin-left: auto;
    margin-right: 0;
    width: 96.3%;
    background: rgba(255, 255, 255, 0.16);
    border-style: solid;
    border-width: 1px 0px 0px 0px;
    border-color: black;
    border-radius: 0px 0px 15px 15px;
    padding: 10px;
`;
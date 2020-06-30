import React, { useContext, useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { StockDetail } from "./StockDetail";
import { StockTab } from "./StockTab";
import { CapitalizerContext } from "../Context";

export function DashBoardTable({ stocks }) {
    const [state,] = useContext(CapitalizerContext);
    const stockTabs = [];
    const [selectedTab, setSelectedTab] = useState(stocks[0].stock.symbol);
    const selectedStock = stocks.find(pair => pair.stock.symbol === selectedTab);

    // Create stock tabs
    for(let i = 0; i < stocks.length; i++){
        stockTabs.push(
            <StockTab 
                key={i}
                stock={stocks[i].stock} 
                price={stocks[i].price} 
                isSelected={selectedTab === stocks[i].stock.symbol} 
                isTop={i === 0}
                setSelectedTab={setSelectedTab}
            ></StockTab>
        );
    }
    
    return(
        <DashBoardTableContainer>
            <TopContainer>
                <TabsContainer>{stockTabs}</TabsContainer>
                <GraphContainer>
                    <p>Graph Here</p>
                </GraphContainer>
            </TopContainer>
            <DetailContainer>
                <StockDetail 
                    stock={selectedStock.stock} 
                    price={selectedStock.price}
                ></StockDetail>
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
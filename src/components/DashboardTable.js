import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { StockDetail } from "./StockDetail";
import { StockTab } from "./StockTab";
import { AreaGraph } from "./AreaGraph";

export function DashBoardTable({ stocks }) {
    const stockTabs = [];
    const [selectedTab, setSelectedTab] = useState(stocks[0].stock.symbol);
    const selectedStock = stocks.find(pair => pair.stock.symbol === selectedTab);

    // Sort stocks based on percent change
    stocks.sort((s1, s2) => {
        const price1 = s1.price
        const price2 = s2.price
        const percentChange1 = (price1.predicted_closing_price - price1.opening_price) / price1.opening_price * 100;
        const percentChange2 = (price2.predicted_closing_price - price2.opening_price) / price2.opening_price * 100;

        return percentChange2 - percentChange1;
    });

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

    const data = [
        {x: "01-02-2020", y: "100"},
        {x: "01-03-2020", y: "150"},
        {x: "01-04-2020", y: "1000"},
        {x: "01-05-2020", y: "200"},
        {x: "01-06-2020", y: "199"},
    ]

    return(
        <DashBoardTableContainer>
            <TopContainer>
                <TabsContainer>{stockTabs}</TabsContainer>
                <GraphContainer>
                    <AreaGraph data={data}></AreaGraph>
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
    margin: 5% 5% 5% 6%;
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
    background: rgba(255, 255, 255, 0.16);
    border-radius: 0px 15px 0px 0px;
    padding: 1% 2.5% 1% 1%
`;

const DetailContainer = styled.div`
    display: block;
    margin-left: auto;
    margin-right: 0;
    background: rgba(255, 255, 255, 0.16);
    border-style: solid;
    border-width: 1px 0px 0px 0px;
    border-color: black;
    border-radius: 0px 0px 15px 15px;
    padding: 1.5% 2%;
`;
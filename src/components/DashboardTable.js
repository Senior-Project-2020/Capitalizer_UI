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

    // Sort stocks based on percent change (of last element in the prices array)
    stocks.sort((s1, s2) => {
        const price1Actual = s1.prices[s1.prices.length - 2].actual_closing_price;
        const price1Predicted = s1.prices[s1.prices.length - 1].predicted_closing_price;
        const price2Actual = s2.prices[s2.prices.length - 2].actual_closing_price;
        const price2Predicted = s2.prices[s2.prices.length - 1].predicted_closing_price;

        const percentChange1 = (price1Predicted - price1Actual) / price1Actual * 100;
        const percentChange2 = (price2Predicted - price2Actual) / price2Actual * 100;

        return percentChange2 - percentChange1;
    });

    // Create stock tabs
    for(let i = 0; i < stocks.length; i++){
        stockTabs.push(
            <StockTab 
                key={i}
                stock={stocks[i].stock} 
                predictedClosing={stocks[i].prices[stocks[i].prices.length - 1].predicted_closing_price}
                previousClosing={stocks[i].prices[stocks[i].prices.length - 2].actual_closing_price} 
                isSelected={selectedTab === stocks[i].stock.symbol} 
                isTop={i === 0}
                setSelectedTab={setSelectedTab}
            ></StockTab>
        );
    }

    // Get the closing price data. Only get the predicted closing price of the last price in the list
    const data = [];
    let predictedChange = 0;
    for (let i = 0; i < selectedStock.prices.length; i++){
        if (i === selectedStock.prices.length - 1){
            data.push({
                x: selectedStock.prices[i].date,
                y: selectedStock.prices[i].predicted_closing_price,
            });
            predictedChange = selectedStock.prices[i].predicted_closing_price - selectedStock.prices[i-1].actual_closing_price;
        }
        else {
            data.push({
                x: selectedStock.prices[i].date,
                y: selectedStock.prices[i].actual_closing_price,
            });
        }
    }

    return(
        <DashBoardTableContainer>
            <TopContainer>
                <TabsContainer>{stockTabs}</TabsContainer>
                <GraphContainer>
                    <AreaGraph 
                        data={data} 
                        positiveColor={predictedChange >= 0}
                    ></AreaGraph>
                </GraphContainer>
            </TopContainer>
            <DetailContainer>
                <StockDetail 
                    stock={selectedStock.stock} 
                    price={selectedStock.prices[selectedStock.prices.length - 1]}
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
            prices: PropTypes.arrayOf(
                PropTypes.shape({
                    date: PropTypes.instanceOf(Date).isRequired,
                    opening_price: PropTypes.number.isRequired,
                    predicted_closing_price: PropTypes.number.isRequired,
                    actual_closing_price: PropTypes.number.isRequired,
                }),
            ),
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
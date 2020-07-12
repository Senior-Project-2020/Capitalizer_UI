import React, { useContext, useEffect } from "react";
import { CapitalizerContext } from "../Context";
import styled from "styled-components";
import { SideBar } from "../components/SideBar";
import { SearchBar } from "../components/SearchBar";
import { SearchStockDetail } from "../components/SearchStockDetail";
import { getStockPrices, getStockList } from "../api/requests";

const url = "http://54.198.60.36/api/v1/";

const stock1 = {
  name: "Amazon.com Inc.",
  symbol: "AMZN1",
  category: "Information Technology",
  stock_prices: [0],
};
const stock2 = {
  name: "Amazon.com Inc.",
  symbol: "AMZN2",
  category: "Information Technology",
  stock_prices: [0],
};
const stock3 = {
  name: "Amazon.com Inc.",
  symbol: "AMZN3",
  category: "Information Technology",
  stock_prices: [0],
};
const stock4 = {
  name: "Amazon.com Inc.",
  symbol: "AMZN4",
  category: "Information Technology",
  stock_prices: [0],
};
const stock5 = {
  name: "Amazon.com Inc.",
  symbol: "AMZN5",
  category: "Information Technology",
  stock_prices: [0],
};
const price1 = {
  id: 0,
  stock: "AMZN",
  date: new Date("2020-01-01"),
  predicted_closing_price: 1123,
  opening_price: 124,
  actual_closing_price: 2124,
  daily_high: 125,
  daily_low: 124,
  volume: 10000,
};
const price2 = {
  id: 0,
  stock: "AMZN",
  date: new Date("2020-01-02"),
  predicted_closing_price: 2123,
  opening_price: 124,
  actual_closing_price: 1124,
  daily_high: 125,
  daily_low: 124,
  volume: 10000,
};
const price3 = {
  id: 0,
  stock: "AMZN",
  date: new Date("2020-01-03"),
  predicted_closing_price: 3123,
  opening_price: 124,
  actual_closing_price: 5124,
  daily_high: 125,
  daily_low: 124,
  volume: 10000,
};
const price4 = {
  id: 0,
  stock: "AMZN",
  date: new Date("2020-01-04"),
  predicted_closing_price: 4123,
  opening_price: 124,
  actual_closing_price: 3124,
  daily_high: 125,
  daily_low: 124,
  volume: 10000,
};
const price5 = {
  id: 0,
  stock: "AMZN",
  date: new Date("2020-01-05"),
  predicted_closing_price: 5123,
  opening_price: 124,
  actual_closing_price: 4124,
  daily_high: 125,
  daily_low: 124,
  volume: 10000,
};
const price10 = {
  id: 0,
  stock: "AMZN",
  date: new Date("2020-01-01"),
  predicted_closing_price: 5123,
  opening_price: 124,
  actual_closing_price: 4124,
  daily_high: 125,
  daily_low: 124,
  volume: 10000,
};
const price20 = {
  id: 0,
  stock: "AMZN",
  date: new Date("2020-01-02"),
  predicted_closing_price: 4123,
  opening_price: 124,
  actual_closing_price: 5124,
  daily_high: 125,
  daily_low: 124,
  volume: 10000,
};
const price30 = {
  id: 0,
  stock: "AMZN",
  date: new Date("2020-01-03"),
  predicted_closing_price: 3123,
  opening_price: 124,
  actual_closing_price: 1124,
  daily_high: 125,
  daily_low: 124,
  volume: 10000,
};
const price40 = {
  id: 0,
  stock: "AMZN",
  date: new Date("2020-01-04"),
  predicted_closing_price: 2123,
  opening_price: 124,
  actual_closing_price: 3124,
  daily_high: 125,
  daily_low: 124,
  volume: 10000,
};
const price50 = {
  id: 0,
  stock: "AMZN",
  date: new Date("2020-01-05"),
  predicted_closing_price: 1123,
  opening_price: 124,
  actual_closing_price: 2124,
  daily_high: 125,
  daily_low: 124,
  volume: 10000,
};
const priceList = [price1, price2, price3, price4, price5];
const priceList2 = [price10, price20, price30, price40, price50];
const stocks = [
  priceList,
  priceList2,
  priceList,
  priceList2,
  priceList,
];

export function StockPage() {
  const [state, updateState] = useContext(CapitalizerContext);

  useEffect(() => {
    if(state.authToken !== ""){
      getStockList(url + "stock/", state.authToken, [], updateState)
      getStockPrices(url + "stock-price/", state.authToken, [], updateState)
    }
  }, [state.authToken])

  const StockDetails = []

  for (const [index, value] of state.stocks.entries()) {
    let prices = state.stockPrices
      .filter((price) => price.stock === value.symbol)
      .sort((a, b) => a.id - b.id);

    if (prices.length > 3) {
      const predictedClose = prices[prices.length - 1].predicted_closing_price
      const mostRecentData = prices[prices.length - 2]

      StockDetails.push(
        <SearchStockDetail
          key={index}
          name={value.name}
          openPrice={parseFloat(mostRecentData.opening_price)}
          predictedClose={parseFloat(predictedClose)}
          low={parseFloat(mostRecentData.daily_low)}
          high={parseFloat(mostRecentData.daily_high)}
          previousClose={parseFloat(mostRecentData.opening_price)}
          volume={parseFloat(mostRecentData.volume)}
          prices={prices}
        ></SearchStockDetail>
      );
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <SideBar></SideBar>
      <div style={{ flexGrow: "1" }}>
        <SearchBar></SearchBar>
        <DetailContainer>
          {StockDetails}
        </DetailContainer>
      </div>
    </div>
  );
}

const DetailContainer = styled.div`
  overflow: auto;
  height: calc(100vh - 180px);

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border: 0px solid black;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

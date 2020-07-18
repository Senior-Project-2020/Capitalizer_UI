import React, { useContext, useState, useEffect } from "react";
import { CapitalizerContext } from "../Context";
import styled from "styled-components";
import { SideBar } from "../components/SideBar";
import { SearchBar } from "../components/SearchBar";
import { SearchStockDetail } from "../components/SearchStockDetail";
import { getStockPrices, getStockList } from "../api/requests";
import { apiURL } from "../constants";

export function StockPage() {
  const [state, updateState] = useContext(CapitalizerContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (state.stocks.length == 0 && state.authToken !== "") {
      getStockList(apiURL + "stock/", state.authToken, [], updateState);
    }
    if (state.stockPrices.length === 0 && state.authToken !== "") {
      getStockPrices(apiURL + "stock-price/?recent=all", state.authToken, [], updateState);
    }
  }, [state.authToken]);

  const StockDetails = [];

  for (const [index, value] of state.stocks.entries()) {
    if (selectedCategory === "" || selectedCategory === value.category) {
      if (
        value.name.toLowerCase().includes(state.searchField.toLowerCase()) ||
        value.symbol.toLowerCase().includes(state.searchField.toLowerCase())
      ) {
        let prices = state.stockPrices
          .filter((price) => price.stock === value.symbol)
          .sort((a, b) => a.id - b.id);

        if (prices.length > 3) {
          const predictedClose =
            prices[prices.length - 1].predicted_closing_price;
          const mostRecentData = prices[prices.length - 2];

          StockDetails.push(
            <SearchStockDetail
              key={index}
              name={value.name}
              openPrice={parseFloat(mostRecentData.actual_closing_price)}
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
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <SideBar
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      ></SideBar>
      <div style={{ flexGrow: "1" }}>
        <SearchBar></SearchBar>
        <DetailContainer>{StockDetails}</DetailContainer>
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

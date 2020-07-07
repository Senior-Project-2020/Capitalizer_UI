import React, { useState } from "react";
import styled from "styled-components";
import { UpArrowIcon, DownArrowIcon } from "../icons/ArrowIcons";
import { SmallAreaGraph } from "./AreaGraph";
import PropTypes from "prop-types";

export function SearchStockDetail({
  name,
  openPrice,
  predictedClose,
  low,
  high,
  previousClose,
  volume,
  selectedStock,
}) {
  const [open, setOpen] = useState(false);

  const data = [];
  for (let i = 0; i < selectedStock.prices.length; i++) {
    if (i === selectedStock.prices.length - 1) {
      data.push({
        x: selectedStock.prices[i].date,
        y: selectedStock.prices[i].predicted_closing_price,
      });
    } else {
      data.push({
        x: selectedStock.prices[i].date,
        y: selectedStock.prices[i].actual_closing_price,
      });
    }
  }

  return (
    <StockDetailContainer>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextContainer>
          <StockDetailHeader>{name}</StockDetailHeader>
          <StockDetailBody>
            <TextEntry>Opening Price: ${openPrice.toFixed(2)}</TextEntry>
            <TextEntry>Predicted Closing: ${predictedClose.toFixed(2)}</TextEntry>
            {!open ? <TextEntry>More Stock Info ...</TextEntry> : null}
          </StockDetailBody>
        </TextContainer>
        
        <IconContainer
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? <TextEntry style={{marginRight: "120px"}}>Closing Price Over Time</TextEntry>: null}
          {open ? <UpArrowIcon></UpArrowIcon> : <DownArrowIcon></DownArrowIcon>}
        </IconContainer>
      </div>
      {open ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "0px 20px 0px 20px",
          }}
        >
          <TextContainer>
            <TextEntry>Low Price: ${low.toFixed(2)}</TextEntry>
            <TextEntry>High Price: ${high.toFixed(2)}</TextEntry>
            <TextEntry>Yesterdays Closing: ${previousClose.toFixed(2)}</TextEntry>
            <TextEntry>Volume: {volume}</TextEntry>
          </TextContainer>
          <div style={{ margin: "5px 5px 5px auto" }}>
            <div
              style={{
                padding: "15px",
                background: "rgba(255, 255, 255, 0.16)",
                border: "0.5px solid black",
                borderRadius: "15px",
              }}
            >
              <SmallAreaGraph
                data={data}
                positiveColor={
                  Number(data[data.length - 1].y) >=
                  Number(data[data.length - 2].y)
                }
              ></SmallAreaGraph>
            </div>
          </div>
        </div>
      ) : null}
    </StockDetailContainer>
  );
}

SearchStockDetail.propTypes = {
  name: PropTypes.string.isRequired,
  openPrice: PropTypes.number.isRequired,
  predictedClose: PropTypes.number.isRequired,
  low: PropTypes.number.isRequired,
  high: PropTypes.number.isRequired,
  previousClose: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  selectedStock: PropTypes.shape({
    stock: PropTypes.shape({
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      stock_prices: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      symbol: PropTypes.string.isRequired,
    }).isRequired,
    prices: PropTypes.arrayOf(
      PropTypes.shape({
        actual_closing_price: PropTypes.number.isRequired,
        daily_high: PropTypes.number.isRequired,
        daily_low: PropTypes.number.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        id: PropTypes.number.isRequired,
        opening_price: PropTypes.number.isRequired,
        predicted_closing_price: PropTypes.number.isRequired,
        stock: PropTypes.string.isRequired,
        volume: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

const StockDetailContainer = styled.div`
  background: rgba(255, 255, 255, 0.16);
  border: 1px black solid;
  border-radius: 15px;
  margin: 20px;
  padding: 20px;
`;

const TextContainer = styled.div``;

const IconContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

const TextEntry = styled.div`
  color: white;
  margin: 10px 30px 10px 0px;
  font-size: 22px;
`;

const StockDetailHeader = styled.div`
  color: white;
  font-size: 32px;
`;

const StockDetailBody = styled.div`
  display: flex;
`;

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
  prices,
}) {
  const [open, setOpen] = useState(false);

  const data = [];
  for (let i = 0; i < prices.length; i++) {
    if (i === prices.length - 1) {
      data.push({
        x: prices[i].date,
        y: prices[i].predicted_closing_price,
      });
    } else {
      data.push({
        x: prices[i].date,
        y: prices[i].actual_closing_price,
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
            <TextEntry>
              Predicted Closing: ${predictedClose.toFixed(2)}
            </TextEntry>
            {!open ? <TextEntry>More Stock Info ...</TextEntry> : null}
          </StockDetailBody>
        </TextContainer>

        <IconContainer
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? (
            <TextEntry style={{ marginLeft: "auto"}}>
              Closing Price Over Time
            </TextEntry>
          ) : null}
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
            <TextEntry>
              Yesterdays Closing: ${previousClose.toFixed(2)}
            </TextEntry>
            <TextEntry>Volume: {volume}</TextEntry>
          </TextContainer>
          <div style={{ margin: "5px 5px 5px auto", width: "75%" }}>
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
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      actual_closing_price: PropTypes.string.isRequired,
      daily_high: PropTypes.string.isRequired,
      daily_low: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      opening_price: PropTypes.string.isRequired,
      predicted_closing_price: PropTypes.string.isRequired,
      stock: PropTypes.string.isRequired,
      volume: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
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

import React, { useState } from "react";
import styled from "styled-components";
import { UpArrowIcon, DownArrowIcon } from "../icons/ArrowIcons";

export function SearchStockDetail() {
  const [open, setOpen] = useState(false);

  return (
    <StockDetailContainer>
      <div style={{display: "flex", alignItems: "center"}}>
        <TextContainer>
          <StockDetailHeader>Amazon.com Inc. (AMZN)</StockDetailHeader>
          <StockDetailBody>
            <TextEntry>Opening Price: $100.00</TextEntry>
            <TextEntry>Predicted Closing: $102.00</TextEntry>
            {!open ? <TextEntry>More Stock Info ...</TextEntry> : null}
          </StockDetailBody>
        </TextContainer>
        <IconContainer
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? <UpArrowIcon></UpArrowIcon> : <DownArrowIcon></DownArrowIcon>}
        </IconContainer>
      </div>
      {open ? 
      <div style={{display: "flex", alignItems: "center"}}>
          <TextContainer>
              <TextEntry>Low Price: $50.00</TextEntry>
              <TextEntry>High Price: $50.00</TextEntry>
              <TextEntry>Yesterdays Closing: $75.00</TextEntry>
              <TextEntry>Volume: 129428109</TextEntry>
          </TextContainer>
      </div>
      : null}
    </StockDetailContainer>
  );
}

const StockDetailContainer = styled.div`
  background: rgba(255, 255, 255, 0.16);
  border: 1px black solid;
  border-radius: 15px;
  margin: 20px;
  padding: 20px;
`;

const TextContainer = styled.div``;

const IconContainer = styled.div`
  margin-left: auto;
`;

const TextEntry = styled.div`
  color: white;
  margin: 10px 30px 10px 0px;
  font-size: 18px;
`;

const StockDetailHeader = styled.div`
  color: white;
  font-size: 30px;
`;

const StockDetailBody = styled.div`
  display: flex;
`;

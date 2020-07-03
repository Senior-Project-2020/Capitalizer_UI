import React from "react";
import styled from "styled-components";
import { SideBar } from "../components/SideBar";
import { SearchBar } from "../components/SearchBar";
import { SearchStockDetail } from "../components/SearchStockDetail";

export function StockPage() {
  return (
    <div style={{ display: "flex" }}>
      <SideBar></SideBar>
      <div style={{ flexGrow: "1" }}>
        <SearchBar></SearchBar>
        <DetailContainer>
          <SearchStockDetail></SearchStockDetail>
          <SearchStockDetail></SearchStockDetail>
          <SearchStockDetail></SearchStockDetail>
          <SearchStockDetail></SearchStockDetail>
          <SearchStockDetail></SearchStockDetail>
          <SearchStockDetail></SearchStockDetail>
          <SearchStockDetail></SearchStockDetail>
          <SearchStockDetail></SearchStockDetail>
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
    border-radius: 5px
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
import React from "react";
import styled from "styled-components";
import { Categories } from "../constants";

export function SideBar() {
  const AvailableCategories = [];

  for (const [index, value] of Categories.entries()) {
    AvailableCategories.push(
      <Category
        onClick={() => {
          /* TODO HANDLE CLICK */
        }}
      >
        {value}
      </Category>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 100px)",
      }}
    >
      <SideBarHeader>Stocks</SideBarHeader>
      <SideBarContainer>{AvailableCategories}</SideBarContainer>
    </div>
  );
}

const SideBarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  padding: 20px;
  border: 0.5px solid black;
  font-size: 30px;
`;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 40px 0px 40px;
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.16);
  white-space: nowrap;
`;

const Category = styled.div`
  font-size: 20px;
  line-height: 30px;
  color: white;
  :hover {
    color: #75a9f9;
  }
`;

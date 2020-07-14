import React, { useContext } from "react";
import { CapitalizerContext } from "../Context";
import styled from "styled-components";
import { Categories } from "../constants";

export function SideBar({ selected, setSelected }) {
  const AvailableCategories = [];

  for (const [index, value] of Categories.entries()) {
    AvailableCategories.push(
      <div key={index} style={selected === value ? {color: "#75a9f9"} : {color: "white"}}>
        <Category
          onClick={() => {
            if(selected === value){
              setSelected("");
            }else{
              setSelected(value);
            }
          }}
        >
          {value}
        </Category>
      </div>
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
  :hover {
    color: #75a9f9;
  }
`;

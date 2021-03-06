import React, { useContext } from "react";
import { CapitalizerContext } from "../Context";
import { SearchIcon } from "../icons/SearchIcon";
import styled from "styled-components";

export function SearchBar() {
  const [state, updateState] = useContext(CapitalizerContext);

  return (
    <SearchContainer>
      <SearchIcon></SearchIcon>
      <TextField
        onChange={(event) => {
          updateState({
            type: "update search",
            searchField: event.target.value,
          });
        }}
        value={state.searchField}
      ></TextField>
    </SearchContainer>
  );
}

const TextField = styled.textarea`
  height: 35px;
  padding-left: 10px;
  width: calc(100% - 55px);
  font-size: 30px;
  border: 0px;
  resize: None;
  outline: None;
  overflow: hidden;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 20px 20px 20px;
  padding-left: 15px;
  height: 40px;
  width: calc(100% - 55px);
  background: white;
  border-radius: 20px;
  border: 1px white;
`;

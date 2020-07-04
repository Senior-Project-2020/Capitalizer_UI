import React, { useState } from "react";
import styled from "styled-components";
import { CheckSelected, CheckUnSelected } from "../icons/CheckBox";
import { Categories } from "../constants";

export function InterestSelector() {
  //TODO take state from parent so the values can be updated from the api call
  const [selectedEntries, updateState] = useState([]);
  const Interests = [];

  for (const [index, value] of Categories.entries()) {
    Interests.push(
      <InterestEntry
        key={index}
        entry={value}
        state={selectedEntries}
        updateState={updateState}
      ></InterestEntry>
    );
  }

  return (
    <div style={{ display: "flex", margin: "20px" }}>
      <InterestSelectorContainer>
        <div
          style={{
            fontSize: "20px",
            color: "white",
            padding: "10px",
            alignSelf: "center",
          }}
        >
          Interests
        </div>
        {Interests}
      </InterestSelectorContainer>
    </div>
  );
}

const InterestSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.5px solid black;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.16);
`;

export function InterestEntry({ entry, state, updateState }) {
  let color = ((state.includes(entry) || state.length < 3) ? "#ffffff" : "#777777");

  function handleClick() {
    if (state.length < 3 && !state.includes(entry)) {
      updateState([...state, entry]);
    } else if (state.includes(entry)) {
      let index = state.indexOf(entry);
      state.splice(index, 1);
      updateState([...state]);
    }
  }

  return (
    <InterestContainer onClick={handleClick}>
      <InterestLabel
        style={{"color": color}}
      >{entry}</InterestLabel>
      <div style={{ marginLeft: "auto" }}>
        {state.includes(entry) ? (
          <CheckSelected></CheckSelected>
        ) : (
          <CheckUnSelected fill={color}></CheckUnSelected>
        )}
      </div>
    </InterestContainer>
  );
}

const InterestContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 20px;
`;

const InterestLabel = styled.div`
  color: white;
  padding-right: 25px;
`;

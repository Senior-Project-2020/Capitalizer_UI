import React from "react";
import styled from "styled-components";

export function Key({apikey}){
    return (
        <div style={{display: "flex"}}>
            <KeyHolder>API Key: {apikey}</KeyHolder>
        </div>
    );
}

const KeyHolder = styled.div`
    display: flex;
    font-size: 20px;
    color: white;
    background: rgba(255, 255, 255, 0.16);
    border: 0.5px solid black;
    border-radius: 2px;
    padding: 10px;
    margin: 20px;
`;

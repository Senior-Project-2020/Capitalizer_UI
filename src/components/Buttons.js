import React, { useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { CapitalizerContext } from "../Context";

const url = "http://54.198.60.36/api/v1/";

export function LogOutButton() {
  const history = useHistory();
  const [context, updateContext] = useContext(CapitalizerContext);
  
  return (
    <Button
      onClick={() => {
        sessionStorage.setItem("authToken", "");
        updateContext({
          type: "update token",
          token: "",
        });
        updateContext({
          type: "update user",
          user: {},
        });
        history.push("/");
      }}
    >
      Log Out
    </Button>
  );
}

export function LogInButton({ handleClick }) {
  return <Button onClick={handleClick}>Log In</Button>;
}

const Button = styled.button`
  background: rgba(255, 255, 255, 0.16);
  color: white;
  font: inherit;
  margin-bottom: 20px;
  padding: 5px 15px;
  font-size: 20px;
  border: 0.5px solid black;
  border-radius: 10px;
  outline: none;
`;

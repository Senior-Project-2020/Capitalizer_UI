import React from "react";
import styled from "styled-components";

export function LogOutButton() {
  // TODO: Implement on click
  return <Button>Log Out</Button>;
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

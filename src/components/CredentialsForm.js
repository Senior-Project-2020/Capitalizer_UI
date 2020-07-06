import React from "react";
import styled from "styled-components";

export function CredentialsForm({
  username,
  setUsername,
  password,
  setPassword,
}) {
  const star = "*";
  return (
    <div style={{ display: "flex" }}>
      <CredentialsFormContainer>
        <LabelInputPair>
          <Label>Username: </Label>
          <TextInput
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
          ></TextInput>
        </LabelInputPair>
        <LabelInputPair>
          <Label>Password:</Label>
          <TextInput
            style={{ webkitTextSecurity: "disc", textSecurity: "disc" }}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          ></TextInput>
        </LabelInputPair>
      </CredentialsFormContainer>
    </div>
  );
}

const CredentialsFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.16);
  border: 0.5 solid black;
  border-radius: 15px;
  padding: 10px;
  margin: 20px;
`;

const LabelInputPair = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  color: white;
  margin: 5px;
  font-size: 20px;
`;

const TextInput = styled.input`
  height: 23px;
  width: 300px;
  margin: 5px;
  font-size: 18px;
  border: 0px;
  resize: None;
  outline: None;
  overflow: hidden;
`;

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
            <label>Username: </label>
            <TextInput
                type="text" 
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            ></TextInput>
            {/* <TextInput
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
              style={{autocomplete: "username"}}
            ></TextInput> */}
          </LabelInputPair>
          <LabelInputPair>
            <label>Password:</label>
            <TextInput
                type="password" 
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
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
  color: white;
  margin: 5px;
  font-size: 20px;
`;

const TextInput = styled.input`
    width: 300px;
    border: 0px;
    margin: 5px;
    outline: none;
`;

import React, { useState, useContext } from "react";
import { CredentialsForm } from "../components/CredentialsForm";
import { LogInButton } from "../components/Buttons";
import { CapitalizerContext } from "../Context";
import axios from "axios";

export function LogInPage() {
  const [context, updateContext] = useContext(CapitalizerContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleClick(event){
    //Send auth request here then update the context with the returned user
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "200px"}}>
      <CredentialsForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      ></CredentialsForm>
      <LogInButton handleClick={handleClick}></LogInButton>
    </div>
  );
}

import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { CredentialsForm } from "../components/CredentialsForm";
import { LogInButton } from "../components/Buttons";
import { CapitalizerContext } from "../Context";
import { apiURL } from "../constants";
import axios from "axios";

export function LogInPage() {
  const history = useHistory();
  const [context, updateContext] = useContext(CapitalizerContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFail, setLoginFail] = useState(false);

  function handleClick(event) {
    const loginCredentials = {
      username: username,
      password: password,
    };

    axios
      .post(apiURL + "rest-auth/login/", loginCredentials)
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem("authToken", response.data.key);
          updateContext({
            type: "update token",
            token: response.data.key,
          });
          history.push("/dashboard");
        } else {
          setLoginFail(true);
        }
      })
      .catch(() => {
        setLoginFail(true);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      {loginFail ? (
        <h4 style={{ color: "red" }}>*Incorrect Username or Password*</h4>
      ) : null}
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

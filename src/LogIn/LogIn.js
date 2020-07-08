import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { CredentialsForm } from "../components/CredentialsForm";
import { LogInButton } from "../components/Buttons";
import { CapitalizerContext } from "../Context";
import axios from "axios";

const url = "http://54.198.60.36/api/v1/"

export function LogInPage() {
  const history = useHistory();
  const [context, updateContext] = useContext(CapitalizerContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFail, setLoginFail] = useState(false);

  function handleClick(event){
    const loginCredntials = {
        username: username,
        password: password,
    }

    axios.post(url + "rest-auth/login/", loginCredntials).then((response) => {
        if(response.status == 200){
            updateContext({
                type: "update token",
                token: response.data.key,
            })
            console.log(response.data.key)
            axios.get(url + "rest-auth/user/", {headers: {Authorization: "Token " + response.data.key}}).then((response) => {
              updateContext({
                type: "update user",
                user: response.data,
              })
            })
            history.push("/dashboard");
        }else{
            setLoginFail(true);
        }
    }).catch(() => {
        setLoginFail(true);
    })
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "200px"}}>
      {loginFail ? <h4 style={{color: "red"}}>*Incorrect Username or Password*</h4> : null}
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

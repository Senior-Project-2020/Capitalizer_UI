import React, { useContext, useEffect, useState } from "react";
import { CapitalizerContext } from "../Context";
import { InterestSelector } from "../components/InterestSelector";
import { LogOutButton } from "../components/Buttons";
import { Key } from "../components/Key";
import axios from "axios";
import { apiURL } from "../constants";

export function ProfilePage() {
  const [context, updateContext] = useContext(CapitalizerContext);

  useEffect(() => {
    if (context.authToken != "") {
      axios
        .get(apiURL + "rest-auth/user/", {
          headers: { Authorization: "Token " + context.authToken },
        })
        .then((response) => {
          updateContext({
            type: "update user",
            user: response.data,
          });
        });
    }
  }, [context.authToken]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ color: "white" }}>Welcome {context.user.username}!</h1>
      <Key apikey={context.authToken}></Key>
      <LogOutButton></LogOutButton>
    </div>
  );
}

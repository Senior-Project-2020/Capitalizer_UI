import React, { useContext, useEffect, useState } from "react";
import { CapitalizerContext } from "../Context";
import { InterestSelector } from "../components/InterestSelector";
import { LogOutButton } from "../components/Buttons";
import { Key } from "../components/Key";
import axios from "axios";

const url = "http://54.198.60.36/api/v1/";

export function ProfilePage() {
  const [context, updateContext] = useContext(CapitalizerContext);
  const [selectedEntries, updateState] = useState([]);

  useEffect(() => {
    if (context.authToken != "") {
      axios
        .get(url + "rest-auth/user/", {
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

  useEffect(() => {
    if (Object.keys(context.user).length != 0 && context.authToken != "") {
      axios
        .get(url + "interest/", {
          headers: { Authorization: "Token " + context.authToken },
        })
        .then((response) => {
          const possibleInterests = response.data.results;
          let entries = [];

          for (var interest in possibleInterests) {
            if (
              context.user["interests"].includes(
                possibleInterests[interest]["id"]
              )
            ) {
              entries = [...entries, possibleInterests[interest]["interest"]];
            }
          }

          updateState(entries);
        });
    }
  }, [context.authToken, context.user]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ color: "white" }}>Welcome {context.user.username}!</h1>
      <Key apikey={context.authToken}></Key>
      <InterestSelector
        selectedEntries={selectedEntries}
        updateState={updateState}
      ></InterestSelector>
      <LogOutButton></LogOutButton>
    </div>
  );
}

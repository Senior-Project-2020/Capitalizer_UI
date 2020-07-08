import React, { useContext } from "react";
import { CapitalizerContext } from "../Context";
import { InterestSelector } from "../components/InterestSelector";
import { LogOutButton } from "../components/Buttons";
import { Key } from "../components/Key";

export function ProfilePage() {
  const [context, ] = useContext(CapitalizerContext);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ color: "white" }}>Welcome Carter!</h1>
      <Key apikey={context.user}></Key>
      <InterestSelector></InterestSelector>
      <LogOutButton></LogOutButton>
    </div>
  );
}

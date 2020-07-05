import React from "react";
import { InterestSelector } from "../components/InterestSelector";
import { LogOutButton } from "../components/Buttons";
import { Key } from "../components/Key";

export function ProfilePage() {
  const testKey = "FD#&@Sjfs812j21jlf";
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ color: "white" }}>Welcome Carter!</h1>
      <Key apikey={testKey}></Key>
      <InterestSelector></InterestSelector>
      <LogOutButton></LogOutButton>
    </div>
  );
}

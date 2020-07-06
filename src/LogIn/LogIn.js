import React, { useState } from "react";
import { CredentialsForm } from "../components/CredentialsForm";

export function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <CredentialsForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    ></CredentialsForm>
    
  );
}

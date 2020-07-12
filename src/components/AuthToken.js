import React, { useContext, useEffect } from "react";
import { CapitalizerContext } from "../Context";

export function AuthToken() {
  const [context, updateContext] = useContext(CapitalizerContext);
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    updateContext({
      type: "update token",
      token: token,
    });
  }, []);

  return <div></div>;
}

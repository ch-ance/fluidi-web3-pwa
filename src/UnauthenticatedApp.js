import React from "react";
import { useAuth } from "@altrx/gundb-react-auth";
import sea from "gun/sea";

export default function LoginView() {
  return (
    <div id="splash">
      <h1 id="appName">Fluidi</h1>
      <button onClick={newUser}>New user click here</button>
    </div>
  );

  async function newUser() {
    const keys = await sea.pair();
    console.log(keys);
    localStorage.setItem("authKeys", JSON.stringify(keys));
  }
}

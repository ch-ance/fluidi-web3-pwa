import React, { useState } from "react";
import { useAuth } from "./context";
import gun from "./gun";

export default function LoginView() {
  const [alias, setAlias] = useState("");
  const [pass, setPass] = useState("");
  const { setUser } = useAuth();
  return (
    <div id="splash">
      <h1 id="appName">Fluidi</h1>
      <input
        value={alias}
        placeholder="username"
        onChange={(e) => setAlias(e.target.value)}
      />
      <input
        value={pass}
        placeholder="password"
        onChange={(e) => setPass(e.target.value)}
      />
      <br />
      <br />
      <button onClick={newUser}>New user click here</button>
      <br />
      <br />
      <button onClick={existingUser}>Existing user click here</button>
    </div>
  );

  async function newUser() {
    const user = gun.user();
    user.create(alias, pass, (ack) => {
      console.log(ack);
      setUser(user);
    });
    // window.location.reload();
  }

  async function existingUser() {
    const user = gun.user();
    user.auth(alias, pass, (ack) => {
      console.log(ack);
      setUser(user);
    });
  }
}

import React, { useState } from "react";
import gun from "./gun";
import Login from "./components/Login/Login";
export default function LoginView({ setIsLoggedIn }) {
  const [alias, setAlias] = useState("");
  const [pass, setPass] = useState("");

  return (
    <Login
      login={login}
      alias={alias}
      setAlias={setAlias}
      pass={pass}
      setPass={setPass}
    />
  );

  function login(e) {
    e.preventDefault();
    try {
      newUser();
    } catch (err) {
      console.error(err);
      existingUser();
    }
  }

  async function newUser() {
    const user = gun.user().recall({ sessionStorage: true });
    user.create(alias, pass, () => {
      user.auth(alias, pass);
      setIsLoggedIn(true);
    });
  }

  async function existingUser() {
    const user = gun.user().recall({ sessionStorage: true });
    user.auth(alias, pass, (ack) => {
      console.log(ack);
      setIsLoggedIn(true);
    });
  }
}

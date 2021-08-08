import React, { useState } from "react";
import gun from "./gun";
import Login from "./components/Login/Login";
import { useHistory } from "react-router-dom";

export default function LoginView({ setIsLoggedIn }) {
  const [alias, setAlias] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();

  return (
    <Login
      login={login}
      alias={alias}
      setAlias={setAlias}
      pass={pass}
      setPass={setPass}
    />
  );

  async function login(e) {
    e.preventDefault();
    try {
      newUser();
    } catch (err) {
      existingUser();
    }
  }

  async function newUser() {
    const user = gun.user().recall({ sessionStorage: true });
    user.create(alias, pass, async () => {
      user.auth(alias, pass);
      setIsLoggedIn(true);
      setTimeout(() => {
        window.location.replace("/onboarding");
        window.location.reload();
      }, 1000);
    });
  }

  async function existingUser() {
    const user = gun.user().recall({ sessionStorage: true });
    user.auth(alias, pass, (ack) => {
      console.log(ack);
      setIsLoggedIn(true);
      setTimeout(() => {
        window.location.replace("/onboarding");
        window.location.reload();
      }, 1000);
    });
  }
}

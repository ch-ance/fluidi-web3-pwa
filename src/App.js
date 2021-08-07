import { useEffect, useState, useReducer, Suspense, lazy } from "react";
import Gun from "gun";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatRoomView from "./views/ChatRoomView";
import gun from "./gun";
import { AuthProvider, useAuth } from "./context";
const AuthenticatedApp = lazy(() =>
  import(/* webpackPrefetch: true */ "./AuthenticatedApp")
);
const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));

function App() {
  const user = gun.user().recall({ sessionStorage: true });

  console.info("user", user);
  console.log("user is", user.is);

  return (
    <Suspense fallback={<p>loading...</p>}>
      {user?.is?.pub ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
}

export default App;

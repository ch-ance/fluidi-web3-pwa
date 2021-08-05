import { useEffect, useState, useReducer, Suspense, lazy } from "react";
import Gun from "gun";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatRoomView from "./views/ChatRoomView";
import { useAuth } from "@altrx/gundb-react-auth";
const AuthenticatedApp = lazy(() =>
  import(/* webpackPrefetch: true */ "./AuthenticatedApp")
);
const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));


function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Suspense fallback={<p>loading...</p>}>
      {isLoggedIn ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
    </Suspense>
  );
}

export default App;

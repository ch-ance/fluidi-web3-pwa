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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    console.info(`USER!`, user);
  }, [user]);

  return (
    <Suspense fallback={<p>loading...</p>}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
}

export default App;

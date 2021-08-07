import { useEffect, useState, useReducer, Suspense, lazy } from "react";
import ChatRoomView from "./views/ChatRoomView";
import gun from "./gun";
import { AuthProvider, useAuth } from "./context";
const AuthenticatedApp = lazy(() =>
  import(/* webpackPrefetch: true */ "./AuthenticatedApp")
);
const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));

function App() {
  const user = gun.user().recall({ sessionStorage: true });
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <Suspense fallback={<p>loading...</p>}>
      {user?.is?.pub || isLoggedIn ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp setIsLoggedIn={setIsLoggedIn}/>
      )}
    </Suspense>
  );
}

export default App;

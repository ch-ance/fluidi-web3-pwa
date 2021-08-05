import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatRoomView from "./views/ChatRoomView";

const AuthenticatedApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h1>Home page</h1>
        </Route>
        <Route exact path="/chat">
          <ChatRoomView />
        </Route>
      </Switch>
    </Router>
  );
};

export default AuthenticatedApp;

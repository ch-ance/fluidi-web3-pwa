import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatRoomView from "./views/ChatRoomView";
import gun from './gun';
import ChatContactsView from "./views/ChatContactsView";

const AuthenticatedApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h1>Home page</h1>
        </Route>
        <Route exact path="/chat">
          <ChatContactsView />
        </Route>

        <Route exact path="/chat/:id">
          <ChatRoomView />
        </Route>
      </Switch>
    </Router>
  );
};

export default AuthenticatedApp;

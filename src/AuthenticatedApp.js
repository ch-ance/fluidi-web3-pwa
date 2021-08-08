import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatRoomView from "./views/ChatRoomView";
import gun from "./gun";
import HomeFeedView from "./views/HomeFeedView";
import ChatContactsView from "./views/ChatContactsView";
import FollowPeerView from "./views/FollowPeerView";
import OnboardingView from "./views/OnboardingView";

const AuthenticatedApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/onboarding">
          <OnboardingView />
        </Route>
        <Route exact path="/">
          <HomeFeedView />
        </Route>
        <Route exact path="/chat">
          <ChatContactsView />
        </Route>
        <Route exact path="/chat/:id">
          <ChatRoomView />
        </Route>
        <Route exact path="/follow/:id">
          <FollowPeerView />
        </Route>
      </Switch>
    </Router>
  );
};

export default AuthenticatedApp;

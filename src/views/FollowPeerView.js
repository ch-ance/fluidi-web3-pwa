import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import gun from "../gun";

const FollowPeerView = () => {
    const history = useHistory();

    useEffect(() => {
    const user = gun.user().recall({ sessionStorage: true });
    const index = window.location.pathname.indexOf("follow/");
    const peerId = window.location.pathname.slice(index + 7);
    console.log(peerId);
    const alias = prompt("What do you want to call this person?");
    user.get("following").set({ pub: peerId, alias });
        history.push('/')
  }, []);

  return <h1>following...</h1>;
};

export default FollowPeerView;

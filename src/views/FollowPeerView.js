import { useEffect } from "react";
import gun from "../gun";

const FollowPeerView = () => {
  useEffect(() => {
    const user = gun.user().recall({ sessionStorage: true });
    const index = window.location.pathname.indexOf("follow/");
    const peerId = window.location.pathname.slice(index + 7);
    console.log(peerId);
    user.get("following").set(peerId);
  }, []);

  return <h1>following</h1>;
};

export default FollowPeerView;

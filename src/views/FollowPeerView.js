import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import gun from "../gun";

const FollowPeerView = () => {
  const history = useHistory();

  useEffect(() => {
    const user = gun.user().recall({ sessionStorage: true });
    const index = window.location.pathname.indexOf("follow/");
    const peerId = window.location.pathname.slice(index + 7);
    const alias = "user alias";
    // gun.get(user.is.pub).get("followinfg").get(peerId).put(null);
    gun
      .get(user.is.pub)
      .get("following")
      .put({ pub: peerId, alias }, (ack) => {
        // history.push("/");
        console.log(ack);
      });
  }, []);

  return <h1>following...</h1>;
};

export default FollowPeerView;

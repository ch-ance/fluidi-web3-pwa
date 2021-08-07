import Gun from "gun";

const peers = ["https://gun-us.herokuapp.com/gun"];

const gun = Gun({ peers });
export default gun;

import Gun from "gun";

// const peers = ["https://gun-us.herokuapp.com/gun"];

const peers = ["http://localhost:8765/gun"];

const gun = Gun({ peers });
export default gun;

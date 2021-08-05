import { useEffect, useState, useReducer } from "react";
import { useGun, useGunCollectionState } from "@altrx/gundb-react-hooks";
import { useAuth } from "@altrx/gundb-react-auth";
import Gun from "gun";

const initialState = {
  messages: [],
};

const appName = "fluidi111";

function messagesReducer(state, message) {
  return {
    messages: [...state.messages, message],
  };
}

function ChatRoomView() {
  // the form state manages the form input for creating a new message
  const [formState, setForm] = useState({
    name: "",
    message: "",
  });
  const { user, sea } = useAuth();
  const certificate = sea.certify("*");
  const [gun] = useGun(Gun, { peers: ["https://gun-us.herokuapp.com/gun"] });

  // initialize the reducer & state for holding the messages array
  const [state, dispatch] = useReducer(messagesReducer, initialState);

  // when the ChatRoomView loads, fetch the current messages and load them into the state
  // this also subscribes to new data as it changes and updates the local state
  useEffect(() => {
    const messages = gun.get(appName);
    messages.map().on((m) => {
      dispatch({
        name: m.name,
        message: m.message,
        createdAt: m.createdAt,
      });
    });
  }, []);

  // set a new message in gun, update the local state to reset the form field
  function saveMessage() {
    const messages = gun.get(appName);
    messages.set({
      name: formState.name,
      message: formState.message,
      createdAt: Date.now(),
    });
    setForm({
      name: "",
      message: "",
    });
  }

  // update the form state as the user types
  function onChange(e) {
    setForm({ ...formState, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <header>
        <h1>fluidi pool</h1>
      </header>
      <div style={{ padding: 30 }}>
        <input
          onChange={onChange}
          placeholder="Name"
          name="name"
          value={formState.name}
        />
        <input
          onChange={onChange}
          placeholder="Message"
          name="message"
          value={formState.message}
        />
        <button onClick={saveMessage}>Send Message</button>
        {state.messages.map((message) => (
          <div key={message.createdAt}>
            <h2>{message.message}</h2>
            <h3>From: {message.name}</h3>
            <p>Date: {message.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatRoomView;

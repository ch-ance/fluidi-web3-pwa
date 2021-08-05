import { useEffect, useState, useReducer, useRef } from "react";
import gun from "../gun";
import sea from "gun/sea";

const initialState = {
  messages: [],
};

const appName = "fluidiab";

function messagesReducer(state, message) {
  return {
    messages: [message, ...state.messages],
  };
}

function ChatRoomView() {
  // the form state manages the form input for creating a new message
  const [formState, setForm] = useState({
    message: "",
  });
  const inputRef = useRef(null);
  const certificate = sea.certify("*");

  // initialize the reducer & state for holding the messages array
  const [state, dispatch] = useReducer(messagesReducer, initialState);

  // when the ChatRoomView loads, fetch the current messages and load them into the state
  // this also subscribes to new data as it changes and updates the local state
  useEffect(() => {
    const messages = gun.get(appName).get("messages");
    messages.map().on((m) => {
      dispatch({
        name: m.name,
        message: m.message,
        createdAt: m.createdAt,
      });
    });
  }, []);

  function scrollToBottom() {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // set a new message in gun, update the local state to reset the form field
  function saveMessage() {
    const messages = gun.get(appName).get("messages");
    messages.set({
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
        {state.messages
          .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
          .map((message) => (
            <div key={message.createdAt}>
              <h2>{message.message}</h2>
              <p>Date: {message.createdAt}</p>
            </div>
          ))}
      </div>
      <div></div>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ position: "fixed", bottom: 0, right: 0 }}
      >
        <button onClick={scrollToBottom}>Scroll to Bottom</button>
        <input
          onChange={onChange}
          placeholder="Message"
          name="message"
          value={formState.message}
        />
        <button onClick={saveMessage}>Send Message</button>
      </form>
      <div ref={inputRef} />
    </div>
  );
}

export default ChatRoomView;

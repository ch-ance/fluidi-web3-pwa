import React, { useEffect, useState, useReducer, useRef } from "react";
import gun from "../gun";
import sea from "gun/sea";
import ChatArea from "../components/ChatArea";
import { useHistory } from "react-router-dom";

const initialState = {
  messages: [],
};

function messagesReducer(state, message) {
  return {
    messages: [message, ...state.messages],
  };
}

function ChatRoomView() {
  // the form state manages the form input for creating a new message
  const [formState, setFormState] = useState({
    message: "",
  });
  const inputRef = useRef(null);
  const history = useHistory();
  const roomName = history.location.pathname;
  console.log(roomName);
  const certificate = sea.certify("*");
  const user = JSON.parse(localStorage.getItem("gap/gun/"));
  const pk = user[Object.keys(user)[0]].pub;
  // initialize the reducer & state for holding the messages array
  const [state, dispatch] = useReducer(messagesReducer, initialState);

  // when the ChatRoomView loads, fetch the current messages and load them into the state
  // this also subscribes to new data as it changes and updates the local state
  useEffect(() => {
    const messages = gun.get("fluidi").get("rooms").get(roomName);
    messages.map().on((m) => {
      dispatch({
        message: m.message,
        createdAt: m.createdAt,
        userPk: m.userPk,
      });
    });
  }, []);

  // set a new message in gun, update the local state to reset the form field
  async function saveMessage() {
    if (!formState.message) return;
    try {
      const messages = gun.get("fluidi").get("rooms").get(roomName);
      await messages.set({
        message: formState.message,
        createdAt: Date.now(),
        userPk: pk,
      });
      setFormState({
        name: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
    }
  }

  // update the form state as the user types
  function onChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <header>
        <h1>fluidi pool</h1>
      </header>
      <ChatArea
        messages={state.messages}
        saveMessage={saveMessage}
        formState={formState}
        onChange={onChange}
      />
      {/* <div style={{ padding: 30 }}>
        {state.messages
          .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
          .map((message) => (
            <div key={Math.random()}>
              <h2>{message.message}</h2>
              <h3>{JSON.stringify(message)}</h3>
              <p>Date: {message.createdAt}</p>
            </div>
          ))}
      </div>
      <div></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveMessage();
        }}

        // style={{ position: "fixed", bottom: 0, right: 0 }}
      >
        <button onClick={scrollToBottom}>Scroll to Bottom</button>
        <input
          onChange={onChange}
          placeholder="Message"
          name="message"
          value={formState.message}
          autoFocus={true}
        />
        <button type="submit">Send Message</button>
      </form> */}
    </div>
  );
}

export default React.memo(ChatRoomView);

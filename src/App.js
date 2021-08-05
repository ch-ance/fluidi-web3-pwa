import { useEffect, useState, useReducer } from "react";
import Gun from "gun";

const gun = Gun({
  peers: ["https://gunjs.herokuapp.com/gun"],
});

const initialState = {
  messages: [],
};

function reducer(state, message) {
  return {
    messages: [...state.messages, message],
  };
}

function App() {
  // the form state manages the form input for creating a new message
  const [formState, setForm] = useState({
    name: "",
    message: "",
  });

  // initialize the reducer & state for holding the messages array
  const [state, dispatch] = useReducer(reducer, initialState);

  // when the app loads, fetch the current messages and load them into the state
  // this also subscribes to new data as it changes and updates the local state
  useEffect(() => {
    const messages = gun.get("fluidi-123123123");
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
    const messages = gun.get("fluidi-123123123");
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

export default App;

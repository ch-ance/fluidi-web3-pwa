import { useEffect, useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import gun from "../gun";

const initialState = {
  contacts: [],
};

function contactsReducer(state, contact) {
  return {
    contacts: [contact, ...state.contacts],
  };
}

const ChatContacts = () => {
  const [state, dispatch] = useReducer(contactsReducer, initialState);
  const [roomName, setRoomName] = useState("");
  const history = useHistory();

  useEffect(() => {
    const _contacts = gun.get("fluidi").get("contacts");
    _contacts.map().on((contact) => {
      dispatch(contact);
      console.log(contact);
    });
  }, []);

  return (
    <div>
      <input
        value={roomName}
        placeholder="room name..."
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={joinRoom}>enter a new room</button>
      <ul>
        {state.contacts.map((contact) => {
          return <li onClick={() => goToRoom(contact.name)}>{contact.name}</li>;
        })}
      </ul>
    </div>
  );

  function joinRoom() {
    gun.get("fluidi").get("contacts").set({ name: roomName });
  }

  function goToRoom(name) {
    history.push(`/chat/${name}`);
  }
};

export default ChatContacts;

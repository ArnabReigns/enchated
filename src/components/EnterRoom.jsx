import React, { useState } from "react";
import io from "socket.io-client";

// const socket = io.connect("http://localhost:3000");

const EnterRoom = ({cb,rm}) => {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");

  const createRoom = () => {
    socket.emit("createRoom", roomName, (response) => {
      if (response.error) {
        setError(response.error);
      } else {
        rm(roomName);
        cb(true);
      }
    });
  };

  const joinRoom = () => {
    socket.emit("joinRoom", roomName, (response) => {
      if (response.error) {
        setError(response.error);
      } else {
        rm(roomName);
        cb(true);
      }
    });
  };

  return (
    <div className="enter-room">
      <div className="settings">
      <input
        placeholder="Enter Room Name"
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        />
      <div className="btnCont">
        <button onClick={createRoom}>Create</button>
        <button onClick={joinRoom}>Join</button>
      </div>
      </div>
      <span className="msg">{error && <p>{error}</p>}</span>
    </div>
  );
};

export default EnterRoom;
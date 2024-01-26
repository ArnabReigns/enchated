import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import CryptoJS from "crypto-js";

const socket = io.connect("https://chatservice-q0f7.onrender.com");

const encryptMessage = (message, key) => {
  if (typeof message !== "string" || message.trim() === "") {
    throw new Error("Invalid message format");
  }

  const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();
  return encryptedMessage;
};

const decryptMessage = (encryptedMessage, key) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
  } catch (error) {
    console.error("Error decrypting message:", error);
    // Handle the error gracefully, such as returning an empty string or an error message
    return "";
  }
};

const ChatScreen = () => {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [enc, setEnc] = useState("");
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  },[]);

  

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      console.log('encrypt key: ',enc);
      const data = encryptMessage(message,enc);
      socket.emit("chatMessage", { data, user });
    }
  };

  return (
    <div className="chat-screen">
      <div className="title">
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div className="chat-container">
        <div className="chats">
          {messages.map((data,idx) => (
            <p key={idx}>
              {data.user} : {decryptMessage(data.text,enc)}
            </p>  
          ))}
        </div>
        <div className="chat-controls">
          <input
            type="text"
            id="chat"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={() => handleSendMessage()}>Send</button>
          <input
            type="text"
            id="enc"
            value={enc}
            onChange={(e) => setEnc(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;

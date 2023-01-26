import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import "./styles.css";

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = openSocket("http://localhost:8000");
    setSocket(socket);
    socket.on("message", (msg) => {
      setMessages((prevMsgs) => [...prevMsgs, msg]);
    });
    socket.on("response", (res) => {
      setResponse(res);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  function sendMessage() {
    socket.emit("message", message);
    setMessage("");
  }

  return (
    <div className="chat-container">
      <ul className="messages-container">
        {messages.map((msg, index) => (
          <li className="message" key={index} style={index && index % 2 !== 0 ? { border: "2px solid blue", marginBottom: "-50px" } : { border: "2px solid red" }}>
            {msg}
          </li>
        ))}
      </ul>
      {/* <p className="response">{response}</p> */}
      <div className="input-container">
        <input className="message-input" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;

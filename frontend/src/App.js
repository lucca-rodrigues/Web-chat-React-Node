import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import "./styles.css";

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [showTextChat, setShowTextChat] = useState(false);

  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = openSocket("http://localhost:3333");
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
    socket.emit("message", { username: username, message: message });
    setMessage("");
  }

  return (
    <div className="chat-container">
      {!showTextChat && (
        <div className="user-name">
          <input className="message-input" type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} placeholder="Nome" />
          <button onClick={() => setShowTextChat(true)}>Enter</button>
        </div>
      )}

      {showTextChat && (
        <>
          <ul className="messages-container">
            {messages.map((msg, index) => (
              <li className="message" key={index} style={index && index % 2 !== 0 ? { border: "2px solid blue", marginBottom: "-50px" } : { border: "2px solid red" }}>
                {msg}
              </li>
            ))}
          </ul>

          <div className="input-container">
            <input className="message-input" type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Digite a sua mensagem ..." />
            <button className="send-button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

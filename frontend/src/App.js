import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";

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
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <p>{response}</p>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;

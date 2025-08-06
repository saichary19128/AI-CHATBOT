import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", content: message };
    setChatLog([...chatLog, userMsg]);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message,
      });
      const botReply = { role: "assistant", content: res.data.reply };
      setChatLog((prev) => [...prev, botReply]);
    } catch (err) {
      const errorReply = {
        role: "assistant",
        content: "⚠️ Error: AI server not responding.",
      };
      setChatLog((prev) => [...prev, errorReply]);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>💬 AI FAQ Chatbot</h1>
        <p>Ask questions and get instant AI answers</p>
      </header>

      <div className="chat-box">
        {chatLog.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
          >
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;



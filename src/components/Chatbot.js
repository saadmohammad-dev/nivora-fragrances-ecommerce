import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { getBotResponse, OPENING_MESSAGE } from "./chatbotEngine";
import "./Chatbot.css";

const NAV_MAP = {
  "Show Men's collection": "/shop?gender=men",
  "Show Women's collection": "/shop?gender=women",
  "Show me the Shop": "/shop",
  "Show discounted perfumes": "/shop?sort=price-asc",
  "Take the Scent Quiz": "/quiz",
  "Go to Track Order": "/track",
  "Track my order": "/track",
  "Show membership plans": "/membership",
  "Membership benefits": "/membership",
  "Open Contact page": "/contact",
  "Contact a human": "/contact"
};

export default function Chatbot({ isOpen, onOpen, onClose }) {
  const [messages, setMessages] = useState([{ from: "bot", ...OPENING_MESSAGE }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  function respondTo(text) {
    setMessages((prev) => [...prev, { from: "user", text }]);
    setIsTyping(true);
    // Small delay makes the bot feel like it's actually "thinking" rather
    // than instantly dumping a canned reply.
    setTimeout(() => {
      const reply = getBotResponse(text);
      setMessages((prev) => [...prev, { from: "bot", ...reply }]);
      setIsTyping(false);
    }, 550);
  }

  function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    respondTo(trimmed);
    setInput("");
  }

  function handleQuickReply(label) {
    if (NAV_MAP[label]) {
      setMessages((prev) => [
        ...prev,
        { from: "user", text: label },
        { from: "bot", text: `Taking you there now — enjoy! 🌸`, quickReplies: [] }
      ]);
      navigate(NAV_MAP[label]);
      return;
    }
    respondTo(label);
  }

  if (!isOpen) {
    return (
      <button className="chatbot-fab" onClick={onOpen} aria-label="Open Nivora Assistant chat">
        <MessageCircle size={24} />
        <span className="chatbot-fab-pulse" />
      </button>
    );
  }

  return (
    <div className="chatbot-window" role="dialog" aria-label="Nivora Assistant chat">
      <div className="chatbot-header">
        <div className="chatbot-header-title">
          <Sparkles size={18} />
          <div>
            <strong>Nivora Assistant</strong>
            <span>Usually replies instantly</span>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close chat"><X size={20} /></button>
      </div>

      <div className="chatbot-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble-row ${m.from === "user" ? "row-user" : "row-bot"}`}>
            <div className={`chat-bubble ${m.from === "user" ? "bubble-user" : "bubble-bot"}`}>
              {m.text}
            </div>
            {m.from === "bot" && m.quickReplies && m.quickReplies.length > 0 && (
              <div className="chat-quick-replies">
                {m.quickReplies.map((q) => (
                  <button key={q} onClick={() => handleQuickReply(q)}>{q}</button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="chat-bubble-row row-bot">
            <div className="chat-bubble bubble-bot chat-typing">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      <form className="chatbot-input-row" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Ask about perfumes, orders, membership…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" aria-label="Send message"><Send size={17} /></button>
      </form>
    </div>
  );
}
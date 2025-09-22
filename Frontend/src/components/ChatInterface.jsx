import React, { useEffect, useRef } from "react";
import { Logo, UserIcon } from "./Icons.jsx";

const ChatInterface = ({ messages, theme, currentTheme }) => {
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="pt-8 pb-4 space-y-6">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-start gap-4 ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center border ${
              currentTheme.border
            } ${currentTheme.panelBg} ${
              msg.sender === "user" ? "order-2" : "order-1"
            }`}
          >
            {msg.sender === "ai" ? <Logo theme={theme} /> : <UserIcon />}
          </div>
          <div
            className={`max-w-xl p-3.5 rounded-lg ${
              msg.sender === "user"
                ? "order-1 bg-indigo-600 text-white"
                : `order-2 ${currentTheme.panelBg} border ${currentTheme.border}`
            }`}
          >
            <p className="whitespace-pre-wrap text-sm leading-6">{msg.text}</p>
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatInterface;

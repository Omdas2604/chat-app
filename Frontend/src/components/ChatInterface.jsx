import React, { useEffect, useRef } from "react";
import { Logo, UserIcon } from "./Icons.jsx";

const ChatInterface = ({ messages, theme, currentTheme }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom smoothly when new messages are added
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="pt-8 pb-4 space-y-8">
      {messages.map((msg) => (
        // IMPORTANT: Use a unique message ID for the key instead of index.
        // This is crucial for performance and prevents rendering bugs.
        // Ensure each message object you create has a unique `id`.
        <div
          key={msg.id}
          // The 'animate-message-in' class applies our new animation
          className={`flex items-start gap-4 animate-message-in ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {/* Avatar */}
          <div
            className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center shadow-md border ${
              currentTheme.border
            } ${currentTheme.panelBg} ${
              msg.sender === "user" ? "order-2" : "order-1"
            }`}
          >
            {msg.sender === "ai" ? <Logo theme={theme} /> : <UserIcon />}
          </div>

          {/* Chat Bubble */}
          <div
            className={`max-w-xl p-4 rounded-2xl shadow-md ${
              msg.sender === "user"
                ? "order-1 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-lg"
                : `order-2 rounded-bl-lg border ${
                    currentTheme.border
                  } ${
                    theme === "dark" ? "bg-zinc-800/50" : "bg-white"
                  }`
            }`}
          >
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {msg.text}
            </p>
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatInterface;
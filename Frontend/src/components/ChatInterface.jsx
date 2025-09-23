import React, { useEffect, useRef } from "react";
import { Logo, UserIcon } from "./Icons.jsx";


const ChatInterface = ({ messages, isAiTyping, theme, currentTheme }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when new messages or the typing indicator appear
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]); // CHANGED: Added isAiTyping to the dependency array

  return (
    <div className="pt-8 pb-4 space-y-8">
      {messages.map((msg) => (
        <div
          key={msg.id}
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

      {/* NEW: Loader/Typing indicator */}
      {isAiTyping && (
        <div className="flex items-start gap-4 justify-start animate-message-in">
          {/* AI Avatar */}
          <div
            className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center shadow-md border ${currentTheme.border} ${currentTheme.panelBg}`}
          >
            <Logo theme={theme} />
          </div>
          {/* Typing Bubble */}
          <div
            className={`max-w-xl p-4 rounded-2xl rounded-bl-lg shadow-md border ${
              currentTheme.border
            } ${theme === "dark" ? "bg-zinc-800/50" : "bg-white"}`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <span className="h-2 w-2 bg-zinc-400 rounded-full animate-bounce delay-0"></span>
              <span className="h-2 w-2 bg-zinc-400 rounded-full animate-bounce delay-150"></span>
              <span className="h-2 w-2 bg-zinc-400 rounded-full animate-bounce delay-300"></span>
            </div>
          </div>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatInterface;
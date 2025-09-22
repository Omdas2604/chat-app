import React from "react";
import { SendIcon } from "./Icons.jsx";

const ChatInput = ({
  inputValue,
  setInputValue,
  handlePromptSubmit,
  currentTheme,
  theme,
}) => (
  <div className={`flex-shrink-0 bg-transparent`}>
    <form onSubmit={handlePromptSubmit} className="max-w-4xl mx-auto p-4">
      <div
        className={`relative border rounded-xl ${currentTheme.border} ${
          theme === "dark" ? "bg-zinc-950" : "bg-white"
        }`}
      >
        <textarea
          rows="1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handlePromptSubmit(e);
            }
          }}
          placeholder="Message Zenith..."
          className={`w-full pl-4 pr-16 py-3 text-sm resize-none bg-transparent focus:outline-none ${currentTheme.placeholder}`}
        />
        <button
          type="submit"
          aria-label="Submit prompt"
          disabled={!inputValue.trim()}
          className={`absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-lg transition-colors duration-200 ${
            inputValue.trim()
              ? "bg-indigo-600 text-white"
              : `${currentTheme.textMuted} bg-transparent cursor-not-allowed'}`
          }`}
        >
          <SendIcon />
        </button>
      </div>
      <p className="text-center text-xs mt-3 text-zinc-500">
        Zenith can make mistakes. Consider checking important information.
      </p>
    </form>
  </div>
);

export default ChatInput;

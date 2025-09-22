import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

// Import all the new components
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import ChatInterface from "../components/ChatInterface.jsx";
import ChatInput from "../components/ChatInput.jsx";
import LandingContent from "../components/LandingContent.jsx";
import TitleModal from "../components/TitleModal.jsx";

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isChatActive, setIsChatActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // State for the modal
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");

  const colors = {
    light: {
      bg: "bg-zinc-100",
      text: "text-zinc-900",
      textMuted: "text-zinc-500",
      border: "border-zinc-200",
      panelBg: "bg-white",
      sidebarBg: "bg-zinc-50",
      placeholder: "placeholder:text-zinc-400",
    },
    dark: {
      bg: "bg-black",
      text: "text-gray-50",
      textMuted: "text-zinc-400",
      border: "border-zinc-800",
      panelBg: "bg-zinc-900",
      sidebarBg: "bg-zinc-950",
      placeholder: "placeholder:text-zinc-600",
    },
  };
  const currentTheme = theme === "dark" ? colors.dark : colors.light;

  const handlePromptSubmit = (e) => {
    if (e) e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    if (!isChatActive) {
      setIsChatActive(true);
    }

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `This is a simulated AI response for your query: "${text}". The possibilities are endless.`,
        },
      ]);
    }, 1200);
  };

  const handleNewChatClick = () => {
    setIsTitleModalOpen(true);
  };

  const handleCreateNewChat = (e) => {
    e.preventDefault();
    const title = newChatTitle.trim();
    if (!title) return;

    const newChat = { id: Date.now(), title };
    setChatHistory((prev) => [newChat, ...prev]);
    setIsChatActive(false);
    setMessages([]);
    setInputValue("");

    setIsTitleModalOpen(false);
    setNewChatTitle("");

    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div
      className={`relative h-screen w-full flex ${currentTheme.bg} ${currentTheme.text} font-sans antialiased overflow-hidden`}
    >
      <TitleModal
        isOpen={isTitleModalOpen}
        onClose={() => setIsTitleModalOpen(false)}
        onSubmit={handleCreateNewChat}
        title={newChatTitle}
        setTitle={setNewChatTitle}
        currentTheme={currentTheme}
        theme={theme}
      />

      <Sidebar
        theme={theme}
        currentTheme={currentTheme}
        chatHistory={chatHistory}
        onNewChatClick={handleNewChatClick}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          aria-hidden="true"
        ></div>
      )}

      <div
        className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-72" : "lg:ml-0"
        }`}
      >
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            {isChatActive ? (
              <ChatInterface
                messages={messages}
                theme={theme}
                currentTheme={currentTheme}
              />
            ) : (
              <LandingContent theme={theme} />
            )}
          </div>
        </main>

        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handlePromptSubmit={handlePromptSubmit}
          currentTheme={currentTheme}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useTheme } from "../context/ThemeContext.jsx";
import axios from "axios";

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
  const [socket, setSocket] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // State for the modal
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/chat", {
          withCredentials: true,
        });
        setChatHistory(response.data.chats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();

    const tempSocket = io("http://localhost:3000", {
      withCredentials: true,
    });
    tempSocket.on("connect", () => {
      console.log("Socket connected:", tempSocket.id);
    });

    tempSocket.on("ai-response", (messagePayload) => {
      console.log("Received AI message", messagePayload);
    });

    setSocket(tempSocket);

    return () => {
      tempSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleAIResponse = (messagePayload) => {
      setIsAiTyping(false);

      const newMessage = {
        id: Date.now() + Math.random(), // Simple unique ID generation
        sender: "ai",
        text: messagePayload.content,
      };

      if (messagePayload.chat === activeChatId) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("ai-response", handleAIResponse);

    return () => {
      socket.off("ai-response", handleAIResponse);
    };
  }, [socket, activeChatId]);

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

  const getMessages = async (chatId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/chat/messages/${chatId}`,
        {
          withCredentials: true,
        }
      );
      // Map messages and add a unique ID for React keys
      setMessages(
        response.data.messages.map((m) => ({
          id: m._id || Date.now() + Math.random(), // Use message _id or generate one
          sender: m.role == "user" ? "user" : "ai",
          text: m.content,
        }))
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSelectChat = (chat) => {
    setActiveChatId(chat._id);
    setIsChatActive(true);
    setMessages([]);
    getMessages(chat._id);
  };

  const handlePromptSubmit = (e) => {
    if (e) e.preventDefault();
    const text = inputValue.trim();

    if (!text || !activeChatId || !socket || !socket.connected) return;

    // Add a unique ID to each message for React keys
    const newMessage = {
      id: Date.now() + Math.random(),
      sender: "user",
      text,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsAiTyping(true);
    socket.emit("ai-message", {
      chat: activeChatId,
      content: text,
    });
  };

  const handleNewChatClick = () => {
    setIsTitleModalOpen(true);
  };

  const handleCreateNewChat = async (e) => {
    e.preventDefault();
    const title = newChatTitle.trim();
    if (!title) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/chat",
        { title },
        { withCredentials: true }
      );
      const newChat = {
        _id: response.data.chat._id,
        title: response.data.chat.title,
      };
      setChatHistory((prev) => [newChat, ...prev]);
      setActiveChatId(newChat._id);
      setIsChatActive(true);
      setMessages([]);

      setInputValue("");
      setIsTitleModalOpen(false);
      setNewChatTitle("");

      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    } catch (error) {
      console.log("Error creating chat:", error);
    }
  };
  
  // Cleaned up the main return statement
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
        onSelectChat={handleSelectChat}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeChatId={activeChatId}
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

        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            {isChatActive ? (
              <ChatInterface
                messages={messages}
                isAiTyping={isAiTyping}
                theme={theme}
                currentTheme={currentTheme}
              />
            ) : (
              <LandingContent theme={theme} />
            )}
          </div>
        </main>

        {activeChatId && (
          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handlePromptSubmit={handlePromptSubmit}
            currentTheme={currentTheme}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
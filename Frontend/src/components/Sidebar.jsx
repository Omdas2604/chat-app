import React from "react";
import { PlusIcon, CloseIcon, UserIcon, LogoutIcon } from "./Icons.jsx";

const Sidebar = ({
  theme,
  user,
  currentTheme,
  chatHistory,
  onNewChatClick,
  onSelectChat,
  isSidebarOpen,
  setIsSidebarOpen,
  activeChatId,
  onLogout
}) => {
  return(
  <aside
    className={`absolute lg:fixed top-0 left-0 h-full w-72 flex-shrink-0 ${
      currentTheme.sidebarBg
    } border-r ${
      currentTheme.border
    } flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <div
      className={`flex items-center justify-between p-4 flex-shrink-0 border-b ${currentTheme.border}`}
    >
      <span className="font-semibold">Chat History</span>
      <button onClick={() => setIsSidebarOpen(false)} className="p-1 lg:hidden">
        <CloseIcon />
      </button>
    </div>
    <div className="p-4 flex-shrink-0">
      <button
      id='new-chat-button'
        onClick={onNewChatClick}
        className={`w-full flex items-center gap-2 justify-center p-2 rounded-lg text-sm font-medium border transition-colors ${
          currentTheme.border
        } ${theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-zinc-200"}`}
      >
        <PlusIcon />
        New Chat
      </button>
    </div>
    <nav 
    id="chat-history-list"
    className="flex-1 px-4 pb-4 space-y-2 overflow-y-auto">
      {chatHistory.map((chat) => {
        const isActive = chat._id === activeChatId;
        return (
          <a
            key={chat._id}
            onClick={() => onSelectChat(chat)}
            href="#"
            className={`block p-2.5 rounded-lg text-sm truncate transition-colors
          ${
            isActive
              ? "bg-indigo-600 text-white"
              : theme === "dark"
              ? "hover:bg-zinc-800 text-white"
              : "hover:bg-zinc-200 text-zinc-900"
          }`}
          >
            {chat.title}
          </a>
        );
      })}
    </nav>

    <div className={`flex-shrink-0 p-4 border-t ${currentTheme.border}`}>
      <button
      onClick={onLogout}
        className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
          theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-zinc-200"
        }`}
      >
        <UserIcon className="w-8 h-8 p-1.5 bg-zinc-700 text-white rounded-full" />
        <span className="font-medium text-sm">{user?user:"USER"}</span>
        <LogoutIcon className="ml-auto" />
      </button>
    </div>
  </aside>
  )
};

export default Sidebar;

import React from "react";
import { MenuIcon, SunIcon, MoonIcon } from "./Icons.jsx";

const Header = ({ theme, toggleTheme, setIsSidebarOpen }) => (
  <header className="flex-shrink-0 flex justify-between items-center p-4">
    <div className="flex items-center gap-3">
      <button 
      id="sidebar-toggle-button"
      onClick={() => setIsSidebarOpen((prev) => !prev)} className="p-1">
        <MenuIcon />
      </button>
      <span className="text-xl font-semibold tracking-tighter">Zenith</span>
    </div>
    <button
    id="theme-toggle-button"
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${
        theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-zinc-200"
      }`}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  </header>
);

export default Header;

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from '../context/ThemeContext.jsx';

// --- ICONS ---
const Logo = ({ theme, className }) => (
  <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill={theme === 'dark' ? 'white' : 'black'} />
    <path d="M25 35 H75 M25 65 H75 M40 50 L60 50" stroke={theme === 'dark' ? 'black' : 'white'} strokeWidth="8" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);
const SendIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);
const UserIcon = ({ className }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const LogoutIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);


// --- SUB-COMPONENTS ---

const Header = ({ theme, toggleTheme, setIsSidebarOpen }) => (
    <header className="flex-shrink-0 flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(prev => !prev)} className="p-1">
                <MenuIcon />
            </button>
            <span className="text-xl font-semibold tracking-tighter">Zenith</span>
        </div>
        <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-200'}`}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
    </header>
);

const Sidebar = ({ theme, currentTheme, chatHistory, startNewChat, isSidebarOpen, setIsSidebarOpen }) => (
    <aside className={`absolute lg:fixed top-0 left-0 h-full w-72 flex-shrink-0 ${currentTheme.sidebarBg} border-r ${currentTheme.border} flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className={`flex items-center justify-between p-4 flex-shrink-0 border-b ${currentTheme.border}`}>
            <span className="font-semibold">Chat History</span>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1 lg:hidden">
                <CloseIcon />
            </button>
        </div>
        <div className="p-4 flex-shrink-0">
            <button onClick={startNewChat} className={`w-full flex items-center gap-2 justify-center p-2 rounded-lg text-sm font-medium border transition-colors ${currentTheme.border} ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-200'}`}>
                <PlusIcon />
                New Chat
            </button>
        </div>
        <nav className="flex-1 px-4 pb-4 space-y-2 overflow-y-auto">
            {chatHistory.map(chat => (
                <a key={chat.id} href="#" className={`block p-2.5 rounded-lg text-sm truncate ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-200'}`}>
                    {chat.title}
                </a>
            ))}
        </nav>
        <div className={`flex-shrink-0 p-4 border-t ${currentTheme.border}`}>
            <a href="#" className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-200'}`}>
                <UserIcon className="w-8 h-8 p-1.5 bg-zinc-700 text-white rounded-full"/>
                <span className="font-medium text-sm">Your Name</span>
                <LogoutIcon className="ml-auto"/>
            </a>
        </div>
    </aside>
);

const ChatInterface = ({ messages, theme, currentTheme }) => {
    const chatEndRef = useRef(null);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="pt-8 pb-4 space-y-6">
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center border ${currentTheme.border} ${currentTheme.panelBg} ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        {msg.sender === 'ai' ? <Logo theme={theme} /> : <UserIcon />}
                    </div>
                    <div className={`max-w-xl p-3.5 rounded-lg ${msg.sender === 'user' ? 'order-1 bg-indigo-600 text-white' : `order-2 ${currentTheme.panelBg} border ${currentTheme.border}`}`}>
                        <p className="whitespace-pre-wrap text-sm leading-6">{msg.text}</p>
                    </div>
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
    );
};

const ChatInput = ({ inputValue, setInputValue, handlePromptSubmit, currentTheme, theme }) => (
    <div className={`flex-shrink-0 bg-transparent`}>
        <form onSubmit={handlePromptSubmit} className="max-w-4xl mx-auto p-4">
            <div className={`relative border rounded-xl ${currentTheme.border} ${theme === 'dark' ? 'bg-zinc-950' : 'bg-white'}`}>
                <textarea
                    rows="1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handlePromptSubmit(e);
                        }
                    }}
                    placeholder="Message Zenith..."
                    className={`w-full pl-4 pr-16 py-3 text-sm resize-none bg-transparent focus:outline-none ${currentTheme.placeholder}`}
                />
                <button type="submit" aria-label="Submit prompt" disabled={!inputValue.trim()} className={`absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-lg transition-colors duration-200 ${inputValue.trim() ? 'bg-indigo-600 text-white' : `${currentTheme.textMuted} bg-transparent cursor-not-allowed'}`}`}>
                    <SendIcon />
                </button>
            </div>
             <p className="text-center text-xs mt-3 text-zinc-500">Zenith can make mistakes. Consider checking important information.</p>
        </form>
    </div>
);

const LandingContent = ({ theme }) => (
      <div className="h-full flex flex-col justify-center items-center text-center">
        <Logo theme={theme} className="w-16 h-16 mb-4"/>
        <h1 className="text-4xl font-medium">How can I help you today?</h1>
      </div>
);

// --- HOME COMPONENT (Main Layout Manager) ---
const Home = () => {
  const { theme, toggleTheme } = useTheme();

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isChatActive, setIsChatActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
      {id: 1, title: "React Button Component Code"},
      {id: 2, title: "Trip to the Swiss Alps"}
  ]);

  const colors = {
    light: {
      bg: 'bg-zinc-100', text: 'text-zinc-900', textMuted: 'text-zinc-500', border: 'border-zinc-200',
      panelBg: 'bg-white', sidebarBg: 'bg-zinc-50', placeholder: 'placeholder:text-zinc-400',
    },
    dark: {
      bg: 'bg-black', text: 'text-gray-50', textMuted: 'text-zinc-400', border: 'border-zinc-800',
      panelBg: 'bg-zinc-900', sidebarBg: 'bg-zinc-950', placeholder: 'placeholder:text-zinc-600',
    }
  };
  const currentTheme = theme === 'dark' ? colors.dark : colors.light;

  const handlePromptSubmit = (e) => {
    if (e) e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    if (!isChatActive) {
        setIsChatActive(true);
        const newChat = { id: Date.now(), title: text.length > 30 ? text.substring(0, 30) + '...' : text };
        setChatHistory(prev => [newChat, ...prev]);
    }
    
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputValue('');
    
    setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'ai', text: `This is a simulated AI response for your query: "${text}". The possibilities are endless.` }]);
    }, 1200);
  };
  
  const startNewChat = () => {
      setIsChatActive(false);
      setMessages([]);
      setInputValue('');
      if (window.innerWidth < 1024) { // Close sidebar on mobile when starting new chat
        setIsSidebarOpen(false);
      }
  }

  return (
    <div className={`relative h-screen w-full flex ${currentTheme.bg} ${currentTheme.text} font-sans antialiased overflow-hidden`}>
        <Sidebar 
            theme={theme}
            currentTheme={currentTheme}
            chatHistory={chatHistory}
            startNewChat={startNewChat}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
        />
        
        {/* Overlay for closing sidebar on mobile */}
        {isSidebarOpen && (
            <div
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                aria-hidden="true"
            ></div>
        )}

        <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-0'}`}>
            <Header 
                theme={theme}
                toggleTheme={toggleTheme}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    {isChatActive ? (
                        <ChatInterface messages={messages} theme={theme} currentTheme={currentTheme} />
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
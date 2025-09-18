import React from "react";
import { useTheme } from '../context/ThemeContext.jsx';


// --- ICONS ---
const Logo = ({ theme }) => (
  <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill={theme === 'dark' ? 'white' : 'black'} />
    <path
      d="M25 35 H75 M25 65 H75 M40 50 L60 50"
      stroke={theme === 'dark' ? 'black' : 'white'}
      strokeWidth="8"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);

const SparkleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.61L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


// --- HOME COMPONENT ---
const Home = () => {
  const { theme, toggleTheme } = useTheme();

  const colors = {
    light: {
      bg: 'bg-white', text: 'text-zinc-900', textMuted: 'text-zinc-600', border: 'border-zinc-200',
      panelBg: 'bg-white', btnText: 'text-white', btnBg: 'bg-black', btnHover: 'hover:bg-zinc-800',
      placeholder: 'placeholder:text-zinc-400'
    },
    dark: {
      bg: 'bg-black', text: 'text-gray-50', textMuted: 'text-zinc-400', border: 'border-zinc-800',
      panelBg: 'bg-zinc-950', btnText: 'text-black', btnBg: 'bg-white', btnHover: 'hover:bg-zinc-200',
      placeholder: 'placeholder:text-zinc-600'
    }
  };

  const currentTheme = theme === 'dark' ? colors.dark : colors.light;
  
  const examplePrompts = [
    { title: "Plan a trip", description: "to the Swiss Alps for a week." },
    { title: "Write a short story", description: "about a robot that discovers music." },
    { title: "Generate code", description: "for a React button component." },
    { title: "Summarize an article", description: "on the latest AI advancements." },
  ];

  return (
    <div className={`flex flex-col min-h-screen ${currentTheme.bg} ${currentTheme.text} font-sans antialiased transition-colors duration-500`}>
      <div className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <header className={`flex justify-between items-center py-5 border-b ${currentTheme.border} transition-colors duration-500`}>
          <div className="flex items-center gap-3">
            <Logo theme={theme} />
            <span className="text-xl font-semibold tracking-tighter">Zenith</span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            <button className={`px-4 sm:px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${currentTheme.btnBg} ${currentTheme.btnText} ${currentTheme.btnHover}`}>
              Sign In
            </button>
            <button onClick={toggleTheme} className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <span className="sr-only">Toggle theme</span>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </nav>
        </header>

        <main>
          <section className="relative flex flex-col items-center text-center pt-20 pb-16 md:pt-28 md:pb-24">
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-50'} rounded-full blur-3xl opacity-40 -z-10`}></div>
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-b from-zinc-50 to-zinc-400' : 'bg-gradient-to-b from-zinc-900 to-zinc-600'}py-2`}>
                Converse with Intelligence
            </h1>
            <p className={`max-w-2xl text-lg md:text-xl ${currentTheme.textMuted} mb-10`}>
              Your creative and analytical partner. Ask anything, or start with an example below.
            </p>

            <form className="w-full max-w-3xl px-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="e.g., 'What are the key themes of Dune?'"
                  className={`w-full pl-6 pr-16 py-4 text-base border rounded-full focus:outline-none focus:ring-2 transition-all duration-300 ${currentTheme.panelBg} ${currentTheme.border} ${currentTheme.placeholder} ${theme === 'dark' ? 'focus:ring-zinc-700' : 'focus:ring-zinc-300 focus:border-zinc-400'}`}
                />
                <button type="submit" aria-label="Submit prompt" className={`absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center rounded-full transition-all duration-300 ${theme === 'dark' ? 'text-zinc-400 bg-zinc-800/80 group-hover:text-white group-hover:bg-zinc-700' : 'text-zinc-500 bg-zinc-100 group-hover:text-black group-hover:bg-zinc-200'}`}>
                  <ArrowIcon />
                </button>
              </div>
            </form>
          </section>

          <section className="pb-24 md:pb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Or try one of these</h2>
              <p className={`${currentTheme.textMuted} mt-2`}>Get started with a single click.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {examplePrompts.map((item, index) => (
                <button key={index} className={`group text-left p-6 border rounded-xl transition-all duration-300 ${currentTheme.border} ${theme === 'dark' ? 'hover:border-zinc-700 hover:bg-zinc-900' : 'hover:border-zinc-300 hover:bg-zinc-50'} transform hover:-translate-y-1`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center border ${currentTheme.border} ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
                        <SparkleIcon />
                    </div>
                    <div>
                        <p className={`font-semibold ${currentTheme.text}`}>{item.title}</p>
                        <p className={`mt-1 text-sm ${currentTheme.textMuted}`}>{item.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
      
      <div className={`${currentTheme.bg} transition-colors duration-500`}>
        <footer className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-6 border-t ${currentTheme.border} ${currentTheme.textMuted} text-sm transition-colors duration-500`}>
          <p>&copy; {new Date().getFullYear()} Zenith. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;


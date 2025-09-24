import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ElectricBorder from "../components/ElectricBorder";


// --- ICONS ---
const Logo = ({ theme }) => (
    <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill={theme === 'dark' ? 'white' : 'black'} />
    <path d="M30 70L50 30L70 70" stroke={theme === 'dark' ? 'black' : 'white'} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);


// --- LOGIN COMPONENT ---
const Login = () => {
  const { theme, toggleTheme } = useTheme();
  const [form,setForm]=useState({email:'',password:''});
  const [submitting, setSubmitting] = useState(false)
  const navigate=useNavigate();

  const colors = {
    light: {
      bg: 'bg-white', text: 'text-zinc-900', textMuted: 'text-zinc-600', border: 'border-zinc-200',
      panelBg: 'bg-white', btnText: 'text-white', btnBg: 'bg-black', btnHover: 'hover:bg-zinc-800',
      placeholder: 'placeholder:text-zinc-400', inputBg: 'bg-white'
    },
    dark: {
      bg: 'bg-black', text: 'text-gray-50', textMuted: 'text-zinc-400', border: 'border-zinc-800',
      panelBg: 'bg-zinc-950', btnText: 'text-black', btnBg: 'bg-white', btnHover: 'hover:bg-zinc-200',
      placeholder: 'placeholder:text-zinc-600', inputBg: 'bg-zinc-900'
    }
  };

  const currentTheme = theme === 'dark' ? colors.dark : colors.light;



  async function handleSubmit(e){
    e.preventDefault();
    setSubmitting(true);
    axios.post('http://localhost:3000/api/auth/login',{
        email:form.email,
        password:form.password
    },{
        withCredentials:true
    }).then((res)=>{
      localStorage.setItem('user',res.data.user.fullName.firstName)
        navigate('/')
  }).catch((err)=>{
    console.error(err);
  }).finally(()=>{
    setSubmitting(false)
  })
  };

  function handleChange(e){
    const {name,value}=e.target;
    setForm({...form,[name]:value})
  }


  return (
    <div className={`flex flex-col min-h-screen ${currentTheme.bg} ${currentTheme.text} font-sans antialiased transition-colors duration-500`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 ${currentTheme.bg} transition-colors duration-500`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex justify-between items-center py-5 border-b ${currentTheme.border} transition-colors duration-500`}>
              <div className="flex items-center gap-3">
                <Logo theme={theme} />
                <span className="text-xl font-semibold tracking-tighter">Zenith</span>
              </div>
              <nav className="flex items-center gap-2 sm:gap-4">
                {/* Responsive button padding */}
                <button className={`px-3 sm:px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${currentTheme.btnBg} ${currentTheme.btnText} ${currentTheme.btnHover}`}>
                  Sign Up
                </button>
                <button onClick={toggleTheme} className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <span className="sr-only">Toggle theme</span>
                  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
              </nav>
            </div>
        </div>
      </header>

      {/* Main Content */}
       {/* Responsive vertical padding */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Welcome Back!</h1>
            <p className={`mt-2 ${currentTheme.textMuted}`}>Sign in to continue to Zenith.</p>
          </div>

           {/* Responsive card padding */}

       <ElectricBorder color={theme==="dark"?"#7df9ff":"#4DCFD6"} speed={2} chaos={0.5} thickness={1} style={{ borderRadius: 16 }} >
          <div className={`p-8 sm:p-8 border rounded-xl ${currentTheme.border} ${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-white'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${currentTheme.text}`}>
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-base border rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${currentTheme.inputBg} ${currentTheme.border} ${currentTheme.placeholder} ${theme === 'dark' ? 'focus:ring-zinc-700' : 'focus:ring-zinc-400'}`}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className={`block text-sm font-medium ${currentTheme.text}`}>
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-base border rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${currentTheme.inputBg} ${currentTheme.border} ${currentTheme.placeholder} ${theme === 'dark' ? 'focus:ring-zinc-700' : 'focus:ring-zinc-400'}`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between flex-wrap">
                <a href="#" className={`text-sm font-medium ${theme === 'dark' ? 'text-white hover:text-[#7df9ff]' : 'text-black hover:text-[#4DCFD6]'}`}>
                  Forgot your password?
                </a>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium transition-colors duration-300 ${currentTheme.btnBg} ${currentTheme.btnText} ${currentTheme.btnHover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark' ? 'focus:ring-offset-black focus:ring-white' : 'focus:ring-offset-white focus:ring-black'}`}
                >
                    {submitting ? 'Signing in...':'Sign in'}
                </button>
              </div>
            </form>
          </div>
      </ElectricBorder>
          
          <p className={`mt-5 text-center text-sm ${currentTheme.textMuted}`}>
            Don't have an account?{' '}
            <a href="/register" className={`font-medium ${theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
              Sign Up
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className={`${currentTheme.bg} transition-colors duration-500`}>
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4 border-t ${currentTheme.border} ${currentTheme.textMuted} text-sm transition-colors duration-500`}>
          <p>&copy; {new Date().getFullYear()} Zenith. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;


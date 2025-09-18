import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import React, { useState } from "react";
import axios from "axios";
import ElectricBorder from "../components/ElectricBorder";

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const Register = () => {
  const { theme, toggleTheme } = useTheme();
  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post(
        "http://localhost:3000/api/auth/register",
        {
          email: form.email,
          fullName: {
            firstName: form.firstname,
            lastName: form.lastname,
          },
          password: form.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const colors = {
    light: {
      bg: "bg-gray-100",
      panelBg: "bg-white",
      text: "text-zinc-900",
      textMuted: "text-zinc-500",
      border: "border-gray-300",
      inputBg: "bg-white",
      accent: "text-indigo-600",
    },
    dark: {
      bg: "bg-black",
      panelBg: "bg-zinc-900/50",
      text: "text-gray-50",
      textMuted: "text-zinc-400",
      border: "border-zinc-700",
      inputBg: "bg-zinc-900",
      accent: "text-indigo-400",
    },
  };

  const currentTheme = theme === "dark" ? colors.dark : colors.light;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${currentTheme.bg} font-sans transition-colors duration-500`}
    >
      <button
        onClick={toggleTheme}
        className={`absolute top-12 right-6 sm:top-6 sm:right-6 p-2 rounded-full z-10 transition-all duration-300 ${
          theme === "dark"
            ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            : "bg-gray-200 text-gray-500 hover:bg-gray-300"
        }`}
      >
        <span className="sr-only">Toggle theme</span>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>

      <ElectricBorder
        color={theme === "dark" ? "#7df9ff" : "#4DCFD6"}
        speed={2}
        chaos={0.5}
        thickness={1}
        style={{ borderRadius: 16,width:500 }}
        width={5}
      >
        <div
          className={`w-full max-w-lg p-6 sm:p-8 md:p-12 space-y-6 sm:space-y-8 rounded-2xl shadow-2xl backdrop-blur-lg border ${currentTheme.panelBg} ${currentTheme.border} transition-colors duration-500`}
        >
          <div className="text-center">
            <h1
              className={`text-3xl sm:text-4xl font-bold tracking-tight ${currentTheme.text}`}
            >
              Create Account
            </h1>
            <p
              className={`mt-2 sm:mt-3 text-sm sm:text-base ${currentTheme.textMuted}`}
            >
              Let's get you started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="firstname"
                  className={`block text-sm font-medium mb-2 ${currentTheme.textMuted}`}
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  onChange={handleChange}
                  placeholder="John"
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${currentTheme.inputBg} ${currentTheme.border} ${currentTheme.text}`}
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className={`block text-sm font-medium mb-2 ${currentTheme.textMuted}`}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Doe"
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${currentTheme.inputBg} ${currentTheme.border} ${currentTheme.text}`}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 ${currentTheme.textMuted}`}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${currentTheme.inputBg} ${currentTheme.border} ${currentTheme.text}`}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 ${currentTheme.textMuted}`}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${currentTheme.inputBg} ${currentTheme.border} ${currentTheme.text}`}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-[#4DCFD6]focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/40"
                disabled={submitting}
              >
                {submitting ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>

          <p className={`text-center text-sm ${currentTheme.textMuted}`}>
            Already have an account?{" "}
            <a
              href="#"
              className={`font-semibold hover:underline ${currentTheme.accent}`}
            >
              Sign In
            </a>
          </p>
        </div>
      </ElectricBorder>
    </div>
  );
};

export default Register;

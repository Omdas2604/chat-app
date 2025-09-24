import React from "react";
import { Logo, HistoryIcon, TypeIcon } from "./Icons.jsx";

// The two-step tutorial content
const tutorialSteps = [
  {
    icon: <HistoryIcon className="w-6 h-6" />,
    title: "Choose a Conversation",
    description:
      "Click 'New Chat' to start a fresh topic, or select a past conversation from your history.",
  },
  {
    icon: <TypeIcon className="w-6 h-6" />,
    title: "Start Talking",
    description:
      "Once a chat is open, type your message in the input box and press Enter to send.",
  },
];

const LandingContent = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div className="h-full flex flex-col justify-center items-center text-center px-4">
      {/* Header Content */}
      <Logo theme={theme} className="w-16 h-16 mb-4 animate-bounce" />
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
        Welcome to Zenith
      </h1>
      <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-10 max-w-lg">
        Your intelligent assistant. Here’s a simple guide to get you started.
      </p>

      {/* Main Tutorial Panel */}
      <div
        className={`w-full max-w-xl rounded-2xl border ${
          isDark
            ? "border-zinc-800 bg-zinc-900"
            : "border-zinc-200 bg-zinc-50"
        }`}
      >
        <div className="p-8 space-y-6">
          {tutorialSteps.map((step, index) => (
            // Each Step is a flex container
            <div key={index} className="flex items-start gap-4 text-left">
              {/* Icon Container */}
              <div
                className={`flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center ${
                  isDark
                    ? "bg-zinc-800 text-zinc-300"
                    : "bg-white text-zinc-600 border"
                }`}
              >
                {step.icon}
              </div>

              {/* Text Container */}
              <div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingContent;
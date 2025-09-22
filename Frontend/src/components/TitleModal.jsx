import React from "react";

const TitleModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  setTitle,
  currentTheme,
  theme,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md p-6 rounded-xl border ${currentTheme.border} ${currentTheme.sidebarBg}`}
      >
        <h2 className="text-xl font-semibold mb-4">Create New Chat</h2>
        <p className={`text-sm mb-4 ${currentTheme.textMuted}`}>
          Give your new conversation a title.
        </p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Trip to Japan"
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${currentTheme.panelBg} ${currentTheme.border} ${currentTheme.text} ${currentTheme.placeholder}`}
            autoFocus
          />
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                currentTheme.border
              } ${
                theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
            >
              Create Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TitleModal;

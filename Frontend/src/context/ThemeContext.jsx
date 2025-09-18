import { createContext, useContext } from 'react';

// 1. Create and export the context object. This file contains NO components.
export const ThemeContext = createContext();

// 2. Create and export the custom hook that components will use.
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

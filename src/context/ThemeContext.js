import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const lightTheme = {
  background: "#fffaf5",
  text: "#111827",
  card: "#ffffff",
  surface: "#ffffff",
  muted: "#f3f4f6",
  primary: "#6b21a8",
  secondary: "#6b21a8",
  accent: "#ec4899",
  border: "#e5e7eb",
};

const darkTheme = {
  background: "#0f172a",
  text: "#f9fafb",
  card: "#111827",
  surface: "#1e293b",
  muted: "#0b1120",
  primary: "#a78bfa",
  secondary: "#8b5cf6",
  accent: "#f472b6",
  border: "#334155",
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);


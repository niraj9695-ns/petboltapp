import React, { createContext, useContext } from "react";
import { useAppTheme } from "../theme/useAppTheme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { theme, isDark } = useAppTheme();
  const toggleTheme = () => {};

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);


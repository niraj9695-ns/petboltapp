import React, { createContext, useContext, useEffect } from "react";
import { Appearance, Platform, StatusBar } from "react-native";
import { useAppTheme } from "../theme/useAppTheme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { theme, isDark } = useAppTheme();
  const toggleTheme = () => {};

  useEffect(() => {
    if (Platform.OS === "web") return;

    Appearance.setColorScheme("light");
    StatusBar.setBarStyle("dark-content", true);

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme !== "light") {
        Appearance.setColorScheme("light");
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);


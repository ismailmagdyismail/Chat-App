import React, { ReactNode, useState } from "react";
import { Theme } from "./Theme";
import { darkTheme } from "./DarkTheme";
import { lightTheme } from "./LightTheme";

interface ThemeTypes {
  theme: Theme;
  toggleTheme: () => void;
}
interface ThemeProps {
  children?: ReactNode;
}
const ThemeContext = React.createContext<ThemeTypes | null>(null);

export function ThemeProvider(props: ThemeProps) {
  const [activeTheme, setActiveTheme] = useState(darkTheme);

  function toggleTheme() {
    if (activeTheme.type === "darkTheme") {
      setActiveTheme(lightTheme);
    } else {
      setActiveTheme(darkTheme);
    }
  }
  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
        theme: activeTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("Theme used outside the provider");
  }
  return context;
}

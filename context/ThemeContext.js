import { createContext, useContext, useEffect, useState } from "react";
import { loadProfile, saveProfile } from "../functions";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      const data = await loadProfile();
      if (data?.theme != undefined) {
        setThemeName(data.theme ? "light" : "dark");
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = themeName === "dark" ? "light" : "dark";

    setThemeName(newTheme);

    const profile = await loadProfile();
    await saveProfile({
      ...profile,
      theme: newTheme === "light" ? true : false,
    });
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
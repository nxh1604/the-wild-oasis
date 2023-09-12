import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks";

interface IDefaultValue {
  isDarkMode: boolean | string;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<IDefaultValue>({
  isDarkMode: false,
  toggleDarkMode: () => undefined,
});

const DarkModeProvider = ({ children }: React.PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    false,
    "isDarkMode"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      return () => document.documentElement.classList.remove("dark-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      return () => document.documentElement.classList.remove("light-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((darkMode) => !darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return { isDarkMode, toggleDarkMode };
};

export { DarkModeProvider, useDarkMode };

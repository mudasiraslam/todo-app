import { useState, useEffect } from "react";
import { Theme } from "../../type/type.todo";

const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("navbarTheme");
    if (savedTheme) {
      setCurrentTheme(JSON.parse(savedTheme));
    }
  }, []);

  return { currentTheme, setCurrentTheme };
};

export default useTheme;

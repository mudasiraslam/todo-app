// import { useState, useEffect } from "react";
// import { Theme } from "../../type/type.todo";

// const useTheme = () => {
//   const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("navbarTheme");
//     if (savedTheme) {
//       setCurrentTheme(JSON.parse(savedTheme));
//     }
//   }, []);

//   return { currentTheme, setCurrentTheme };
// };

// export default useTheme;

import { useState, useEffect } from "react";
import { Theme } from "../../type/type.todo";
// import { themes } from "../../(component)/../constants/themes/themes"; // Adjust the path based on your project structure
import { themes } from "./theme";

const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("navbarTheme");
    if (savedTheme) {
      setCurrentTheme(JSON.parse(savedTheme));
    } else {
      const defaultTheme = themes.find(
        (theme) => theme.value === "vibrantSpectrum"
      );
      setCurrentTheme(defaultTheme || null);
    }
  }, []);

  const changeTheme = (newThemeValue: string) => {
    const newTheme = themes.find((theme) => theme.value === newThemeValue);
    if (newTheme) {
      setCurrentTheme(newTheme);
      localStorage.setItem("navbarTheme", JSON.stringify(newTheme));
    }
  };

  return { currentTheme, changeTheme };
};

export default useTheme;

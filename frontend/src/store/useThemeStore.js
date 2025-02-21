import { create } from "zustand";

const validThemes = ["coffee", "dark", "light"]; // Define valid themes

export const useThemeStore = create((set) => ({
  theme: (() => {
    const savedTheme = localStorage.getItem("chat-theme");
    return validThemes.includes(savedTheme) ? savedTheme : "coffee"; // Fallback to "coffee" if invalid theme is stored
  })(),
  setTheme: (theme) => {
    if (validThemes.includes(theme)) {
      localStorage.setItem("chat-theme", theme);
      set({ theme });
    } else {
      console.warn(`Invalid theme: ${theme}. Valid themes are: ${validThemes.join(", ")}`);
    }
  },
}));

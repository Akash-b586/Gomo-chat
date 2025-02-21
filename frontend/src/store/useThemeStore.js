import { create } from "zustand";

/**
 * Zustand store for managing the application's theme.
 * 
 * The theme is persisted in the browser's localStorage to retain the user's preference across sessions.
 * If no theme is stored, the default theme "Nord" is used.
 */
export const useThemeStore = create((set) => ({
  /**
   * Current theme of the application.
   * Retrieved from localStorage or defaults to "Nord" if not set.
   */
  theme: localStorage.getItem("chat-theme") || "Nord",

  /**
   * Updates the theme both in the Zustand store and localStorage.
   *
   * @param {string} theme - The new theme to set. It should match the application's valid themes.
   */
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));

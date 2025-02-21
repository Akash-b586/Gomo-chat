import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  // Extracting necessary states and actions from stores
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers }); // Log online users for debugging (can be removed in production)

  // Check if the user is authenticated on component mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser }); // Log authenticated user (can be removed in production)

  // Show loading spinner while checking authentication state
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      {/* Navbar is displayed on every page */}
      <Navbar />

      {/* Set up routing for different pages */}
      <Routes>
        {/* HomePage - accessible if the user is authenticated */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />

        {/* SignUpPage - accessible only if the user is not authenticated */}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />

        {/* LoginPage - accessible only if the user is not authenticated */}
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />

        {/* SettingsPage - accessible by all users */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* ProfilePage - accessible only if the user is authenticated */}
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      {/* Toast notifications for user feedback */}
      <Toaster />
    </div>
  );
};

export default App;

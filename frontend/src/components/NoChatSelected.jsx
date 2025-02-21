import { MSquareIcon } from "lucide-react";

/**
 * NoChatSelected Component
 *
 * This component renders a placeholder message when no chat is selected.
 * It provides a welcoming message and guides the user to select a conversation.
 *
 * Features:
 * - Displays an animated chat icon for a friendly UI.
 * - Includes a title and instructional text to inform the user.
 * - Uses Tailwind CSS for styling and layout responsiveness.
 *
 * Usage:
 * - Displayed when no chat is selected from the sidebar.
 * - Helps improve user experience by preventing an empty screen.
 */
const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Animated Chat Icon */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MSquareIcon className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <h2 className="text-2xl font-bold">Welcome to GomoChat!</h2>
        
        {/* Instructional Text */}
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

// Importing necessary dependencies and components
import { useChatStore } from "../store/useChatStore";  // Custom hook for accessing chat store
import Sidebar from "../components/Sidebar";  // Sidebar component for navigation
import NoChatSelected from "../components/NoChatSelected";  // Component to display when no chat is selected
import ChatContainer from "../components/ChatContainer";  // Component for displaying the chat when a user is selected

// HomePage component - main page that displays chat interface
const HomePage = () => {
  // Destructuring to get selectedUser from chat store
  const { selectedUser } = useChatStore();

  return (
    // Main wrapper with full viewport height and background styling
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          {/* Layout with a flex container for Sidebar and Chat/NoChat components */}
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Render Sidebar component for navigation */}
            <Sidebar />

            {/* Conditionally render NoChatSelected or ChatContainer based on whether a user is selected */}
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the HomePage component for use in other parts of the application
export default HomePage;

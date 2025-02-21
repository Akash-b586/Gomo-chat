import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

/**
 * ProfilePage Component
 * 
 * Displays and manages user profile information including:
 * - Profile picture upload/display
 * - Basic user details (name, email)
 * - Account metadata (creation date, status)
 * 
 * Features:
 * - Image upload with preview
 * - Automatic profile updates on image change
 * - Loading states during updates
 * - Default avatar handling
 */
const ProfilePage = () => {
  // Authentication store integration
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  
  // Local state for image preview before upload
  const [selectedImg, setSelectedImg] = useState(null);

    /**
   * Handles image upload and profile update
   * @param {React.ChangeEvent<HTMLInputElement>} e - File input event
   */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // Convert image to base64 for preview and storage
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image); // Immediate preview update
      await updateProfile({ profilePic: base64Image }); // Persist to backend
    };
  };

  return (
    <div className="h-screen pt-20">
      {/* Profile Container */}
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">

          {/* Profile Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}
          
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* Image preview with fallback to default avatar */}
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />

              {/* Accessible image upload control */}
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            {/* Upload Status Feedback */}
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Details Section */}
          <div className="space-y-6">
            {/* Full Name Display */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            {/* Email Display */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>
          
          {/* Account Metadata Section */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              {/* Membership Date */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span> {/* Date formatting */}
              </div>
              {/* Account Status */}
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;

import { useNavigate } from "react-router";
import React, { useState, useRef } from "react";
import { Camera } from "lucide-react";

export default function RiderProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // 1. Profile image state initialized with stored user photo or default fallback
  const [profileImage, setProfileImage] = useState<string>(
    user.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  );

  // 2. Ref for hidden input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 3. Click handler to open native file chooser
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // 4. File change handler to set new image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      // Save to localStorage so image persists across refreshes
      const updatedUser = { ...user, profileImage: imageUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-gray-900 text-white px-8 py-6">
        <div className="max-w-5xl mx-auto">

          <button
            onClick={() => navigate("/rider-dashboard")}
            className="mb-4 text-gray-300 hover:text-white"
          >
            ← Back to Rider Dashboard
          </button>

          <h1 className="text-3xl font-bold">
            Rider Profile
          </h1>

          <p className="text-gray-300 mt-1">
            Manage your account information
          </p>

        </div>
      </header>


      <main className="max-w-5xl mx-auto p-8">

        {/* Profile Card */}
        <section className="bg-white rounded-2xl shadow p-8">

          <div className="flex items-center gap-5 mb-8">

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            {/* Interactive Clickable Profile Circle */}
            <div 
              onClick={handleAvatarClick}
              className="relative cursor-pointer group overflow-hidden w-24 h-24 rounded-full border-2 border-[#A33D20] shadow-md"
              title="Click to select photo"
            >
              <img 
                src={profileImage} 
                alt="Rider Profile" 
                className="w-full h-full object-cover"
              />

              {/* Hover Camera Overlay */}
              <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Camera className="w-6 h-6" />
              </div>

              {/* Online Status Dot */}
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full z-10" title="Online" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user.name || "Rider"}
              </h2>

              <p className="text-gray-500">
                GigWorker Rider
              </p>

              <span className="inline-block mt-1 text-xs font-bold bg-orange-100 text-[#A33D20] px-3 py-1 rounded-full">
                ⚡ Active Fleet
              </span>
            </div>

          </div>
          

          {/* Account Information */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-500 font-semibold">
                Name
              </p>

              <p className="text-lg font-bold mt-2">
                {user.name || "Not available"}
              </p>
            </div>


            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-500 font-semibold">
                Email
              </p>

              <p className="text-lg font-bold mt-2">
                {user.email || "Not available"}
              </p>
            </div>


            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-500 font-semibold">
                Account Type
              </p>

              <p className="text-lg font-bold mt-2 capitalize">
                {user.accountType || "Rider"}
              </p>
            </div>


            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-500 font-semibold">
                Rider ID
              </p>

              <p className="text-lg font-bold mt-2 break-all">
                {user._id || user.id || "Not available"}
              </p>
            </div>

          </div>

        </section>


        {/* Quick Links */}
        <section className="mt-8">

          <h2 className="text-2xl font-bold mb-5">
            Quick Access
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <button
              onClick={() =>
                navigate("/rider-dashboard")
              }
              className="bg-white rounded-2xl shadow p-6 text-left hover:bg-gray-50"
            >
              <div className="text-3xl mb-3">
                🚴
              </div>

              <h3 className="text-xl font-bold">
                Rider Dashboard
              </h3>

              <p className="text-gray-500 mt-2">
                View your deliveries
              </p>
            </button>


            <button
              onClick={() =>
                navigate("/platform-dashboard")
              }
              className="bg-white rounded-2xl shadow p-6 text-left hover:bg-gray-50"
            >
              <div className="text-3xl mb-3">
                🏢
              </div>

              <h3 className="text-xl font-bold">
                Platform Dashboard
              </h3>

              <p className="text-gray-500 mt-2">
                View platform performance
              </p>
            </button>


            <button
              onClick={() =>
                navigate("/earnings-history")
              }
              className="bg-white rounded-2xl shadow p-6 text-left hover:bg-gray-50"
            >
              <div className="text-3xl mb-3">
                💰
              </div>

              <h3 className="text-xl font-bold">
                Earnings History
              </h3>

              <p className="text-gray-500 mt-2">
                View your earnings
              </p>
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}
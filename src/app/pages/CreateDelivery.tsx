import React, { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Package, IndianRupee } from "lucide-react";

export default function CreateDelivery() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    packageDetails: "",
    pickupLocation: "",
    dropLocation: "",
    payment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Grab logged-in user from localStorage
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : {};
    const restaurantId = user.id || user._id;

    if (!restaurantId) {
      alert("Restaurant user not logged in. Please log in again.");
      setLoading(false);
      return;
    }

    const newDelivery = {
      restaurantId: restaurantId,
      restaurantName: user.name || "Restaurant",
      packageDetails: formData.packageDetails,
      pickupLocation: formData.pickupLocation,
      dropLocation: formData.dropLocation,
      payment: Number(formData.payment),
      status: "available", // Default status for riders
      platform: "Direct",
    };

    try {
      const response = await fetch("http://localhost:5000/api/deliveries/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDelivery),
      });

      if (response.ok) {
        alert("Delivery created successfully! 🚀");
        navigate("/restaurant-dashboard");
      } else {
        const errorData = await response.json();
        alert(`Failed to create delivery: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error creating delivery:", error);
      alert("Server error. Make sure backend is running on http://localhost:5000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate("/restaurant-dashboard")}
          className="text-slate-500 hover:text-slate-900 font-semibold mb-6 flex items-center gap-2 transition-colors"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            Create Delivery Request 🛵
          </h1>
          <p className="text-slate-500 font-medium mb-8">
            Enter the details below to dispatch a rider.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Package / Food Details
              </label>
              <div className="relative">
                <Package className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                  type="text"
                  required
                  placeholder="e.g., 2x Pizza, 1x Coke"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A33D20]/20 focus:border-[#A33D20] transition-all"
                  value={formData.packageDetails}
                  onChange={(e) => setFormData({ ...formData, packageDetails: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input 
                    type="text"
                    required
                    placeholder="Restaurant Address"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A33D20]/20 focus:border-[#A33D20] transition-all"
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Drop Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-orange-400" />
                  <input 
                    type="text"
                    required
                    placeholder="Customer Address"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A33D20]/20 focus:border-[#A33D20] transition-all"
                    value={formData.dropLocation}
                    onChange={(e) => setFormData({ ...formData, dropLocation: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Delivery Payout (₹)
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-3.5 w-5 h-5 text-green-500" />
                <input 
                  type="number"
                  required
                  placeholder="e.g., 120"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  value={formData.payment}
                  onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#A33D20] to-orange-600 text-white font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex justify-center items-center gap-2 mt-4 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Publishing Order..." : "Publish Delivery Request 🚀"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
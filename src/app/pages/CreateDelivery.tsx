import React, { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Package, IndianRupee } from "lucide-react";

export default function CreateDelivery() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Basic state for the form
  const [formData, setFormData] = useState({
    packageDetails: "",
    pickupLocation: "",
    dropLocation: "",
    payment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Here you will eventually add your API call to save the delivery
    console.log("Delivery Created:", formData);
    
    setTimeout(() => {
      setLoading(false);
      navigate("/restaurant-dashboard"); // Send them back to dashboard after creating
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <button 
          onClick={() => navigate("/restaurant-dashboard")}
          className="text-slate-500 hover:text-slate-900 font-semibold mb-6 flex items-center gap-2 transition-colors"
        >
          ← Back to Dashboard
        </button>
        
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            Create Delivery Request <span className="text-orange-500">🛵</span>
          </h1>
          <p className="text-slate-500 font-medium mb-8">
            Enter the details below to dispatch a rider from the EV fleet.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Package Details */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Package / Food Details</label>
              <div className="relative">
                <Package className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                  type="text"
                  required
                  placeholder="e.g., 2x Margherita Pizza, 1x Garlic Bread"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A33D20]/20 focus:border-[#A33D20] transition-all"
                  value={formData.packageDetails}
                  onChange={(e) => setFormData({...formData, packageDetails: e.target.value})}
                />
              </div>
            </div>

            {/* Locations */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input 
                    type="text"
                    required
                    placeholder="Restaurant Branch"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A33D20]/20 focus:border-[#A33D20] transition-all"
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Drop Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-orange-400" />
                  <input 
                    type="text"
                    required
                    placeholder="Customer Address"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A33D20]/20 focus:border-[#A33D20] transition-all"
                    value={formData.dropLocation}
                    onChange={(e) => setFormData({...formData, dropLocation: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Delivery Payout (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-3.5 w-5 h-5 text-green-500" />
                <input 
                  type="number"
                  required
                  placeholder="e.g., 150"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  value={formData.payment}
                  onChange={(e) => setFormData({...formData, payment: e.target.value})}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#A33D20] to-orange-600 text-white font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex justify-center items-center gap-2 mt-4"
            >
              {loading ? "Dispatching..." : "Publish Delivery Request 🚀"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

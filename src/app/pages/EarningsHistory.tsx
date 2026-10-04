import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, IndianRupee, Calendar, CheckCircle } from "lucide-react";

type EarningsRecord = {
  _id: string;
  restaurantName: string;
  packageDetails: string;
  payment: number;
  platform: string;
  createdAt: string;
};

export default function EarningsHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<EarningsRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id || user._id;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/deliveries/rider/earnings-history/${userId}`
        );
        const data = await res.json();
        if (res.ok) setHistory(data);
      } catch (err) {
        console.error("Error fetching earnings history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  const totalEarnings = history.reduce((sum, item) => sum + Number(item.payment || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <button
          onClick={() => navigate("/rider-profile")}
          className="text-slate-600 hover:text-slate-900 font-bold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Profile
        </button>

        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl flex justify-between items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Total Payout Settled</p>
            <h1 className="text-4xl font-black mt-1">₹{totalEarnings}</h1>
            <p className="text-xs text-slate-400 mt-2">{history.length} completed orders</p>
          </div>
          <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400">
            <IndianRupee className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h2 className="text-xl font-black text-slate-900">Payout Breakdown</h2>

          {loading ? (
            <p className="text-center text-slate-400 py-8">Loading history...</p>
          ) : history.length === 0 ? (
            <p className="text-center text-slate-400 py-8">No earnings history found yet.</p>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.restaurantName}</h4>
                      <p className="text-xs text-slate-500">{item.packageDetails} • {item.platform}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-emerald-600 text-lg">+₹{item.payment}</span>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 justify-end">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
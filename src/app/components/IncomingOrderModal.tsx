import React, { useState, useEffect } from "react";
import { Package, MapPin, Check, X, Clock } from "lucide-react";
import toast from "react-hot-toast";

interface IncomingOrderProps {
  isOpen: boolean;
  order: {
    restaurantName: string;
    pickupLocation: string;
    dropLocation: string;
    earnings: number;
    distance: string;
  } | null;
  onAccept: () => void;
  onReject: () => void;
}

export default function IncomingOrderModal({ isOpen, order, onAccept, onReject }: IncomingOrderProps) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(30);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onReject();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onReject]);

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative overflow-hidden">
        
        {/* Top Timer Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100">
          <div 
            className="h-full bg-[#A33D20] transition-all duration-1000"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          />
        </div>

        <div className="flex justify-between items-center mb-6 mt-2">
          <div className="flex items-center gap-2 bg-orange-50 text-[#A33D20] px-3 py-1 rounded-full text-xs font-bold">
            <Clock className="w-3.5 h-3.5 animate-spin" /> New Request ({timeLeft}s)
          </div>
          <span className="text-xl font-black text-slate-900">₹{order.earnings}</span>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 space-y-3">
          <h3 className="font-bold text-slate-900 text-lg">{order.restaurantName}</h3>
          
          <div className="space-y-2 text-xs text-slate-600">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#A33D20] shrink-0 mt-0.5" />
              <span><strong className="text-slate-900">Pickup:</strong> {order.pickupLocation}</span>
            </p>
            <p className="flex items-start gap-2">
              <Package className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong className="text-slate-900">Drop:</strong> {order.dropLocation} ({order.distance})</span>
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onReject}
            className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" /> Reject
          </button>
          
          <button
            onClick={() => {
              toast.success("Order accepted! Head to pickup location.");
              onAccept();
            }}
            className="flex-1 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
          >
            <Check className="w-4 h-4" /> Accept Order
          </button>
        </div>

      </div>
    </div>
  );
}
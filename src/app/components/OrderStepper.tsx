import React from "react";
import { CheckCircle, Clock, Package, Truck, MapPin } from "lucide-react";

interface OrderStepperProps {
  status: string; // "available" | "accepted" | "picked" | "out_for_delivery" | "delivered"
}

export default function OrderStepper({ status }: OrderStepperProps) {
  const steps = [
    { key: "accepted", label: "Rider Assigned", icon: Truck },
    { key: "picked", label: "Picked Up", icon: Package },
    { key: "out_for_delivery", label: "Out for Delivery", icon: MapPin },
    { key: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const getStepIndex = (currentStatus: string) => {
    switch (currentStatus) {
      case "accepted": return 0;
      case "picked": return 1;
      case "out_for_delivery": return 2;
      case "delivered": return 3;
      default: return -1;
    }
  };

  const currentIndex = getStepIndex(status);

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 my-4">
      <h4 className="font-bold text-slate-800 mb-6 text-sm uppercase tracking-wider">Live Delivery Status</h4>
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center relative z-10 flex-1">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? "bg-[#A33D20] text-white shadow-lg shadow-orange-500/20" 
                    : "bg-slate-100 text-slate-400"
                } ${isCurrent ? "ring-4 ring-orange-100 scale-110" : ""}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-semibold mt-3 text-center ${isCompleted ? "text-slate-900" : "text-slate-400"}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
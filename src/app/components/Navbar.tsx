import React from "react";
import { Link, useLocation } from "react-router";
import { Home, Bike, Search, History, DollarSign } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/rider-dashboard", label: "Dashboard", icon: Bike },
    { path: "/find-deliveries", label: "Find Orders", icon: Search },
    { path: "/history", label: "History", icon: History },
    { path: "/earnings", label: "Earnings", icon: DollarSign },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span className="bg-[#A33D20] text-white p-1.5 rounded-xl">🛵</span>
          GigWorker
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
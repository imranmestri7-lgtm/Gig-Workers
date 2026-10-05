import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Zap } from "lucide-react";

const PLATFORMS = [
  { name: "Zomato", color: "from-red-500 to-rose-600" },
  { name: "Swiggy", color: "from-orange-500 to-amber-600" },
  { name: "Blinkit", color: "from-yellow-400 to-amber-500" },
  { name: "Uber Eats", color: "from-emerald-500 to-teal-600" },
  { name: "Zepto", color: "from-purple-500 to-indigo-600" },
];

export default function AnimatedLogo() {
  return (
    <section className="bg-slate-900 text-white py-16 px-6 overflow-hidden border-y border-slate-800 relative">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10 space-y-10">
        
        {/* 🌟 1. Interactive 3D Animated Brand Mark */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative group cursor-pointer"
        >
          {/* Animated Glow Ring Behind Emblem */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 opacity-30 blur-xl group-hover:opacity-60 transition-opacity"
          />

          {/* Main Logo Container */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-slate-950/80 border border-slate-700/80 p-6 rounded-3xl backdrop-blur-2xl shadow-2xl flex items-center gap-4"
          >
            {/* Animated SVG Scooter Icon */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 bg-gradient-to-tr from-[#A33D20] to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20"
            >
              <Zap className="w-8 h-8 fill-current text-amber-300" />
            </motion.div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white">
                  Gig<span className="text-[#A33D20]">Worker</span>
                </span>
                <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Unified Delivery Ecosystem</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 🚀 2. Infinite Ticker Marquee for Partner Logistics */}
        <div className="w-full space-y-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Powering deliveries across top dispatch networks
          </p>

          <div className="relative w-full overflow-hidden mask-gradient-x py-2">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-6 w-max"
            >
              {[...PLATFORMS, ...PLATFORMS, ...PLATFORMS].map((platform, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.08 }}
                  className="bg-slate-800/60 border border-slate-700/60 px-6 py-3 rounded-2xl flex items-center gap-3 shrink-0 backdrop-blur-md shadow-md"
                >
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${platform.color} shadow-xs`} />
                  <span className="font-extrabold text-sm text-slate-200 tracking-wide">
                    {platform.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
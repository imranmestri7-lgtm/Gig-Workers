import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { MapPin, Search, Banknote, Clock, Filter, Star } from "lucide-react";

const SHIFTS = [
  { id: 1, name: "Morning Dash", time: "07:00 AM - 11:00 AM", rate: "₹500 - ₹800", demand: "High", location: "Downtown Area" },
  { id: 2, name: "Lunch Rush", time: "11:30 AM - 02:30 PM", rate: "₹600 - ₹1000", demand: "Very High", location: "Tech Park & Suburbs" },
  { id: 3, name: "Afternoon Snack", time: "03:00 PM - 06:00 PM", rate: "₹400 - ₹600", demand: "Medium", location: "University District" },
  { id: 4, name: "Dinner Peak", time: "07:00 PM - 11:00 PM", rate: "₹800 - ₹1200", demand: "Very High", location: "City Center" },
  { id: 5, name: "Late Night Cravings", time: "11:30 PM - 03:00 AM", rate: "₹700 - ₹1100", demand: "High", location: "Downtown Area" },
];

export default function FindDeliveries() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="pt-12 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900 rounded-[3rem] p-12 md:p-16 relative overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1761251947277-7679f23e9b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBwYXBlciUyMG1hcCUyMHZpbnRhZ2V8ZW58MXx8fHwxNzc4NjU5MjgxfDA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Vintage route map" 
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-['Nunito',sans-serif] font-extrabold text-white mb-4">
              Find active delivery zones
            </h1>
            <p className="text-slate-300 text-lg mb-8">
              Discover the best times and places to ride. Maximize your earnings by targeting high-demand shifts.
            </p>
            
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by area or shift name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A33D20] backdrop-blur-sm"
                />
              </div>
              <button className="px-6 py-4 bg-[#A33D20] text-white rounded-xl font-bold hover:bg-[#8B331A] transition-colors flex items-center gap-2 shadow-lg">
                <Filter className="w-5 h-5" /> Filter
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Shifts List */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-['Nunito',sans-serif] font-bold text-slate-900">Recommended Shifts</h2>
          <span className="text-sm font-medium text-slate-500">{SHIFTS.length} shifts found</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHIFTS.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.location.toLowerCase().includes(searchTerm.toLowerCase())).map((shift, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              key={shift.id} 
              className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  shift.demand === 'Very High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-[#A33D20]'
                }`}>
                  {shift.demand} Demand
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-yellow-500 transition-colors">
                  <Star className="w-5 h-5" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold font-['Nunito',sans-serif] text-slate-900 mb-4">{shift.name}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium">{shift.time}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium">{shift.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Banknote className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium">Est. {shift.rate}</span>
                </div>
              </div>
              
              <Link to="/signup" className="block w-full py-3 text-center rounded-xl bg-slate-50 text-slate-800 font-semibold text-sm group-hover:bg-[#A33D20] group-hover:text-white transition-colors">
                Claim Shift
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

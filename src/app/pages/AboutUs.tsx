import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, Users, Map, Utensils } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="pt-12 pb-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-['Nunito',sans-serif] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Connecting local flavors with <span className="text-[#A33D20]">hungry neighbors</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
          >
            GigWorker was built on a simple idea: empowering independent riders while helping local restaurants thrive in the digital delivery era.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-[3rem] overflow-hidden h-[400px] md:h-[500px] shadow-lg mt-12"
        >
          <img 
            src="https://images.unsplash.com/photo-1555992336-fb0d29498b13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc4NjU5MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Classic retro restaurant" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-[2rem] p-8 text-center shadow-sm border border-slate-100">
            <Users className="w-8 h-8 text-[#A33D20] mx-auto mb-4" />
            <div className="text-4xl font-extrabold text-slate-900 mb-2 font-['Nunito',sans-serif]">10k+</div>
            <p className="text-slate-500 font-medium">Active Riders</p>
          </div>
          <div className="bg-white rounded-[2rem] p-8 text-center shadow-sm border border-slate-100">
            <Utensils className="w-8 h-8 text-[#A33D20] mx-auto mb-4" />
            <div className="text-4xl font-extrabold text-slate-900 mb-2 font-['Nunito',sans-serif]">5k+</div>
            <p className="text-slate-500 font-medium">Partner Restaurants</p>
          </div>
          <div className="bg-white rounded-[2rem] p-8 text-center shadow-sm border border-slate-100">
            <Map className="w-8 h-8 text-[#A33D20] mx-auto mb-4" />
            <div className="text-4xl font-extrabold text-slate-900 mb-2 font-['Nunito',sans-serif]">25</div>
            <p className="text-slate-500 font-medium">Cities Covered</p>
          </div>
          <div className="bg-white rounded-[2rem] p-8 text-center shadow-sm border border-slate-100">
            <Heart className="w-8 h-8 text-[#A33D20] mx-auto mb-4" />
            <div className="text-4xl font-extrabold text-slate-900 mb-2 font-['Nunito',sans-serif]">2M+</div>
            <p className="text-slate-500 font-medium">Meals Delivered</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 mb-24 text-center">
        <h2 className="text-3xl md:text-4xl font-['Nunito',sans-serif] font-bold text-slate-900 mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          We believe that gig work should be fair, transparent, and rewarding. That's why we've created a platform that puts our riders first—ensuring they keep 100% of their tips, receive fair base pay, and have access to the support they need on the road.
        </p>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          Simultaneously, we partner with local restaurants to help them expand their reach without crippling commission fees, fostering a vibrant local food ecosystem.
        </p>
        <Link to="/signup" className="inline-flex items-center gap-2 text-[#A33D20] font-bold hover:text-[#8B331A] transition-colors">
          Join our community today &rarr;
        </Link>
      </section>
    </div>
  );
}

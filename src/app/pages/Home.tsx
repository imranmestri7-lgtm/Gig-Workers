import React from "react";
import { Link } from "react-router";
import { 
  ChevronRight, 
  Clock, 
  Banknote, 
  ShieldCheck, 
  ArrowRight,
  Bookmark
} from "lucide-react";
import { motion } from "motion/react";

const BROWSE_CATEGORIES = [
  {
    id: 1,
    title: "Restaurant Delivery",
    desc: "Deliver hot meals from local favorites.",
    image: "https://images.unsplash.com/photo-1767769355000-8117f1967317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGluZXIlMjBmb29kfGVufDF8fHx8MTc3ODY1OTI4MHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "Grocery Orders",
    desc: "Shop and drop fresh produce and daily needs.",
    image: "https://images.unsplash.com/photo-1759405185700-ee8e5c08cf1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGdyb2NlcnklMjBiYWd8ZW58MXx8fHwxNzc4NjU5MjgxfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "Café & Bakery Run",
    desc: "Quick dashes for morning coffee and treats.",
    image: "https://images.unsplash.com/photo-1646706567001-95f838bce32a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FmZSUyMGNvZmZlZXxlbnwxfHx8fDE3Nzg2NTkyODF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const JOBS = [
  {
    id: 1,
    title: "Lunch Hour Rider",
    salary: "₹18,000/month",
    type: "Peak Hours",
    image: "https://images.unsplash.com/photo-1659353741505-ef9d8bca2403?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBmb29kJTIwZGVsaXZlcnklMjB1bmlmb3JtfGVufDF8fHx8MTc3ODY1OTI4NXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "Weekend Pizza Courier",
    salary: "Flexible shifts",
    type: "Part-time",
    image: "https://images.unsplash.com/photo-1734774421809-48eac182a5cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwcGl6emF8ZW58MXx8fHwxNzc4NjU5MjgxfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "Full-Time Food Delivery",
    salary: "₹25,000+/month",
    type: "Full-time",
    image: "https://images.unsplash.com/photo-1730900737654-ac6d843139da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGZvb2QlMjBkZWxpdmVyeXxlbnwxfHx8fDE3Nzg2NTkyODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export default function Home() {
  return (
    <div className="pt-12 pb-24">
      {/* Section 1: Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-['Nunito',sans-serif] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Deliver food.<br />
            <span className="text-[#A33D20]">Earn simply.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl mx-auto"
          >
            Hit the road, deliver meals to hungry customers, and earn on your own schedule. Join the fast-growing fleet of local riders.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#A33D20] text-white font-semibold text-lg hover:bg-[#8B331A] transition-all shadow-[0_8px_20px_-6px_rgba(163,61,32,0.4)] flex items-center justify-center gap-2">
              Start Delivering <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-800 font-semibold text-lg hover:bg-slate-50 transition-all shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center justify-center gap-2">
              How It Works
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] h-[400px] md:h-[600px] w-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1774978236819-1cfbb59793c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBkZWxpdmVyeSUyMGJhZyUyMHNjb290ZXJ8ZW58MXx8fHwxNzc4NjU5Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Delivery rider with orange uniform checking phone on scooter" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
        </motion.div>
      </section>

      {/* Section 2: Category Cards */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-['Nunito',sans-serif] font-bold text-slate-900 mb-4">Choose what you deliver</h2>
            <p className="text-slate-600 text-lg">Pick the delivery orders that suit your vehicle and schedule.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[#A33D20] font-semibold hover:text-[#8B331A] transition-colors">
            View all <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BROWSE_CATEGORIES.map((category) => (
            <div key={category.id} className="group bg-white rounded-3xl p-3 pb-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-12px_rgba(163,61,32,0.12)] transition-all border border-slate-50 cursor-pointer">
              <div className="h-48 rounded-2xl overflow-hidden mb-6">
                <img src={category.image} alt={category.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="px-4">
                <h3 className="text-xl font-bold font-['Nunito',sans-serif] text-slate-900 mb-2">{category.title}</h3>
                <p className="text-slate-600 mb-6">{category.desc}</p>
                <button className="w-full py-3 rounded-full bg-slate-50 text-slate-800 font-semibold text-sm group-hover:bg-[#A33D20] group-hover:text-white transition-colors">
                  Find Orders
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Featured Workers / Jobs */}
      <section className="bg-white py-24 mb-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-['Nunito',sans-serif] font-bold text-slate-900 mb-12 text-center">Fresh delivery routes near you</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {JOBS.map((job) => (
              <div key={job.id} className="bg-[#FDFBF7] rounded-[24px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 shrink-0 rounded-[1.5rem] overflow-hidden shadow-sm">
                  <img src={job.image} alt={job.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center sm:text-left lg:text-center w-full">
                  <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-[#A33D20] text-xs font-bold uppercase tracking-wider mb-3">
                    {job.type}
                  </span>
                  <h3 className="text-xl font-bold font-['Nunito',sans-serif] text-slate-900 mb-2">{job.title}</h3>
                  <p className="text-slate-600 font-medium mb-6 flex items-center justify-center sm:justify-start lg:justify-center gap-2">
                    <Banknote className="w-5 h-5 text-slate-400" /> {job.salary}
                  </p>
                  <div className="flex items-center gap-3 w-full">
                    <button className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors">
                      Apply to Ride
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-slate-400 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/find-deliveries" className="inline-block px-6 py-3 rounded-full border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 transition-colors">
              View all delivery shifts
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Nunito',sans-serif] font-bold text-slate-900 mb-4">Why ride with GigWorker?</h2>
          <p className="text-slate-600 text-lg">We provide the best tools and support so you can focus on earning.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.06)] text-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#A33D20] flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-['Nunito',sans-serif] text-slate-900 mb-3">Deliver on your terms</h3>
            <p className="text-slate-600">Turn on the app when you're ready, turn it off when you're done. Total freedom.</p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.06)] text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center mx-auto mb-6">
              <Banknote className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-['Nunito',sans-serif] text-slate-900 mb-3">Keep 100% of tips</h3>
            <p className="text-slate-600">You worked hard for it. You keep every cent of the tips customers give you.</p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.06)] text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-['Nunito',sans-serif] text-slate-900 mb-3">Accident Insurance</h3>
            <p className="text-slate-600">Ride with peace of mind. We provide safety coverage for you during every active delivery.</p>
          </div>
        </div>
      </section>

      {/* Section 5: CTA Section */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-[#A33D20] rounded-[3rem] p-12 md:p-20 text-center shadow-[0_20px_40px_-12px_rgba(163,61,32,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-['Nunito',sans-serif] font-bold text-white mb-6">
              Start delivering and earning today
            </h2>
            <p className="text-orange-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join our community of riders moving the city and delivering smiles, one meal at a time.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#A33D20] font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg">
                Become a Rider
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent text-white border-2 border-white/30 font-bold text-lg hover:bg-white/10 transition-colors">
                Partner Restaurant
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

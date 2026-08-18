import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck, Wallet, Clock, Bike, ArrowRight } from "lucide-react";

export default function BecomeRider() {
  const requirements = [
    "Be at least 18 years old",
    "Have a valid driver's license (for scooters/bikes)",
    "Own a smartphone with internet access",
    "Have a reliable vehicle (bicycle, scooter, or car)",
    "Pass a basic background check"
  ];

  return (
    <div className="pt-12 pb-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-['Nunito',sans-serif] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
        >
          Be your own boss.<br />
          <span className="text-[#A33D20]">Ride with us.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
        >
          Whether you're looking for full-time work or a side hustle, delivering with GigWorker gives you the flexibility to earn on your terms.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#A33D20] text-white font-bold text-lg hover:bg-[#8B331A] transition-all shadow-[0_8px_20px_-6px_rgba(163,61,32,0.4)]">
            Apply Now <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Visual & Stats */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-[3rem] overflow-hidden h-[500px] shadow-lg relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1730900737654-ac6d843139da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGZvb2QlMjBkZWxpdmVyeXxlbnwxfHx8fDE3Nzg2NTkyODB8MA&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Happy delivery rider with green delivery bag" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-['Nunito',sans-serif] font-bold text-slate-900">
              Why riders love GigWorker
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#A33D20] flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Great Earnings</h3>
                <p className="text-sm text-slate-600">Competitive delivery rates plus you keep 100% of customer tips.</p>
              </div>

              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#A33D20] flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Total Flexibility</h3>
                <p className="text-sm text-slate-600">Work for an hour or work all day. You make the schedule.</p>
              </div>

              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#A33D20] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Rider Support</h3>
                <p className="text-sm text-slate-600">24/7 on-road support and built-in accident insurance.</p>
              </div>

              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#A33D20] flex items-center justify-center mb-4">
                  <Bike className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Any Vehicle</h3>
                <p className="text-sm text-slate-600">Deliver on a bicycle, scooter, motorcycle, or in a car.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-[#FDFBF7] border border-orange-900/10 rounded-[3rem] p-10 md:p-16 shadow-sm">
          <h2 className="text-3xl font-['Nunito',sans-serif] font-bold text-slate-900 mb-8 text-center">
            What you need to get started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requirements.map((req, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-50">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="font-medium text-slate-700">{req}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/signup" className="inline-block px-8 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors">
              I meet these requirements
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

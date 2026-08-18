import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Smartphone, CheckCircle2, Navigation, IndianRupee, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Sign up and get approved",
      desc: "Create an account, submit your vehicle details, and pass a quick background check. You'll be ready to ride in no time.",
      icon: <Smartphone className="w-8 h-8" />
    },
    {
      id: 2,
      title: "Accept local orders",
      desc: "Turn on the app whenever you want to work. You'll receive delivery requests from nearby restaurants and cafes.",
      icon: <CheckCircle2 className="w-8 h-8" />
    },
    {
      id: 3,
      title: "Pick up and deliver",
      desc: "Follow the app's navigation to the restaurant, pick up the hot food, and deliver it to the hungry customer.",
      icon: <Navigation className="w-8 h-8" />
    },
    {
      id: 4,
      title: "Earn and track",
      desc: "Get paid for every delivery. Keep 100% of your tips and track your daily, weekly, and monthly earnings right in the app.",
      icon: <IndianRupee className="w-8 h-8" />
    }
  ];

  return (
    <div className="pt-12 pb-24">
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-['Nunito',sans-serif] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            How GigWorker <span className="text-[#A33D20]">works</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl mx-auto"
          >
            Delivering food is simple and rewarding. Discover how you can start turning your free time into extra income today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] h-[500px]"
          >
            <img 
              src="https://images.unsplash.com/photo-1759200285180-7b400c74184a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVsaXZlcnklMjBzY29vdGVyfGVufDF8fHx8MTc3ODY1OTI3OXww&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Vintage delivery rider in traffic" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {steps.map((step, index) => (
              <div key={step.id} className="flex gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 text-[#A33D20] flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-['Nunito',sans-serif] text-slate-900 mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-[#A33D20] rounded-[3rem] p-12 text-center shadow-[0_20px_40px_-12px_rgba(163,61,32,0.3)]">
          <h2 className="text-3xl md:text-4xl font-['Nunito',sans-serif] font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-orange-100 text-lg mb-10 max-w-2xl mx-auto">
            The process takes less than 5 minutes. Sign up now and hit the road as soon as tomorrow!
          </p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#A33D20] font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg">
            Become a Rider <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Store, Bike, PackageCheck, CheckCircle2 } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "1. Restaurant Publishes Request",
    description:
      "When a new food order arrives, the restaurant publishes a pickup request instantly across connected gig platforms.",
    icon: Store,
    badge: "Instant Sync",
    color: "from-orange-500 to-amber-500",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "2. Nearest Rider Accepts",
    description:
      "Riders receive real-time notifications on their EV Rider App and accept optimized routes with transparent earning payouts.",
    icon: Bike,
    badge: "Auto-Polling Dispatch",
    color: "from-blue-500 to-cyan-500",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "3. Order Pickup & Live Tracking",
    description:
      "The rider reaches the restaurant, picks up the package, and initiates GPS route tracking with direct live chat messaging.",
    icon: PackageCheck,
    badge: "Live GPS Tracking",
    color: "from-amber-500 to-yellow-500",
    image:
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "4. Doorstep Delivery & Earnings",
    description:
      "The customer receives their order seamlessly while the rider's wallet gets credited immediately with automated settlement breakdown.",
    icon: CheckCircle2,
    badge: "Instant Payout",
    color: "from-emerald-500 to-teal-500",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress inside the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-slate-900 text-white py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto mb-16 text-center space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full inline-block">
          ✨ Interactive Experience
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          How GigWorker Logistics Works
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
          Scroll down to watch our real-time order dispatch and delivery ecosystem in action.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative">
        {/* Left Column: Scrollable Narrative Steps */}
        <div className="space-y-32 py-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ margin: "-20% 0px -20% 0px", once: false }}
                className="bg-slate-800/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative space-y-4 group hover:border-orange-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
                    {step.badge}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.color} flex items-center justify-center text-white font-bold shadow-lg`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white">{step.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Sticky Visual Preview Screen */}
        <div className="sticky top-28 hidden md:block">
          <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800 h-[480px]">
            {steps.map((step, index) => {
              // Calculate scroll progress triggers for each frame
              const start = index / steps.length;
              const end = (index + 1) / steps.length;
              const opacity = useTransform(
                scrollYProgress,
                [start - 0.1, start, end - 0.1, end],
                [0, 1, 1, 0]
              );
              const scale = useTransform(
                scrollYProgress,
                [start, end],
                [1, 1.05]
              );

              return (
                <motion.div
                  key={step.id}
                  style={{ opacity, scale }}
                  className="absolute inset-0 flex flex-col justify-between p-8"
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                  <div className="z-10 flex justify-between items-center">
                    <span className="bg-slate-900/80 backdrop-blur-md text-orange-400 text-xs font-black px-3 py-1.5 rounded-full border border-orange-500/30">
                      Step {step.id} of {steps.length}
                    </span>
                  </div>

                  <div className="z-10 space-y-2">
                    <h4 className="text-2xl font-black text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-300 font-medium">
                      Real-time synchronized delivery pipeline.
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
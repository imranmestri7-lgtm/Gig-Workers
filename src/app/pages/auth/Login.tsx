import { Link } from "react-router";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { motion } from "motion/react";

export default function Login() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-['Nunito',sans-serif] font-extrabold text-slate-900 mb-2">
          Welcome back
        </h1>
        <p className="text-slate-600 text-lg">
          Please enter your details to access your account.
        </p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-5 h-5" />
            </div>
            <input 
              type="email" 
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A33D20]/20 focus:border-[#A33D20] transition-all bg-white text-slate-900" 
              placeholder="you@example.com" 
              required
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-slate-700">
              Password
            </label>
            <Link to="#" className="text-sm font-semibold text-[#A33D20] hover:text-[#8B331A] transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-5 h-5" />
            </div>
            <input 
              type="password" 
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A33D20]/20 focus:border-[#A33D20] transition-all bg-white text-slate-900" 
              placeholder="••••••••" 
              required
            />
          </div>
        </div>

        <div className="flex items-center pt-2">
          <input 
            type="checkbox" 
            id="remember" 
            className="w-5 h-5 rounded border-slate-300 text-[#A33D20] focus:ring-[#A33D20]" 
          />
          <label htmlFor="remember" className="ml-2 text-sm text-slate-600">
            Remember me for 30 days
          </label>
        </div>

        <button 
          type="submit" 
          className="w-full py-4 rounded-xl bg-[#A33D20] text-white font-bold text-lg hover:bg-[#8B331A] transition-all shadow-[0_8px_20px_-6px_rgba(163,61,32,0.4)] flex items-center justify-center gap-2 mt-4"
        >
          Sign in <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-[#A33D20] hover:text-[#8B331A] transition-colors">
            Sign up today
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

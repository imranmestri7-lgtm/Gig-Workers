import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Bike,
  Store,
} from "lucide-react";
import { motion } from "motion/react";

export default function SignUp() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState<"rider" | "restaurant">(
    "rider"
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          accountType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Account created successfully!");

      // Go to login page
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server not connected");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* HEADING */}

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-['Nunito',sans-serif] font-extrabold text-slate-900 mb-2">
          Create an account
        </h1>

        <p className="text-slate-600 text-lg">
          Join GigWorker and start your journey today.
        </p>
      </div>

      {/* ACCOUNT TYPE */}

      <div className="flex gap-4 mb-8">

        {/* RIDER BUTTON */}

        <button
          type="button"
          onClick={() => setAccountType("rider")}
          className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all cursor-pointer ${
            accountType === "rider"
              ? "border-[#A33D20] bg-orange-50 text-[#A33D20]"
              : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
          }`}
        >
          <Bike className="w-5 h-5" />

          Rider

        </button>


        {/* RESTAURANT BUTTON */}

        <button
          type="button"
          onClick={() => setAccountType("restaurant")}
          className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all cursor-pointer ${
            accountType === "restaurant"
              ? "border-[#A33D20] bg-orange-50 text-[#A33D20]"
              : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
          }`}
        >
          <Store className="w-5 h-5" />

          Restaurant

        </button>

      </div>


      {/* SELECTED ACCOUNT MESSAGE */}

      <div className="mb-6 p-3 rounded-xl bg-orange-50 border border-orange-100 text-center">
        <p className="text-sm font-semibold text-[#A33D20]">
          Selected account:{" "}
          {accountType === "rider" ? "Rider" : "Restaurant"}
        </p>
      </div>


      {/* FORM */}

      <form
        className="space-y-4"
        onSubmit={handleSignup}
      >

        {/* NAME */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {accountType === "rider"
              ? "Full name"
              : "Business name"}
          </label>

          <div className="relative">

            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <User className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A33D20]/20 focus:border-[#A33D20] transition-all bg-white text-slate-900"
              placeholder={
                accountType === "rider"
                  ? "John Doe"
                  : "Tasty Bites Cafe"
              }
              required
            />

          </div>

        </div>


        {/* EMAIL */}

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A33D20]/20 focus:border-[#A33D20] transition-all bg-white text-slate-900"
              placeholder="you@example.com"
              required
            />

          </div>

        </div>


        {/* PASSWORD */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Password
          </label>

          <div className="relative">

            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-5 h-5" />
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A33D20]/20 focus:border-[#A33D20] transition-all bg-white text-slate-900"
              placeholder="Create a strong password"
              required
            />

          </div>

        </div>


        {/* CREATE ACCOUNT */}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-[#A33D20] text-white font-bold text-lg hover:bg-[#8B331A] transition-all shadow-[0_8px_20px_-6px_rgba(163,61,32,0.4)] flex items-center justify-center gap-2 mt-6 disabled:opacity-60 cursor-pointer"
        >

          {loading ? "Creating Account..." : "Create Account"}

          {!loading && (
            <ArrowRight className="w-5 h-5" />
          )}

        </button>

      </form>


      {/* LOGIN LINK */}

      <div className="mt-8 pt-8 border-t border-slate-100 text-center">

        <p className="text-slate-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-bold text-[#A33D20] hover:text-[#8B331A] transition-colors"
          >
            Sign in here
          </Link>

        </p>

      </div>

    </motion.div>
  );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { motion } from "motion/react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Check that user data exists
      if (!data.user) {
        alert("Login successful, but user information was not received.");
        return;
      }

      // Get account type
      const accountType = data.user.accountType;

      console.log("Logged in user:", data.user);
      console.log("Account type:", accountType);

      // Save login information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Save token only if backend sends one
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Login successful!");

      // =========================
      // REDIRECT BY ACCOUNT TYPE
      // =========================

      if (accountType === "rider") {
        navigate("/rider-dashboard");
        return;
      }

      if (accountType === "restaurant") {
        navigate("/restaurant-dashboard");
        return;
      }

      // Account type missing or invalid
      console.error(
        "Invalid account type:",
        accountType
      );

      alert(
        "Account type not found. Please create a new account."
      );

    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Server not connected. Make sure the backend is running on port 5000."
      );
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
          Welcome back
        </h1>

        <p className="text-slate-600 text-lg">
          Please enter your details to access your account.
        </p>

      </div>


      {/* LOGIN FORM */}

      <form
        className="space-y-5"
        onSubmit={handleLogin}
      >

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

          <div className="flex items-center justify-between mb-2">

            <label className="block text-sm font-semibold text-slate-700">
              Password
            </label>

            <Link
              to="#"
              className="text-sm font-semibold text-[#A33D20] hover:text-[#8B331A] transition-colors"
            >
              Forgot password?
            </Link>

          </div>

          <div className="relative">

            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-5 h-5" />
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A33D20]/20 focus:border-[#A33D20] transition-all bg-white text-slate-900"
              placeholder="••••••••"
              required
            />

          </div>

        </div>


        {/* REMEMBER ME */}

        <div className="flex items-center pt-2">

          <input
            type="checkbox"
            id="remember"
            className="w-5 h-5 rounded border-slate-300 text-[#A33D20] focus:ring-[#A33D20]"
          />

          <label
            htmlFor="remember"
            className="ml-2 text-sm text-slate-600"
          >
            Remember me for 30 days
          </label>

        </div>


        {/* LOGIN BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-[#A33D20] text-white font-bold text-lg hover:bg-[#8B331A] transition-all shadow-[0_8px_20px_-6px_rgba(163,61,32,0.4)] flex items-center justify-center gap-2 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >

          {loading ? (
            "Signing in..."
          ) : (
            <>
              Sign in
              <ArrowRight className="w-5 h-5" />
            </>
          )}

        </button>

      </form>


      {/* SIGNUP LINK */}

      <div className="mt-8 pt-8 border-t border-slate-100 text-center">

        <p className="text-slate-600">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="font-bold text-[#A33D20] hover:text-[#8B331A] transition-colors"
          >
            Sign up today
          </Link>

        </p>

      </div>

    </motion.div>
  );
}
import { Link } from "react-router";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });


      const data = await response.json();

      alert(data.message);

    } catch(error){
      console.log(error);
      alert("Server not connected");
    }

  };


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


      <form className="space-y-5" onSubmit={handleLogin}>


        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email address
          </label>


          <div className="relative">

            <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400"/>

            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border"
              placeholder="you@example.com"
              required
            />

          </div>

        </div>



        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Password
          </label>


          <div className="relative">

            <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-400"/>


            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border"
              placeholder="••••••••"
              required
            />

          </div>

        </div>



        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-[#A33D20] text-white font-bold text-lg flex items-center justify-center gap-2"
        >

          Sign in
          <ArrowRight className="w-5 h-5"/>

        </button>


      </form>



      <div className="mt-8 text-center">

        <p>
          Don't have an account?{" "}

          <Link 
          to="/signup"
          className="font-bold text-[#A33D20]"
          >
            Sign up today
          </Link>

        </p>

      </div>


    </motion.div>
  );
}
import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Mail, Lock, User, Bike, Store } from "lucide-react";
import { motion } from "motion/react";

export default function SignUp() {

  const [accountType, setAccountType] = useState<"rider" | "restaurant">("rider");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

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
          accountType
        }),
      });


      const data = await response.json();

      if(response.ok){
        alert("Account created successfully");
        console.log(data);
      }
      else{
        alert(data.message || "Signup failed");
      }


    } catch(error){

      console.log(error);
      alert("Server not connected");

    }
  };


  return (
    <motion.div>

      <h1 className="text-3xl font-bold mb-4">
        Create an account
      </h1>


      <div className="flex gap-4 mb-5">

        <button
        type="button"
        onClick={()=>setAccountType("rider")}
        >
          <Bike/> Rider
        </button>


        <button
        type="button"
        onClick={()=>setAccountType("restaurant")}
        >
          <Store/> Restaurant
        </button>

      </div>



      <form onSubmit={handleSignup} className="space-y-4">


        <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder="Name"
        className="border p-3 w-full"
        />


        <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Email"
        className="border p-3 w-full"
        />


        <input
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="border p-3 w-full"
        />


        <button
        type="submit"
        className="bg-orange-700 text-white p-3 w-full rounded"
        >

        Create Account
        <ArrowRight className="inline ml-2"/>

        </button>


      </form>


      <p className="mt-5">
        Already have account?
        <Link to="/login">
        Sign in
        </Link>
      </p>


    </motion.div>
  );
}
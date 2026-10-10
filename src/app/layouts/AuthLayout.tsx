import { Outlet, Link } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex font-['Inter',sans-serif] selection:bg-orange-100 selection:text-orange-900">
      {/* Form Side */}
      <div className="flex-1 flex flex-col px-6 py-8 md:px-12 md:py-12 lg:px-24 justify-center relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-xl bg-[#A33D20] text-white flex items-center justify-center font-bold text-lg">G</div>
          <span className="font-['Nunito',sans-serif] font-bold text-xl tracking-tight text-slate-900">GigWorker</span>
        </Link>
        <div className="w-full max-w-md mx-auto">
          <Outlet />
        </div>
      </div>

      {/* Image Side */}
     {/* Image Side */}
      {/* Image Side */}
     {/* Image Side */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden bg-slate-100 rounded-l-[3rem] shadow-[-20px_0_40px_-12px_rgba(0,0,0,0.1)] my-6 mr-6">
        
        {/* 🚀 PERFECTLY CLEAR RIDER FACING LEFT */}
      <img 
  src="https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=1200" 
  alt="Delivery rider facing left with helmet" 
  className="w-full h-full object-cover"
/>
        
        {/* Smooth, Subtle Bottom Gradient for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent z-10"></div>
        
        <div className="absolute bottom-16 left-16 right-16 z-20">
          <h2 className="text-4xl font-['Nunito',sans-serif] font-bold text-white mb-4 leading-snug drop-shadow-md">
            "Delivering gives me the freedom to work whenever I want."
          </h2>
          <p className="text-orange-400 text-lg font-bold tracking-wide uppercase drop-shadow-md">
            — Alex M., Delivery Partner
          </p>
        </div>
      </div>
    </div>
  );
}
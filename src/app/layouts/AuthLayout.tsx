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
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden bg-slate-900 rounded-l-[3rem] shadow-[-20px_0_40px_-12px_rgba(0,0,0,0.1)] my-6 mr-6">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1762848023162-c211ef0aa0c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVsaXZlcnklMjBwZXJzb258ZW58MXx8fHwxNzc4NjU5Mjg1fDA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Vintage delivery rider smiling" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute bottom-16 left-16 right-16 z-20">
          <h2 className="text-4xl font-['Nunito',sans-serif] font-bold text-white mb-4">
            "Delivering gives me the freedom to work whenever I want."
          </h2>
          <p className="text-orange-100/80 text-lg">
            — Alex M., Delivery Partner
          </p>
        </div>
      </div>
    </div>
  );
}

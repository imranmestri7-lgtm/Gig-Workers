import { Outlet, Link } from "react-router";
import { Menu, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-['Inter',sans-serif] selection:bg-orange-100 selection:text-orange-900">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-orange-900/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#A33D20] text-white flex items-center justify-center font-bold text-lg">G</div>
            <span className="font-['Nunito',sans-serif] font-bold text-xl tracking-tight text-slate-900">GigWorker</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <Link to="/how-it-works" className="hover:text-slate-900 transition-colors">How It Works</Link>
            <Link to="/find-deliveries" className="hover:text-slate-900 transition-colors">Find Deliveries</Link>
            <Link to="/become-a-rider" className="hover:text-slate-900 transition-colors">Become a Rider</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About Us</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-5 py-2.5 rounded-full text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm">
              Sign up
            </Link>
          </div>

          <button className="md:hidden p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-xl bg-[#A33D20] text-white flex items-center justify-center font-bold text-lg">G</div>
                <span className="font-['Nunito',sans-serif] font-bold text-xl tracking-tight text-slate-900">GigWorker</span>
              </Link>
              <p className="text-slate-500 mb-6">
                Empowering riders with flexible food delivery opportunities across the city.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#A33D20] hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#A33D20] hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#A33D20] hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#A33D20] hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 font-['Nunito',sans-serif]">Platform</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-[#A33D20] transition-colors">Find Deliveries</a></li>
                <li><a href="#" className="hover:text-[#A33D20] transition-colors">Partner with Us</a></li>
                <li><a href="#" className="hover:text-[#A33D20] transition-colors">Rider Perks</a></li>
                <li><a href="#" className="hover:text-[#A33D20] transition-colors">Cities</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 font-['Nunito',sans-serif]">Company</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-[#A33D20] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#A33D20] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#A33D20] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#A33D20] transition-colors">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 font-['Nunito',sans-serif]">Legal</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-[#A33D20] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#A33D20] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#A33D20] transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-[#A33D20] transition-colors">Safety Standards</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
            <p>© 2026 GigWorker Delivery Inc. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

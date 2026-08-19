import { useNavigate } from "react-router";
import { Store, Package, PlusCircle, User, LogOut } from "lucide-react";

export default function RestaurantDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <header className="bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <Store className="w-8 h-8 text-[#A33D20]" />

            <h1 className="text-2xl font-extrabold text-slate-900">
              GigWorker
            </h1>

          </div>


          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-600 hover:text-[#A33D20]"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>

        </div>

      </header>


      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-10">

          <h2 className="text-3xl font-extrabold text-slate-900">
            Welcome, {user.name || "Restaurant"} 👋
          </h2>

          <p className="text-slate-600 mt-2">
            Manage your deliveries and restaurant account.
          </p>

        </div>


        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl border border-slate-200">

            <PlusCircle className="w-8 h-8 text-[#A33D20] mb-4" />

            <h3 className="text-xl font-bold">
              Create Delivery
            </h3>

            <p className="text-slate-500 mt-2">
              Create a new delivery request.
            </p>

            <button className="mt-5 bg-[#A33D20] text-white px-5 py-3 rounded-xl font-bold">
              Create Delivery
            </button>

          </div>


          <div className="bg-white p-6 rounded-2xl border border-slate-200">

            <Package className="w-8 h-8 text-[#A33D20] mb-4" />

            <h3 className="text-xl font-bold">
              My Deliveries
            </h3>

            <p className="text-slate-500 mt-2">
              View and track your deliveries.
            </p>

          </div>


          <div className="bg-white p-6 rounded-2xl border border-slate-200">

            <User className="w-8 h-8 text-[#A33D20] mb-4" />

            <h3 className="text-xl font-bold">
              Restaurant Profile
            </h3>

            <p className="text-slate-500 mt-2">
              {user.email || "Your account"}
            </p>

            <button className="mt-5 border border-slate-300 px-5 py-3 rounded-xl font-bold">
              View Profile
            </button>

          </div>

        </div>


        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">

          <h3 className="text-2xl font-bold mb-3">
            Delivery Requests
          </h3>

          <p className="text-slate-500">
            You don't have any delivery requests yet.
          </p>

        </div>

      </main>

    </div>
  );
}
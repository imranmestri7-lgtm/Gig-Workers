import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LogOut, Package, MapPin, IndianRupee, User } from "lucide-react";

export default function RiderDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(savedUser);

    // Make sure only rider can access this page
    if (userData.accountType !== "rider") {
      navigate("/");
      return;
    }

    setUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-extrabold text-[#A33D20]">
              GigWorker
            </h1>

            <p className="text-sm text-slate-500">
              Rider Dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-slate-500" />

              <span className="font-semibold text-slate-700">
                {user?.name}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

          </div>

        </div>
      </nav>


      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* WELCOME */}
        <div className="mb-8">

          <h2 className="text-3xl font-extrabold text-slate-900">
            Welcome, {user?.name} 👋
          </h2>

          <p className="text-slate-600 mt-2">
            Find deliveries and start earning.
          </p>

        </div>


        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500">
                  Available Deliveries
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  0
                </h3>
              </div>

              <Package className="w-10 h-10 text-[#A33D20]" />

            </div>
          </div>


          <div className="bg-white p-6 rounded-2xl border border-slate-200">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500">
                  Completed Deliveries
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  0
                </h3>
              </div>

              <MapPin className="w-10 h-10 text-green-600" />

            </div>

          </div>


          <div className="bg-white p-6 rounded-2xl border border-slate-200">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500">
                  Total Earnings
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  ₹0
                </h3>
              </div>

              <IndianRupee className="w-10 h-10 text-blue-600" />

            </div>

          </div>

        </div>


        {/* AVAILABLE DELIVERIES */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Available Deliveries
              </h3>

              <p className="text-slate-500 mt-1">
                Choose a delivery and start earning.
              </p>
            </div>

          </div>


          {/* EMPTY STATE */}
          <div className="text-center py-16">

            <Package className="w-16 h-16 mx-auto text-slate-300" />

            <h4 className="text-xl font-bold text-slate-700 mt-4">
              No deliveries available
            </h4>

            <p className="text-slate-500 mt-2">
              New delivery requests will appear here.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  LogOut,
  Package,
  PlusCircle,
  Truck,
  User,
  MapPin,
  IndianRupee,
} from "lucide-react";


export default function RestaurantDashboard() {

  const navigate = useNavigate();


  const [user, setUser] = useState<any>(null);

  const [showForm, setShowForm] = useState(false);

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  const [payment, setPayment] = useState("");

  const [loading, setLoading] = useState(false);

  const [deliveries, setDeliveries] = useState<any[]>([]);


  // =====================================
  // CHECK LOGIN
  // =====================================

  useEffect(() => {

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(savedUser);

    if (userData.accountType !== "restaurant") {
      navigate("/");
      return;
    }

    setUser(userData);

    fetchRestaurantDeliveries(userData.id);

  }, [navigate]);


  // =====================================
  // GET RESTAURANT DELIVERIES
  // =====================================

  const fetchRestaurantDeliveries = async (restaurantId: string) => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/deliveries/restaurant/${restaurantId}`
      );

      const data = await response.json();

      if (response.ok) {
        setDeliveries(data.deliveries);
      }

    } catch (error) {

      console.error("Get deliveries error:", error);

    }
  };


  // =====================================
  // CREATE DELIVERY
  // =====================================

  const handleCreateDelivery = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    if (!user) {
      alert("Please login again");
      return;
    }

    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:5000/api/deliveries",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            restaurantId: user.id,
            pickupLocation,
            dropLocation,
            packageDetails,
            payment: Number(payment),
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(data.message || "Failed to create delivery");

        return;
      }


      alert("Delivery created successfully!");


      // Clear form
      setPickupLocation("");
      setDropLocation("");
      setPackageDetails("");
      setPayment("");

      setShowForm(false);


      // Reload deliveries
      fetchRestaurantDeliveries(user.id);

    } catch (error) {

      console.error("Create delivery error:", error);

      alert("Server not connected");

    } finally {

      setLoading(false);

    }
  };


  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  return (

    <div className="min-h-screen bg-slate-50">


      {/* =====================================
          NAVBAR
      ===================================== */}

      <nav className="bg-white border-b border-slate-200 px-6 py-4">

        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-extrabold text-[#A33D20]">
              GigWorker
            </h1>

            <p className="text-sm text-slate-500">
              Restaurant Dashboard
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


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="max-w-7xl mx-auto px-6 py-8">


        {/* WELCOME */}

        <div className="mb-8">

          <h2 className="text-3xl font-extrabold text-slate-900">

            Welcome, {user?.name} 👋

          </h2>

          <p className="text-slate-600 mt-2">

            Manage your deliveries and orders.

          </p>

        </div>


        {/* =====================================
            CREATE DELIVERY BUTTON
        ===================================== */}

        <div className="bg-[#A33D20] rounded-2xl p-6 text-white mb-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <div>

              <h3 className="text-2xl font-bold">

                Need a delivery partner?

              </h3>

              <p className="text-white/80 mt-1">

                Post a new delivery request for riders.

              </p>

            </div>


            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-white text-[#A33D20] px-5 py-3 rounded-xl font-bold hover:bg-slate-100"
            >

              <PlusCircle className="w-5 h-5" />

              {showForm ? "Close Form" : "Create Delivery"}

            </button>

          </div>

        </div>


        {/* =====================================
            CREATE DELIVERY FORM
        ===================================== */}

        {showForm && (

          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">

            <h3 className="text-2xl font-bold text-slate-900 mb-6">

              Create New Delivery

            </h3>


            <form
              onSubmit={handleCreateDelivery}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >


              {/* PICKUP */}

              <div>

                <label className="block font-semibold text-slate-700 mb-2">

                  Pickup Location

                </label>

                <div className="relative">

                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) =>
                      setPickupLocation(e.target.value)
                    }
                    placeholder="e.g. Kolhapur"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A33D20]"
                    required
                  />

                </div>

              </div>


              {/* DROP */}

              <div>

                <label className="block font-semibold text-slate-700 mb-2">

                  Drop Location

                </label>

                <div className="relative">

                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

                  <input
                    type="text"
                    value={dropLocation}
                    onChange={(e) =>
                      setDropLocation(e.target.value)
                    }
                    placeholder="e.g. Rankala"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A33D20]"
                    required
                  />

                </div>

              </div>


              {/* PACKAGE */}

              <div className="md:col-span-2">

                <label className="block font-semibold text-slate-700 mb-2">

                  Package Details

                </label>

                <input
                  type="text"
                  value={packageDetails}
                  onChange={(e) =>
                    setPackageDetails(e.target.value)
                  }
                  placeholder="e.g. Food parcel"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A33D20]"
                  required
                />

              </div>


              {/* PAYMENT */}

              <div>

                <label className="block font-semibold text-slate-700 mb-2">

                  Delivery Payment (₹)

                </label>

                <div className="relative">

                  <IndianRupee className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

                  <input
                    type="number"
                    min="1"
                    value={payment}
                    onChange={(e) =>
                      setPayment(e.target.value)
                    }
                    placeholder="150"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A33D20]"
                    required
                  />

                </div>

              </div>


              {/* BUTTON */}

              <div className="flex items-end">

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#A33D20] text-white font-bold hover:bg-[#8B331A] disabled:opacity-60"
                >

                  {loading
                    ? "Posting..."
                    : "Post Delivery"}

                </button>

              </div>

            </form>

          </div>

        )}


        {/* =====================================
            STAT CARDS
        ===================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">


          <div className="bg-white p-6 rounded-2xl border border-slate-200">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">
                  Active Deliveries
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {
                    deliveries.filter(
                      (d) => d.status !== "completed"
                    ).length
                  }
                </h3>

              </div>

              <Truck className="w-10 h-10 text-[#A33D20]" />

            </div>

          </div>


          <div className="bg-white p-6 rounded-2xl border border-slate-200">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">
                  Completed
                </p>

                <h3 className="text-3xl font-bold mt-2">

                  {
                    deliveries.filter(
                      (d) => d.status === "completed"
                    ).length
                  }

                </h3>

              </div>

              <Package className="w-10 h-10 text-green-600" />

            </div>

          </div>


          <div className="bg-white p-6 rounded-2xl border border-slate-200">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">
                  Total Requests
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {deliveries.length}
                </h3>

              </div>

              <PlusCircle className="w-10 h-10 text-blue-600" />

            </div>

          </div>

        </div>


        {/* =====================================
            MY DELIVERIES
        ===================================== */}

        <div className="bg-white rounded-2xl border border-slate-200 p-6">

          <h3 className="text-2xl font-bold text-slate-900">

            My Deliveries

          </h3>

          <p className="text-slate-500 mt-1 mb-6">

            Track your delivery requests.

          </p>


          {deliveries.length === 0 ? (

            <div className="text-center py-16">

              <Package className="w-16 h-16 mx-auto text-slate-300" />

              <h4 className="text-xl font-bold text-slate-700 mt-4">

                No deliveries yet

              </h4>

              <p className="text-slate-500 mt-2">

                Create your first delivery request.

              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {deliveries.map((delivery) => (

                <div
                  key={delivery._id}
                  className="border border-slate-200 rounded-xl p-5"
                >

                  <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div>

                      <p className="font-bold text-lg">

                        {delivery.packageDetails}

                      </p>

                      <p className="text-slate-500 mt-1">

                        {delivery.pickupLocation}
                        {" → "}
                        {delivery.dropLocation}

                      </p>

                    </div>


                    <div className="text-right">

                      <p className="font-bold text-[#A33D20]">

                        ₹{delivery.payment}

                      </p>

                      <span className="text-sm capitalize text-slate-500">

                        {delivery.status.replace("_", " ")}

                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}
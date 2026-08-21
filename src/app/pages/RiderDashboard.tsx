import { useEffect, useState } from "react";
import {
  MapPin,
  Package,
  IndianRupee,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router";

type Delivery = {
  _id: string;
  pickupLocation: string;
  dropLocation: string;
  packageDetails: string;
  payment: number;
  status: string;
  restaurantId?: {
    name: string;
    email: string;
  };
};

export default function RiderDashboard() {
  const navigate = useNavigate();

  const [availableDeliveries, setAvailableDeliveries] = useState<Delivery[]>(
    []
  );

  const [activeDeliveries, setActiveDeliveries] = useState<Delivery[]>([]);

  const [loading, setLoading] = useState(true);

  const [acceptingId, setAcceptingId] = useState<string | null>(null);


  // ==========================================
  // GET CURRENT RIDER
  // ==========================================

  const getCurrentUser = () => {
    const userString = localStorage.getItem("user");

    if (!userString) {
      return null;
    }

    try {
      return JSON.parse(userString);
    } catch {
      return null;
    }
  };


  // ==========================================
  // FETCH AVAILABLE DELIVERIES
  // ==========================================

  const fetchAvailableDeliveries = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/deliveries/available"
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setAvailableDeliveries(data);

    } catch (error) {
      console.error("Available deliveries error:", error);
    }
  };


  // ==========================================
  // FETCH RIDER ACTIVE DELIVERIES
  // ==========================================

  const fetchActiveDeliveries = async () => {
    try {
      const user = getCurrentUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/deliveries/rider/${user.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setActiveDeliveries(data);

    } catch (error) {
      console.error("Active deliveries error:", error);
    }
  };


  // ==========================================
  // LOAD ALL DATA
  // ==========================================

  const loadDeliveries = async () => {
    setLoading(true);

    await Promise.all([
      fetchAvailableDeliveries(),
      fetchActiveDeliveries(),
    ]);

    setLoading(false);
  };


  // ==========================================
  // LOAD WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {
    loadDeliveries();
  }, []);


  // ==========================================
  // ACCEPT DELIVERY
  // ==========================================

  const handleAccept = async (deliveryId: string) => {
    try {
      const user = getCurrentUser();

      if (!user) {
        alert("Please login again");
        navigate("/login");
        return;
      }

      setAcceptingId(deliveryId);

      const response = await fetch(
        `http://localhost:5000/api/deliveries/${deliveryId}/accept`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            riderId: user.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to accept delivery");
        return;
      }

      alert("Delivery accepted successfully!");


      // ========================================
      // IMPORTANT
      // Remove accepted order from available
      // ========================================

      setAvailableDeliveries((previous) =>
        previous.filter(
          (delivery) => delivery._id !== deliveryId
        )
      );


      // ========================================
      // Add accepted order to active deliveries
      // ========================================

      setActiveDeliveries((previous) => [
        data.delivery,
        ...previous,
      ]);

    } catch (error) {
      console.error("Accept delivery error:", error);

      alert("Server not connected");

    } finally {
      setAcceptingId(null);
    }
  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };


  // ==========================================
  // TOTAL EARNINGS
  // ==========================================

  const totalEarnings = activeDeliveries.reduce(
    (total, delivery) => total + delivery.payment,
    0
  );


  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-extrabold text-[#A33D20]">
              GigWorker
            </h1>

            <p className="text-sm text-slate-500">
              Rider Dashboard
            </p>
          </div>


          <div className="flex items-center gap-4">

            <span className="font-semibold text-slate-700">
              {getCurrentUser()?.name || "Rider"}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

          </div>

        </div>

      </header>


      {/* ======================================
          MAIN
      ====================================== */}

      <main className="max-w-7xl mx-auto px-6 py-10">


        {/* WELCOME */}

        <div className="mb-8">

          <h2 className="text-3xl font-extrabold text-slate-900">
            Welcome, {getCurrentUser()?.name || "Rider"} 👋
          </h2>

          <p className="text-slate-600 mt-2">
            Find deliveries and start earning.
          </p>

        </div>


        {/* ======================================
            STATISTICS
        ====================================== */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">


          {/* AVAILABLE */}

          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex justify-between">

              <div>

                <p className="text-slate-500 font-medium">
                  Available Deliveries
                </p>

                <p className="text-4xl font-extrabold text-slate-900 mt-2">
                  {availableDeliveries.length}
                </p>

              </div>

              <Package className="w-10 h-10 text-[#A33D20]" />

            </div>

          </div>


          {/* ACTIVE */}

          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex justify-between">

              <div>

                <p className="text-slate-500 font-medium">
                  Active Deliveries
                </p>

                <p className="text-4xl font-extrabold text-slate-900 mt-2">
                  {activeDeliveries.length}
                </p>

              </div>

              <MapPin className="w-10 h-10 text-green-600" />

            </div>

          </div>


          {/* EARNINGS */}

          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex justify-between">

              <div>

                <p className="text-slate-500 font-medium">
                  Active Earnings
                </p>

                <p className="text-4xl font-extrabold text-slate-900 mt-2">
                  ₹{totalEarnings}
                </p>

              </div>

              <IndianRupee className="w-10 h-10 text-blue-600" />

            </div>

          </div>

        </div>


        {/* ======================================
            AVAILABLE DELIVERIES
        ====================================== */}

        <section className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">

          <div className="mb-6">

            <h2 className="text-2xl font-extrabold text-slate-900">
              Available Deliveries
            </h2>

            <p className="text-slate-500">
              Choose a delivery and start earning.
            </p>

          </div>


          {loading ? (

            <p className="text-slate-500">
              Loading deliveries...
            </p>

          ) : availableDeliveries.length === 0 ? (

            <div className="text-center py-10">

              <Package className="w-12 h-12 mx-auto text-slate-300 mb-3" />

              <h3 className="text-lg font-bold text-slate-700">
                No available deliveries
              </h3>

              <p className="text-slate-500">
                New restaurant requests will appear here.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {availableDeliveries.map((delivery) => (

                <div
                  key={delivery._id}
                  className="border border-slate-200 rounded-2xl p-5"
                >

                  {/* RESTAURANT */}

                  <div className="flex justify-between mb-5">

                    <div>

                      <p className="text-sm text-slate-500">
                        Restaurant
                      </p>

                      <h3 className="text-xl font-bold text-slate-900">
                        {delivery.restaurantId?.name || "Restaurant"}
                      </h3>

                    </div>


                    <p className="text-xl font-bold text-[#A33D20]">
                      ₹ {delivery.payment}
                    </p>

                  </div>


                  {/* PICKUP */}

                  <div className="mb-4">

                    <p className="text-xs text-slate-500 uppercase">
                      Pickup
                    </p>

                    <p className="font-semibold text-slate-800">
                      {delivery.pickupLocation}
                    </p>

                  </div>


                  {/* DROP */}

                  <div className="mb-4">

                    <p className="text-xs text-slate-500 uppercase">
                      Drop
                    </p>

                    <p className="font-semibold text-slate-800">
                      {delivery.dropLocation}
                    </p>

                  </div>


                  {/* PACKAGE */}

                  <div className="bg-slate-50 rounded-xl p-4 mb-5">

                    <p className="text-xs text-slate-500 uppercase">
                      Package
                    </p>

                    <p className="font-semibold text-slate-800">
                      {delivery.packageDetails}
                    </p>

                  </div>


                  {/* ACCEPT */}

                  <button
                    onClick={() => handleAccept(delivery._id)}
                    disabled={acceptingId === delivery._id}
                    className="w-full py-3 rounded-xl bg-[#A33D20] text-white font-bold hover:bg-[#8B331A] disabled:opacity-60"
                  >
                    {acceptingId === delivery._id
                      ? "Accepting..."
                      : "Accept Delivery"}
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* ======================================
            MY ACTIVE DELIVERY
        ====================================== */}

        <section className="bg-white border border-slate-200 rounded-2xl p-6">

          <div className="mb-6">

            <h2 className="text-2xl font-extrabold text-slate-900">
              My Active Deliveries
            </h2>

            <p className="text-slate-500">
              Deliveries you have accepted.
            </p>

          </div>


          {activeDeliveries.length === 0 ? (

            <div className="text-center py-10">

              <MapPin className="w-12 h-12 mx-auto text-slate-300 mb-3" />

              <h3 className="text-lg font-bold text-slate-700">
                No active deliveries
              </h3>

              <p className="text-slate-500">
                Accept a delivery to see it here.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {activeDeliveries.map((delivery) => (

                <div
                  key={delivery._id}
                  className="border border-green-200 bg-green-50 rounded-2xl p-5"
                >

                  <div className="flex justify-between mb-5">

                    <div>

                      <p className="text-sm text-slate-500">
                        Restaurant
                      </p>

                      <h3 className="text-xl font-bold text-slate-900">
                        {delivery.restaurantId?.name || "Restaurant"}
                      </h3>

                    </div>

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold h-fit">
                      Accepted
                    </span>

                  </div>


                  <div className="space-y-4">

                    <div>

                      <p className="text-xs text-slate-500 uppercase">
                        Pickup
                      </p>

                      <p className="font-semibold">
                        {delivery.pickupLocation}
                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-slate-500 uppercase">
                        Drop
                      </p>

                      <p className="font-semibold">
                        {delivery.dropLocation}
                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-slate-500 uppercase">
                        Package
                      </p>

                      <p className="font-semibold">
                        {delivery.packageDetails}
                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-slate-500 uppercase">
                        Payment
                      </p>

                      <p className="font-bold text-green-600">
                        ₹{delivery.payment}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}
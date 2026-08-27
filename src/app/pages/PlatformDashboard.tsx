
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Platform = {
  name: string;
  value: string;
  icon: string;
};

type PlatformStats = {
  todayDeliveries: number;
  todayEarnings: number;
  weekDeliveries: number;
  weekEarnings: number;
  totalDeliveries: number;
  totalEarnings: number;
};

const platforms: Platform[] = [
  {
    name: "Zomato",
    value: "zomato",
    icon: "🛵",
  },
  {
    name: "Swiggy",
    value: "swiggy",
    icon: "🍔",
  },
  {
    name: "Uber",
    value: "uber",
    icon: "🚕",
  },
  {
    name: "Blinkit",
    value: "blinkit",
    icon: "🛒",
  },
  {
    name: "Zepto",
    value: "zepto",
    icon: "🛍️",
  },
];

export default function PlatformDashboard() {
  const navigate = useNavigate();

  const [selectedPlatform, setSelectedPlatform] =
    useState<string>("zomato");

  const [stats, setStats] = useState<PlatformStats>({
    todayDeliveries: 0,
    todayEarnings: 0,
    weekDeliveries: 0,
    weekEarnings: 0,
    totalDeliveries: 0,
    totalEarnings: 0,
  });

  const [platformOrders, setPlatformOrders] =
    useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const riderId = user._id || user.id;

  useEffect(() => {
    if (!riderId) {
      return;
    }

    loadPlatformStats();
    loadPlatformOrders();
  }, [selectedPlatform, riderId]);

  const loadPlatformStats = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/deliveries/rider/platform-stats/${riderId}/${selectedPlatform}`
      );

      const data = await response.json();

      if (response.ok) {
        setStats(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(
        "Platform stats error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const loadPlatformOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deliveries/rider/platform-orders/${riderId}/${selectedPlatform}`
      );

      const data = await response.json();

      if (response.ok) {
        setPlatformOrders(data);
      } else {
        console.log(data.message);
        setPlatformOrders([]);
      }
    } catch (error) {
      console.log(
        "Platform orders error:",
        error
      );

      setPlatformOrders([]);
    }
  };

  const currentPlatform = platforms.find(
    (platform) =>
      platform.value === selectedPlatform
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <header className="bg-gray-900 text-white px-8 py-6">

        <div className="max-w-6xl mx-auto">

          <button
            onClick={() =>
              navigate("/rider-dashboard")
            }
            className="mb-4 text-gray-300 hover:text-white"
          >
            ← Back to Rider Dashboard
          </button>

          <h1 className="text-3xl font-bold">
            Platform Dashboard
          </h1>

          <p className="text-gray-300 mt-1">
            View your delivery performance by platform
          </p>

        </div>

      </header>


      <main className="max-w-6xl mx-auto p-8">

        {/* Platform Selection */}

        <section>

          <h2 className="text-2xl font-bold mb-5">
            Select Platform
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            {platforms.map((platform) => (

              <button
                key={platform.value}
                onClick={() =>
                  setSelectedPlatform(
                    platform.value
                  )
                }
                className={`p-5 rounded-2xl shadow font-bold text-lg transition ${
                  selectedPlatform ===
                  platform.value
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >

                <div className="text-3xl mb-2">
                  {platform.icon}
                </div>

                {platform.name}

              </button>

            ))}

          </div>

        </section>


        {/* Selected Platform */}

        <section className="mt-10">

          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <span className="text-4xl">
                {currentPlatform?.icon}
              </span>

              <div>

                <h2 className="text-3xl font-bold">
                  {currentPlatform?.name}
                </h2>

                <p className="text-gray-500">
                  Your {currentPlatform?.name} delivery performance
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* Statistics */}

        <section className="mt-8">

          {loading ? (

            <div className="bg-white rounded-2xl shadow p-10 text-center">

              <p className="text-lg font-semibold">
                Loading platform statistics...
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-3 gap-6">

              {/* Today */}

              <div className="bg-white rounded-2xl shadow p-6">

                <p className="text-gray-500 font-semibold">
                  Today
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {stats.todayDeliveries}
                </h3>

                <p className="text-gray-500 mt-1">
                  Deliveries
                </p>

                <p className="text-xl font-bold text-green-600 mt-4">
                  ₹{stats.todayEarnings}
                </p>

                <p className="text-gray-500">
                  Today's Earnings
                </p>

              </div>


              {/* This Week */}

              <div className="bg-white rounded-2xl shadow p-6">

                <p className="text-gray-500 font-semibold">
                  This Week
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {stats.weekDeliveries}
                </h3>

                <p className="text-gray-500 mt-1">
                  Deliveries
                </p>

                <p className="text-xl font-bold text-green-600 mt-4">
                  ₹{stats.weekEarnings}
                </p>

                <p className="text-gray-500">
                  This Week's Earnings
                </p>

              </div>


              {/* Total */}

              <div className="bg-white rounded-2xl shadow p-6">

                <p className="text-gray-500 font-semibold">
                  Overall
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {stats.totalDeliveries}
                </h3>

                <p className="text-gray-500 mt-1">
                  Total Deliveries
                </p>

                <p className="text-xl font-bold text-green-600 mt-4">
                  ₹{stats.totalEarnings}
                </p>

                <p className="text-gray-500">
                  Total Earnings
                </p>

              </div>

            </div>

          )}

        </section>


        {/* Completed Deliveries */}

        <section className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Completed {currentPlatform?.name} Deliveries
          </h2>

          {platformOrders.length === 0 ? (

            <div className="bg-white rounded-2xl shadow p-8 text-center">

              <p className="text-gray-500">
                No completed deliveries yet.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {platformOrders.map((order) => (

                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow p-6"
                >

                  <p className="text-red-600 font-bold mb-3">
                    {currentPlatform?.icon}{" "}
                    {order.platform}
                  </p>

                  <h3 className="text-xl font-bold">
                    {order.restaurantName}
                  </h3>

                  <p className="mt-3">
                    📍 <b>Pickup:</b>{" "}
                    {order.pickupLocation}
                  </p>

                  <p>
                    🏠 <b>Drop:</b>{" "}
                    {order.dropLocation}
                  </p>

                  <p>
                    📦 <b>Package:</b>{" "}
                    {order.packageDetails}
                  </p>

                  <p className="font-bold text-green-700 mt-3">
                    💰 ₹{order.payment}
                  </p>

                  <p className="text-gray-500 mt-2">
                    Order ID: {order.orderId}
                  </p>

                  <p className="text-green-600 font-bold mt-2">
                    ✓ Delivered
                  </p>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* Summary */}

        <section className="mt-8">

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">

            <h3 className="text-xl font-bold">

              {currentPlatform?.icon}{" "}
              {currentPlatform?.name} Summary

            </h3>

            <p className="text-gray-600 mt-2">

              You have completed{" "}

              <span className="font-bold">
                {stats.totalDeliveries}
              </span>{" "}

              deliveries on{" "}

              <span className="font-bold">
                {currentPlatform?.name}
              </span>{" "}

              and earned{" "}

              <span className="font-bold text-green-700">
                ₹{stats.totalEarnings}
              </span>{" "}

              in total.

            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Delivery = {

  _id: string;

  restaurantName: string;

  platform: string;

  orderId?: string;

  pickupLocation: string;

  dropLocation: string;

  packageDetails: string;

  payment: number;

  status: string;

  distance?: string;

  estimatedTime?: string;

  category?: string;

};

// Helper to choose an image directly related to the specific dish name
const getDishImage = (details: string = "", category: string = "") => {
  const text = (details + " " + category).toLowerCase();
  
  if (text.includes("pizza")) {
    return "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80"; // Pizza
  } else if (text.includes("burger")) {
    return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"; // Burger
  } else if (text.includes("biryani")) {
    return "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80"; // Biryani
  } else if (text.includes("chicken") || text.includes("chicken dish")) {
    return "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80"; // Chicken Dish / Curry
  } else if (text.includes("noodle") || text.includes("pasta") || text.includes("chinese")) {
    return "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80"; // Noodles / Pasta
  } else if (text.includes("cafe") || text.includes("coffee") || text.includes("bakery") || text.includes("cake")) {
    return "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80"; // Cafe / Coffee / Cake
  } else if (text.includes("grocery") || text.includes("vegetable")) {
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80"; // Groceries
  } 
};

export default function DeliveryHistory() {

  const navigate = useNavigate();


  const [deliveries, setDeliveries] =
    useState<Delivery[]>([]);


  const [loading, setLoading] =
    useState(true);


  const user =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    );


  const fetchHistory = async () => {

    try {

      if (!user.id) {
        return;
      }


      const response = await fetch(
        `http://localhost:5000/api/deliveries/rider/history/${user.id}`
      );


      const data = await response.json();


      console.log(
        "Delivery History:",
        data
      );


      if (response.ok) {

        setDeliveries(data);

      }

    }
    catch (error) {

      console.log(
        "History Error:",
        error
      );

    }
    finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchHistory();

  }, []);


  return (

    <div className="min-h-screen bg-slate-50">


      {/* HEADER */}

      <header className="bg-white border-b">

        <div className="max-w-7xl mx-auto px-6 py-5">

          <button
            onClick={() =>
              navigate("/rider-dashboard")
            }
            className="text-gray-700 font-semibold hover:text-black"
          >
            ← Back to Rider Dashboard
          </button>

        </div>

      </header>



      {/* MAIN */}

      <main className="max-w-7xl mx-auto p-8">


        <h1 className="text-4xl font-bold">

          📜 Delivery History

        </h1>


        <p className="text-gray-600 mt-2 mb-8">

          View all your completed deliveries

        </p>



        {/* LOADING */}

        {loading && (

          <div className="bg-white p-10 rounded-2xl shadow">

            Loading delivery history...

          </div>

        )}



        {/* NO HISTORY */}

        {!loading &&
          deliveries.length === 0 && (

            <div className="bg-white p-10 rounded-2xl shadow text-center">

              <div className="text-5xl mb-4">
                📦
              </div>

              <h2 className="text-2xl font-bold">

                No Completed Deliveries

              </h2>

              <p className="text-gray-500 mt-2">

                Your completed deliveries will appear here.

              </p>

            </div>

          )}



        {/* HISTORY */}

        {!loading &&
          deliveries.length > 0 && (

            <div className="grid md:grid-cols-2 gap-6">

              {deliveries.map(
                (delivery) => (

                  <div
                    key={delivery._id}
                    className="bg-white rounded-2xl shadow p-6"
                  >


                   {/* Image and Restaurant Details Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={getDishImage(delivery.packageDetails, delivery.category)} 
                        alt="Food item" 
                        className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-slate-100 shrink-0"
                      />
                      <div>
                        <p className="text-red-600 font-bold text-xs uppercase tracking-wider">
                          🛵 {delivery.platform}
                        </p>
                        <h2 className="text-xl font-bold text-slate-900">
                          {delivery.restaurantName}
                        </h2>
                      </div>
                    </div>

                    {/* PICKUP */}

                    <p className="mt-4">

                      📍 <strong>Pickup:</strong>{" "}

                      {delivery.pickupLocation}

                    </p>


                    {/* DROP */}

                    <p className="mt-2">

                      🏠 <strong>Drop:</strong>{" "}

                      {delivery.dropLocation}

                    </p>


                    {/* PACKAGE */}

                    <p className="mt-2">

                      📦 <strong>Package:</strong>{" "}

                      {delivery.packageDetails}

                    </p>


                    {/* DISTANCE */}

                    <p className="mt-2">

                      📏 <strong>Distance:</strong>{" "}

                      {delivery.distance ||
                        "Not available"}

                    </p>


                    {/* TIME */}

                    <p className="mt-2">

                      ⏱️ <strong>Estimated Time:</strong>{" "}

                      {delivery.estimatedTime ||
                        "Not available"}

                    </p>


                    {/* PAYMENT */}

                    <p className="text-green-600 font-bold text-lg mt-4">

                      💰 ₹{delivery.payment}

                    </p>


                    {/* ORDER ID */}

                    <p className="text-gray-500 mt-2">

                      🆔 <strong>Order ID:</strong>{" "}

                      {delivery.orderId ||
                        "Not available"}

                    </p>


                    {/* STATUS */}

                    <div className="mt-5">

                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold">

                        ✓ Delivered

                      </span>

                    </div>

                    <button
  onClick={() =>
    navigate("/messages", {
      state: { delivery: delivery },
    })
  }
  className="mt-6 bg-[#A33D20] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#8f331b] transition"
>
  💬 View Conversation
</button>
 

                  </div>

                )
              )}

            </div>

          )}

      </main>

    </div>

  );

}
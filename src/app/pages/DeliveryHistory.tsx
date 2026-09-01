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


                    {/* PLATFORM */}

                    <p className="text-red-600 font-bold mb-2">

                      🛵 {delivery.platform}

                    </p>


                    {/* RESTAURANT */}

                    <h2 className="text-2xl font-bold">

                      {delivery.restaurantName}

                    </h2>


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


                  </div>

                )
              )}

            </div>

          )}

      </main>

    </div>

  );

}
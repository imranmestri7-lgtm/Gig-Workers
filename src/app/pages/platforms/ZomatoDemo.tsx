import { useState } from "react";

export default function ZomatoDemo() {

  const [form, setForm] = useState({
    restaurantName: "Era Cafe",
    pickupLocation: "Nagalapark",
    dropLocation: "Rankala",
    packageDetails: "Chicken Dish",
    payment: "350",
  });

  const [message, setMessage] = useState("");

  const sendToGigWorker = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/deliveries",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            restaurantId: "zomato-demo",

            restaurantName: form.restaurantName,

            platform: "zomato",

            orderId: "ZOM-" + Date.now(),

            category: "restaurant",

            pickupLocation: form.pickupLocation,

            dropLocation: form.dropLocation,

            packageDetails: form.packageDetails,

            payment: Number(form.payment),

            distance: "3 km",

            estimatedTime: "15 min",

          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        setMessage(
          "✅ Delivery sent to GigWorker successfully!"
        );

      } else {

        setMessage(
          "❌ " + (data.message || "Failed to create delivery")
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "❌ Backend server is not connected"
      );

    }

  };

  return (
    <div className="min-h-screen bg-red-50">

      <header className="bg-red-600 text-white px-8 py-5">

        <h1 className="text-3xl font-bold">
          Zomato Demo
        </h1>

        <p>
          Restaurant Delivery Simulator
        </p>

      </header>


      <main className="max-w-3xl mx-auto p-8">

        <div className="bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            New Zomato Order
          </h2>


          <div className="space-y-5">

            <div>

              <label className="font-semibold">
                Restaurant
              </label>

              <input
                value={form.restaurantName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    restaurantName: e.target.value
                  })
                }
                className="w-full border p-3 rounded-xl mt-2"
              />

            </div>


            <div>

              <label className="font-semibold">
                Pickup Location
              </label>

              <input
                value={form.pickupLocation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pickupLocation: e.target.value
                  })
                }
                className="w-full border p-3 rounded-xl mt-2"
              />

            </div>


            <div>

              <label className="font-semibold">
                Drop Location
              </label>

              <input
                value={form.dropLocation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dropLocation: e.target.value
                  })
                }
                className="w-full border p-3 rounded-xl mt-2"
              />

            </div>


            <div>

              <label className="font-semibold">
                Package
              </label>

              <input
                value={form.packageDetails}
                onChange={(e) =>
                  setForm({
                    ...form,
                    packageDetails: e.target.value
                  })
                }
                className="w-full border p-3 rounded-xl mt-2"
              />

            </div>


            <div>

              <label className="font-semibold">
                Payment
              </label>

              <input
                type="number"
                value={form.payment}
                onChange={(e) =>
                  setForm({
                    ...form,
                    payment: e.target.value
                  })
                }
                className="w-full border p-3 rounded-xl mt-2"
              />

            </div>


            <button
              onClick={sendToGigWorker}
              className="w-full bg-red-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-red-700"
            >
              🚴 Send Delivery to GigWorker
            </button>


            {message && (
              <div className="bg-gray-100 p-4 rounded-xl text-center font-semibold">
                {message}
              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}
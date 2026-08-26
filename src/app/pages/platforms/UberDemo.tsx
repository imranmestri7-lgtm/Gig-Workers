import { useState } from "react";

export default function UberDemo() {
  const [form, setForm] = useState({
    restaurantName: "Uber Eats Restaurant",
    pickupLocation: "Tarabai Park",
    dropLocation: "Rankala",
    packageDetails: "Food Package",
    payment: "400",
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
            restaurantId: "uber-demo",

            restaurantName: form.restaurantName,

            platform: "uber",

            orderId: "UBR-" + Date.now(),

            category: "restaurant",

            pickupLocation: form.pickupLocation,

            dropLocation: form.dropLocation,

            packageDetails: form.packageDetails,

            payment: Number(form.payment),

            distance: "5 km",

            estimatedTime: "25 min",
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
          "❌ " +
            (data.message ||
              "Failed to create delivery")
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
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-black text-white px-8 py-5">

        <h1 className="text-3xl font-bold">
          Uber Demo
        </h1>

        <p>
          Delivery Platform Simulator
        </p>

      </header>


      {/* Main */}
      <main className="max-w-3xl mx-auto p-8">

        <div className="bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            New Uber Delivery
          </h2>


          <div className="space-y-5">

            {/* Restaurant */}
            <div>

              <label className="font-semibold">
                Restaurant
              </label>

              <input
                value={form.restaurantName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    restaurantName:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl mt-2"
              />

            </div>


            {/* Pickup */}
            <div>

              <label className="font-semibold">
                Pickup Location
              </label>

              <input
                value={form.pickupLocation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pickupLocation:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl mt-2"
              />

            </div>


            {/* Drop */}
            <div>

              <label className="font-semibold">
                Drop Location
              </label>

              <input
                value={form.dropLocation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dropLocation:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl mt-2"
              />

            </div>


            {/* Package */}
            <div>

              <label className="font-semibold">
                Package
              </label>

              <input
                value={form.packageDetails}
                onChange={(e) =>
                  setForm({
                    ...form,
                    packageDetails:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl mt-2"
              />

            </div>


            {/* Payment */}
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
                    payment:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl mt-2"
              />

            </div>


            {/* Send */}
            <button
              onClick={sendToGigWorker}
              className="w-full bg-black text-white p-4 rounded-xl font-bold text-lg hover:bg-gray-800"
            >
              🚴 Send Delivery to GigWorker
            </button>


            {/* Message */}
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
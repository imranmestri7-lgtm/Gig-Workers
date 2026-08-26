import { useState } from "react";

export default function ZeptoDemo() {
  const [form, setForm] = useState({
    storeName: "Zepto Store",
    pickupLocation: "Rajarampuri",
    dropLocation: "Rankala",
    packageDetails: "Daily Grocery",
    payment: "300",
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
            restaurantId: "zepto-demo",
            restaurantName: form.storeName,

            platform: "zepto",
            orderId: "ZEP-" + Date.now(),

            category: "grocery",

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
        setMessage("✅ Delivery sent to GigWorker successfully!");
      } else {
        setMessage(
          "❌ " + (data.message || "Failed to create delivery")
        );
      }
    } catch (error) {
      console.log(error);
      setMessage("❌ Backend server is not connected");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50">

      <header className="bg-purple-600 text-white px-8 py-5">
        <h1 className="text-3xl font-bold">
          Zepto Demo
        </h1>

        <p>
          Grocery Delivery Simulator
        </p>
      </header>

      <main className="max-w-3xl mx-auto p-8">

        <div className="bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            New Zepto Order
          </h2>

          <div className="space-y-5">

            <div>
              <label className="font-semibold">
                Store
              </label>

              <input
                value={form.storeName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    storeName: e.target.value,
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
                    pickupLocation: e.target.value,
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
                    dropLocation: e.target.value,
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
                    packageDetails: e.target.value,
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
                    payment: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl mt-2"
              />
            </div>

            <button
              onClick={sendToGigWorker}
              className="w-full bg-purple-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-purple-700"
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

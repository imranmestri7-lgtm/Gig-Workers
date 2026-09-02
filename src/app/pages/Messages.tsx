import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

type Message = {
  _id: string;
  deliveryId: string;
  senderId: string;
  senderName: string;
  senderType: "rider" | "restaurant";
  receiverId: string;
  message: string;
  createdAt: string;
};

export default function Messages() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // Delivery information passed from dashboard
  const delivery = location.state?.delivery;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // =====================================
  // CHECK DELIVERY
  // =====================================

  useEffect(() => {
    if (!delivery?._id) {
      setLoading(false);
      return;
    }

    fetchMessages();
  }, [delivery]);

  // =====================================
  // GET MESSAGES
  // =====================================

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${delivery._id}`
      );

      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      }
    } catch (error) {
      console.log("GET MESSAGES ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // SEND MESSAGE
  // =====================================

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      return;
    }

    if (!delivery?._id) {
      alert("Delivery information not found");
      return;
    }

    try {
      setSending(true);

      const receiverId =
        user.accountType === "rider"
          ? delivery.restaurantId
          : delivery.riderId;

      const receiverType =
        user.accountType === "rider"
          ? "restaurant"
          : "rider";

      const response = await fetch(
        "http://localhost:5000/api/messages",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            deliveryId: delivery._id,

            senderId:
              user._id || user.id,

            senderName:
              user.name || "User",

            senderType:
              user.accountType,

            receiverId:
              receiverId,

            receiverType:
              receiverType,

            message:
              newMessage.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          data.data,
        ]);

        setNewMessage("");
      } else {
        alert(
          data.message ||
            "Failed to send message"
        );
      }
    } catch (error) {
      console.log(
        "SEND MESSAGE ERROR:",
        error
      );

      alert(
        "Backend server is not connected"
      );
    } finally {
      setSending(false);
    }
  };

  // =====================================
  // NO DELIVERY
  // =====================================

  if (!delivery) {
    return (
      <div className="min-h-screen bg-slate-50">

        <header className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-6 py-5">

            <button
              onClick={() =>
                navigate("/rider-dashboard")
              }
              className="font-semibold text-gray-700 hover:text-black"
            >
              ← Back to Dashboard
            </button>

          </div>
        </header>

        <main className="max-w-5xl mx-auto p-8">

          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <div className="text-5xl mb-4">
              💬
            </div>

            <h1 className="text-2xl font-bold">
              No Conversation Selected
            </h1>

            <p className="text-gray-500 mt-2">
              Please select a delivery first.
            </p>

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="bg-white border-b">

        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-bold">
              💬 Messages
            </h1>

            <p className="text-gray-500">
              {delivery.restaurantName}
            </p>

          </div>

          <button
            onClick={() =>
              navigate(-1)
            }
            className="text-gray-700 font-semibold hover:text-black"
          >
            ← Back
          </button>

        </div>

      </header>


      {/* MAIN */}

      <main className="max-w-5xl mx-auto p-6">

        {/* DELIVERY INFO */}

        <div className="bg-white rounded-2xl shadow p-5 mb-6">

          <p className="text-red-600 font-bold">
            🛵 {delivery.platform}
          </p>

          <h2 className="text-xl font-bold mt-1">
            {delivery.restaurantName}
          </h2>

          <p className="text-gray-500 mt-2">
            📍 {delivery.pickupLocation}
          </p>

          <p className="text-gray-500">
            🏠 {delivery.dropLocation}
          </p>

        </div>


        {/* CHAT BOX */}

        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <div className="p-5 border-b">

            <h2 className="text-xl font-bold">
              Conversation
            </h2>

          </div>


          {/* MESSAGES */}

          <div className="h-[450px] overflow-y-auto p-6 space-y-4">

            {loading && (
              <p className="text-center text-gray-500">
                Loading messages...
              </p>
            )}


            {!loading &&
              messages.length === 0 && (
                <div className="text-center py-20">

                  <div className="text-5xl">
                    💬
                  </div>

                  <p className="text-gray-500 mt-3">
                    No messages yet.
                  </p>

                  <p className="text-gray-400">
                    Start the conversation.
                  </p>

                </div>
              )}


            {messages.map((item) => {

              const isMine =
                String(item.senderId) ===
                String(
                  user._id || user.id
                );

              return (
                <div
                  key={item._id}
                  className={`flex ${
                    isMine
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      isMine
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >

                    <p className="text-xs font-bold mb-1 opacity-70">
                      {item.senderName}
                    </p>

                    <p>
                      {item.message}
                    </p>

                    <p className="text-xs opacity-60 mt-2">
                      {new Date(
                        item.createdAt
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>


          {/* MESSAGE INPUT */}

          <div className="border-t p-5">

            <div className="flex gap-3">

              <input
                type="text"
                value={newMessage}
                onChange={(e) =>
                  setNewMessage(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !sending
                  ) {
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

              <button
                onClick={sendMessage}
                disabled={sending}
                className="bg-black text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50"
              >
                {sending
                  ? "Sending..."
                  : "Send"}
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
import { useNavigate } from "react-router";

export default function RiderProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-gray-900 text-white px-8 py-6">
        <div className="max-w-5xl mx-auto">

          <button
            onClick={() => navigate("/rider-dashboard")}
            className="mb-4 text-gray-300 hover:text-white"
          >
            ← Back to Rider Dashboard
          </button>

          <h1 className="text-3xl font-bold">
            Rider Profile
          </h1>

          <p className="text-gray-300 mt-1">
            Manage your account information
          </p>

        </div>
      </header>


      <main className="max-w-5xl mx-auto p-8">

        {/* Profile Card */}
        <section className="bg-white rounded-2xl shadow p-8">

          <div className="flex items-center gap-5 mb-8">

            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "R"}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user.name || "Rider"}
              </h2>

              <p className="text-gray-500">
                GigWorker Rider
              </p>
            </div>

          </div>


          {/* Account Information */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-500 font-semibold">
                Name
              </p>

              <p className="text-lg font-bold mt-2">
                {user.name || "Not available"}
              </p>
            </div>


            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-500 font-semibold">
                Email
              </p>

              <p className="text-lg font-bold mt-2">
                {user.email || "Not available"}
              </p>
            </div>


            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-500 font-semibold">
                Account Type
              </p>

              <p className="text-lg font-bold mt-2 capitalize">
                {user.accountType || "Rider"}
              </p>
            </div>


            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-gray-500 font-semibold">
                Rider ID
              </p>

              <p className="text-lg font-bold mt-2 break-all">
                {user._id || user.id || "Not available"}
              </p>
            </div>

          </div>

        </section>


        {/* Quick Links */}
        <section className="mt-8">

          <h2 className="text-2xl font-bold mb-5">
            Quick Access
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <button
              onClick={() =>
                navigate("/rider-dashboard")
              }
              className="bg-white rounded-2xl shadow p-6 text-left hover:bg-gray-50"
            >
              <div className="text-3xl mb-3">
                🚴
              </div>

              <h3 className="text-xl font-bold">
                Rider Dashboard
              </h3>

              <p className="text-gray-500 mt-2">
                View your deliveries
              </p>
            </button>


            <button
              onClick={() =>
                navigate("/platform-dashboard")
              }
              className="bg-white rounded-2xl shadow p-6 text-left hover:bg-gray-50"
            >
              <div className="text-3xl mb-3">
                🏢
              </div>

              <h3 className="text-xl font-bold">
                Platform Dashboard
              </h3>

              <p className="text-gray-500 mt-2">
                View platform performance
              </p>
            </button>


            <button
              onClick={() =>
                navigate("/earnings-history")
              }
              className="bg-white rounded-2xl shadow p-6 text-left hover:bg-gray-50"
            >
              <div className="text-3xl mb-3">
                💰
              </div>

              <h3 className="text-xl font-bold">
                Earnings History
              </h3>

              <p className="text-gray-500 mt-2">
                View your earnings
              </p>
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}
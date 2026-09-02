import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DeliveryMap from "../components/DeliveryMap";

import {
  Package,
  MapPin,
  IndianRupee,
  LogOut,
  Check,
  X
} from "lucide-react";


type Delivery = {

 _id:string;

 restaurant: string;

 restaurantName:string;

 platform: string;

 orderId?: string;

 pickupLocation:string;

 dropLocation:string;

 packageDetails:string;

 payment:number;

 status:
 "available" |
 "accepted" |
 "picked" |
 "out_for_delivery" |
 "delivered";

 riderName?:string;

 distance?: string;
estimatedTime?: string;
};

type Earnings = {

today:number;

week:number;

total:number;

completed:number;

};



export default function RiderDashboard(){


const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};


const [availableDeliveries,setAvailableDeliveries] =
useState<Delivery[]>([]);



const [activeDeliveries,setActiveDeliveries] =
useState<Delivery[]>([]);

const [deliveryHistory, setDeliveryHistory] =
  useState<Delivery[]>([]);

const [loading,setLoading] =
useState(true);



const user =
JSON.parse(localStorage.getItem("user") || "{}");


const [earnings,setEarnings] =
useState<Earnings>({

today:0,

week:0,

total:0,

completed:0

});
const [selectedDelivery, setSelectedDelivery] =
  useState<Delivery | null>(null);
  
  const [showDeliveryRequest, setShowDeliveryRequest] =
  useState(false);
  
const [selectedAvailableDelivery, setSelectedAvailableDelivery] =
  useState<Delivery | null>(null);

const [showMap, setShowMap] = useState(false);

// =================================
// GET AVAILABLE DELIVERY
// =================================


const fetchAvailableDeliveries = async()=>{


try{

const response = await fetch(
`http://localhost:5000/api/deliveries/available/${user.id}`
);


const data =
await response.json();



console.log(
"Available deliveries:",
data
);



if(response.ok){

setAvailableDeliveries(data);

}


}
catch(error){

console.log(error);

alert("Server not connected");

}


};







// =================================
// GET MY ACTIVE DELIVERY
// =================================


const fetchActiveDeliveries = async()=>{


try{


if(!user.id)
return;



const response = await fetch(

`http://localhost:5000/api/deliveries/rider/${user.id}`

);



const data =
await response.json();



console.log(
"Active deliveries:",
data
);



if(response.ok){

setActiveDeliveries(data);

}


}
catch(error){

console.log(error);

}


};

const fetchEarnings = async()=>{


try{


const response = await fetch(

`http://localhost:5000/api/deliveries/rider/earnings/${user.id}`

);


const data =
await response.json();



console.log(
"Earnings:",
data
);



if(response.ok){

setEarnings(data);

}


}
catch(error){

console.log(error);

}


};

// =================================
// LOAD DATA
// =================================
const loadData = async () => {

  setLoading(true);

  try {

    await Promise.all([
      fetchAvailableDeliveries(),
      fetchActiveDeliveries(),
      fetchEarnings()
    ]);

  } catch (error) {

    console.log("LOAD DATA ERROR:", error);

  } finally {

    setLoading(false);

  }

};

const handleAccept = async (delivery: Delivery) => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const riderId = user._id || user.id;

    const response = await fetch(
      `http://localhost:5000/api/deliveries/accept/${delivery._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          riderId: riderId,
          riderName: user.name,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Delivery accepted successfully!");

      loadData();
    } else {
      alert(data.message || "Failed to accept delivery");
    }

  } catch (error) {
    console.log("Accept delivery error:", error);
    alert("Backend server is not connected");
  }
};

const handleReject = async (delivery: Delivery) => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const riderId = user._id || user.id;

    const response = await fetch(
      `http://localhost:5000/api/deliveries/reject/${delivery._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          riderId: riderId,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Delivery rejected");

      loadData();
    } else {
      alert(data.message || "Failed to reject delivery");
    }

  } catch (error) {
    console.log("Reject delivery error:", error);
    alert("Backend server is not connected");
  }
};





useEffect(()=>{


loadData();


},[]);







// =================================
// ACCEPT
// =================================


const acceptDelivery = async(id:string)=>{


try{


const response =
await fetch(

`http://localhost:5000/api/deliveries/accept/${id}`,

{


method:"PUT",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

riderId:user.id,

riderName:user.name

})


}

);




const data =
await response.json();



console.log(data);



if(response.ok){

alert(
"Delivery accepted"
);


loadData();


}
else{

alert(data.message);

}



}
catch(error){

console.log(error);

alert(
"Server not connected"
);


}


};








// =================================
// REJECT
// =================================
const rejectDelivery = async(id:string)=>{

try{

console.log("Reject clicked ID:", id);


const response = await fetch(
`http://localhost:5000/api/deliveries/reject/${id}`,
{
method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

riderId:user.id   // ✅ ADD THIS

})

}
);



const data = await response.json();


console.log("Reject API Response:", data);



if(response.ok){

alert("Delivery Rejected");


// remove instantly from UI
setAvailableDeliveries((prev)=>
prev.filter((delivery)=>
delivery._id !== id
)
);


// reload from database
loadData();


}
else{

alert(data.message || "Reject failed");

}


}
catch(error){

console.log("Reject Error:",error);

alert("Server not connected");

}

};

// =================================
// UPDATE STATUS
// =================================

const updateStatus = async(
    id:string,
    status:string
)=>{


try{


const response = await fetch(

`http://localhost:5000/api/deliveries/status/${id}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

status

})

}

);



const data = await response.json();


console.log(data);



if(response.ok){

alert(
"Status Updated"
);


loadData();


}
else{

alert(data.message);

}



}
catch(error){

console.log(error);

alert(
"Server not connected"
);

}


};






// =================================
// LOGOUT
// =================================


const logout=()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


navigate("/login");


};





const activeEarnings =
  activeDeliveries.reduce(
    (total,item)=>
      total + Number(item.payment || 0),
    0
  );


// =================================
// NEW DELIVERY REQUEST SCREEN
// =================================

if (selectedAvailableDelivery) {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white border-b px-6 py-5">
        <button
          onClick={() => setSelectedAvailableDelivery(null)}
          className="text-gray-700 font-semibold hover:text-black"
        >
          ← Back to Available Deliveries
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        <h1 className="text-3xl font-bold mb-2">
          🔔 New Delivery Request
        </h1>

        <p className="text-gray-500 mb-8">
          Review the delivery details before accepting.
        </p>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-red-600 font-bold mb-2">
            🛵 {selectedAvailableDelivery.platform}
          </p>

          <h2 className="text-2xl font-bold mb-6">
            {selectedAvailableDelivery.restaurantName}
          </h2>

          <div className="space-y-4 text-lg">

            <p>
              📍 <strong>Pickup:</strong>{" "}
              {selectedAvailableDelivery.pickupLocation}
            </p>

            <p>
              🏠 <strong>Drop:</strong>{" "}
              {selectedAvailableDelivery.dropLocation}
            </p>

            <p>
              📦 <strong>Package:</strong>{" "}
              {selectedAvailableDelivery.packageDetails}
            </p>

            <p>
              📏 <strong>Distance:</strong>{" "}
              {selectedAvailableDelivery.distance || "Not available"}
            </p>

            <p>
              ⏱️ <strong>Estimated Time:</strong>{" "}
              {selectedAvailableDelivery.estimatedTime || "Not available"}
            </p>

            <p className="text-green-600 font-bold">
              💰 <strong>Payment:</strong>{" "}
              ₹{selectedAvailableDelivery.payment}
            </p>

            <p>
              🆔 <strong>Order ID:</strong>{" "}
              {selectedAvailableDelivery.orderId || "Not available"}
            </p>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-6 mt-6">

          <div className="flex flex-col md:flex-row gap-4">

            <button
              onClick={() =>
                acceptDelivery(selectedAvailableDelivery._id)
              }
              className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold"
            >
              ✅ Accept Delivery
            </button>

            <button
              onClick={() => {
                rejectDelivery(selectedAvailableDelivery._id);
                setSelectedAvailableDelivery(null);
              }}
              className="flex-1 bg-red-600 text-white py-4 rounded-xl font-bold"
            >
              ❌ Reject Delivery
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}




if (selectedDelivery) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b px-6 py-5">
        <button
          onClick={() => {
            setSelectedDelivery(null);
            setShowMap(false);
          }}
          className="text-gray-700 font-semibold hover:text-black"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        <h1 className="text-3xl font-bold mb-2">
          Delivery Details
        </h1>

        <p className="text-gray-500 mb-8">
          Focus on this delivery
        </p>

        {/* Delivery information */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">

          <p className="text-red-600 font-bold mb-2">
  🛵 {selectedDelivery.platform}
</p>

<h2 className="text-2xl font-bold mb-5">
  {selectedDelivery.restaurantName}
</h2>


          <div className="space-y-4 text-lg">

  <p>
    🛵 <strong>Platform:</strong>{" "}
    {selectedDelivery.platform}
  </p>

  <p>
    🏢 <strong>Restaurant / Store:</strong>{" "}
    {selectedDelivery.restaurantName}
  </p>

  <p>
    📍 <strong>Pickup:</strong>{" "}
    {selectedDelivery.pickupLocation}
  </p>

  <p>
    🏠 <strong>Drop:</strong>{" "}
    {selectedDelivery.dropLocation}
  </p>

  <p>
    📦 <strong>Package:</strong>{" "}
    {selectedDelivery.packageDetails}
  </p>

  <p>
    📏 <strong>Distance:</strong>{" "}
    {selectedDelivery.distance || "Not available"}
  </p>

  <p>
    ⏱️ <strong>Estimated Time:</strong>{" "}
    {selectedDelivery.estimatedTime || "Not available"}
  </p>

  <p className="text-green-600 font-bold">
    💰 <strong>Payment:</strong>{" "}
    ₹{selectedDelivery.payment}
  </p>

  <p>
    🆔 <strong>Order ID:</strong>{" "}
    {selectedDelivery.orderId || "Not available"}
  </p>

</div>
          
          
        </div>

        {/* Status */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">

          <h2 className="text-xl font-bold mb-6">
            Delivery Status
          </h2>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <span className="text-green-600 text-xl">✓</span>
              <span>Accepted</span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={
                  ["picked", "out_for_delivery", "delivered"].includes(
                    selectedDelivery.status
                  )
                    ? "text-green-600 text-xl"
                    : "text-gray-400 text-xl"
                }
              >
                {["picked", "out_for_delivery", "delivered"].includes(
                  selectedDelivery.status
                )
                  ? "✓"
                  : "○"}
              </span>

              <span>Picked Up</span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={
                  ["out_for_delivery", "delivered"].includes(
                    selectedDelivery.status
                  )
                    ? "text-green-600 text-xl"
                    : "text-gray-400 text-xl"
                }
              >
                {["out_for_delivery", "delivered"].includes(
                  selectedDelivery.status
                )
                  ? "✓"
                  : "○"}
              </span>

              <span>Out for Delivery</span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={
                  selectedDelivery.status === "delivered"
                    ? "text-green-600 text-xl"
                    : "text-gray-400 text-xl"
                }
              >
                {selectedDelivery.status === "delivered"
                  ? "✓"
                  : "○"}
              </span>

              <span>Delivered</span>
            </div>

          </div>
        </div>

        {/* Map */}
        {showMap && (
          <div className="mb-6">

            <DeliveryMap
              pickupPosition={[16.705, 74.243]}
              dropPosition={[16.704, 74.243]}
            />

          </div>
        )}

        {/* Actions */}
        {selectedDelivery.status !== "delivered" && (
  <div className="bg-white rounded-2xl shadow p-6">

    <div className="flex flex-col md:flex-row gap-4">

      {/* MAP */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold"
      >
        {showMap ? "Hide Map" : "🗺️ Open Map"}
      </button>

      {/* PICKED UP */}
      {selectedDelivery.status === "accepted" && (
        <button
          onClick={async () => {
            await updateStatus(
              selectedDelivery._id,
              "picked"
            );

            setSelectedDelivery({
              ...selectedDelivery,
              status: "picked"
            });
          }}
          className="flex-1 bg-yellow-500 text-white py-4 rounded-xl font-bold"
        >
          📦 Picked Up
        </button>
      )}

      {/* START DELIVERY */}
      {selectedDelivery.status === "picked" && (
        <button
          onClick={async () => {
            await updateStatus(
              selectedDelivery._id,
              "out_for_delivery"
            );

            setSelectedDelivery({
              ...selectedDelivery,
              status: "out_for_delivery"
            });
          }}
          className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold"
        >
          🚴 Start Delivery
        </button>
      )}

      {/* MARK DELIVERED */}
      {selectedDelivery.status === "out_for_delivery" && (
        <button
          onClick={async () => {
            await updateStatus(
              selectedDelivery._id,
              "delivered"
            );

            setSelectedDelivery({
              ...selectedDelivery,
              status: "delivered"
            });

            setShowMap(false);
          }}
          className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold"
        >
          ✓ Mark as Delivered
        </button>
      )}

    </div>

  </div>
)}
       
{selectedDelivery.status === "delivered" && (
  <div className="bg-white rounded-2xl shadow p-8 text-center">

    <div className="text-5xl mb-4">
      🎉
    </div>

    <h2 className="text-3xl font-bold text-green-600">
      Congratulations!
    </h2>

    <p className="text-gray-600 mt-3">
      Delivery completed successfully.
    </p>

    <p className="text-xl font-bold text-green-700 mt-5">
      You earned ₹{selectedDelivery.payment}
    </p>

    <div className="flex flex-col md:flex-row gap-4 mt-6">
 <button
    onClick={() =>
      navigate("/messages", {
        state: {
          deliveryId: selectedDelivery._id,
          receiverId: selectedDelivery.restaurant,
        },
      })
    }
    className="flex-1 bg-[#A33D20] text-white py-4 rounded-xl font-bold hover:bg-[#8f331b] transition"
  >
    💬 Send Message
  </button>

      <button
        onClick={() => {
          setSelectedDelivery(null);
          setShowMap(false);
          loadData();
        }}
        className="flex-1 bg-[#A33D20] text-white py-4 rounded-xl font-bold"
      >
        🚴 Start New Delivery
      </button>

    </div>

  </div>
)}
   </div>

        </div>

  );
}


return(


<div className="min-h-screen bg-slate-50">



<header className="bg-white border-b">


<div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">



<div>


<h1 className="text-3xl font-extrabold text-[#A33D20]">

GigWorker

</h1>


<p className="text-gray-500">

Rider Dashboard

</p>


</div>

<div className="flex items-center gap-4">

  {/* User Profile */}
  <button
    onClick={() => navigate("/rider-profile")}
    className="flex items-center gap-2 font-bold hover:text-[#A33D20] transition"
  >
    <span className="text-xl">
      👤
    </span>

    <span>
      {user.name || "User"}
    </span>
  </button>

  {/* Logout */}
  <button
    onClick={handleLogout}
    className="bg-red-100 text-red-600 px-5 py-3 rounded-xl font-bold hover:bg-red-200"
  >
    Logout
  </button>

</div>





</div>


</header>







<main className="max-w-7xl mx-auto p-8">



<h2 className="text-4xl font-bold">

Welcome {user.name} 👋

</h2>



<p className="text-gray-600">

Accept deliveries and start earning.

</p>







<div className="grid md:grid-cols-3 gap-6 mt-8">


<div className="bg-white p-6 rounded-2xl shadow">

<Package/>

<p>

Available

</p>


<h1 className="text-4xl font-bold">

{availableDeliveries.length}

</h1>


</div>





<div className="bg-white p-6 rounded-2xl shadow">


<MapPin/>


<p>

Active

</p>


<h1 className="text-4xl font-bold">

{activeDeliveries.length}

</h1>


</div>





<div className="bg-white p-6 rounded-2xl shadow">


<IndianRupee/>


<p>

Total Earnings

</p>


<h1 className="text-4xl font-bold">

₹{earnings.total}

</h1>


</div>





</div>

{/* Earnings Overview */}

<section className="mt-10">


<h2 className="text-3xl font-bold mb-5">

Earnings Overview 💰

</h2>


<div className="grid md:grid-cols-3 gap-6">

<div className="bg-white p-6 rounded-2xl shadow">

<p className="text-gray-500">
Today
</p>

<h1 className="text-3xl font-bold text-green-600">
₹{earnings.today}
</h1>

</div>



<div className="bg-white p-6 rounded-2xl shadow">

<p className="text-gray-500">
This Week
</p>

<h1 className="text-3xl font-bold">
₹{earnings.week}
</h1>

</div>




<div className="bg-white p-6 rounded-2xl shadow">

<p className="text-gray-500">
Completed
</p>

<h1 className="text-3xl font-bold">
{earnings.completed}
</h1>

</div>


</div>


</section>

<div className="bg-white rounded-2xl shadow p-6 mt-8">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    <div>
      <h2 className="text-2xl font-bold">
        🏢 Platform Dashboard
      </h2>

      <p className="text-gray-500 mt-1">
        View your deliveries and earnings from each platform
      </p>
    </div>

    <button
      onClick={() => navigate("/platform-dashboard")}
      className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800"
    >
      View Platforms →
    </button>

  </div>
</div>


<section className="mt-10">


<h2 className="text-3xl font-bold mb-5">

Available Deliveries

</h2>



{

loading ?

<p>Loading...</p>



:

availableDeliveries.length===0 ?


<div className="bg-white p-10 rounded-xl">

No deliveries available

</div>



:


<div className="grid md:grid-cols-2 gap-6">


{

availableDeliveries.map((delivery)=>(


<div
  key={delivery._id}
  onClick={() => {
    setSelectedAvailableDelivery(delivery);
  }}
  className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
>

<p className="text-red-600 font-bold mb-2">
  🛵 {delivery.platform}
</p>

<h3 className="text-xl font-bold">

{delivery.restaurantName}

</h3>



<p>

📍 {delivery.pickupLocation}

</p>



<p>

🏠 {delivery.dropLocation}

</p>



<p>

📦 {delivery.packageDetails}

</p>



<p className="font-bold text-[#A33D20]">

₹{delivery.payment}

</p>




<div className="flex gap-3 mt-5">



<button

onClick={()=>acceptDelivery(delivery._id)}

className="flex-1 bg-green-600 text-white p-3 rounded-xl flex justify-center gap-2"

>

<Check/>

Accept

</button>



<button

onClick={()=>rejectDelivery(delivery._id)}

className="bg-red-600 text-white px-5 py-2 rounded-xl font-bold cursor-pointer"

>

Reject

</button>

</div>



</div>



))


}



</div>


}


</section>
<section className="mt-12">

  <h2 className="text-3xl font-bold mb-5">
    My Active Deliveries
  </h2>

  {activeDeliveries.length === 0 ? (

    <div className="bg-white p-10 rounded-2xl shadow">
      No active deliveries
    </div>

  ) : (

    <div className="grid md:grid-cols-2 gap-6">

      {activeDeliveries.map((delivery) => (

        <div
          key={delivery._id}
          onClick={() => {
            setSelectedDelivery(delivery);
            setShowMap(false);
          }}
          className="bg-green-50 border border-green-300 p-6 rounded-2xl cursor-pointer hover:shadow-lg transition"
        >

          {/* Platform */}

          <p className="text-red-600 font-bold mb-2">
            🛵 {delivery.platform}
          </p>


          {/* Restaurant */}

          <h3 className="font-bold text-xl">
            {delivery.restaurantName}
          </h3>


          {/* Pickup */}

          <p className="mt-3">
            📍 {delivery.pickupLocation}
          </p>


          {/* Drop */}

          <p>
            🏠 {delivery.dropLocation}
          </p>


          {/* Package */}

          <p>
            📦 {delivery.packageDetails}
          </p>


          {/* Payment */}

          <p className="font-bold text-green-700 mt-2">
            ₹{delivery.payment}
          </p>


          {/* Status */}

          <div className="mt-5">

            <p className="font-bold">

              Status:

              <span className="ml-2 text-blue-600">
                {delivery.status}
              </span>

            </p>

          </div>


          {/* View Order */}

          <div className="mt-5">

            <button
              onClick={(event) => {
                event.stopPropagation();

                setSelectedDelivery(delivery);
                setShowMap(false);
              }}
              className="w-full bg-black text-white p-3 rounded-xl font-bold"
            >
              📋 View Order
            </button>

          </div>

        </div>

      ))}

    </div>

  )}

</section>


{/* =================================
    DELIVERY HISTORY CARD
================================= */}

<div className="bg-white rounded-2xl shadow p-6 mt-6">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    <div>

      <h2 className="text-2xl font-bold">
        📜 Delivery History
      </h2>

      <p className="text-gray-500 mt-1">
        View your completed delivery history and past orders
      </p>

    </div>


    <button
      onClick={() => navigate("/delivery-history")}
      className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800"
    >
      View History →
    </button>

  </div>

</div>


</main>
</div>
);
}
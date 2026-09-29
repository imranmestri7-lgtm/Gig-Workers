import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  LogOut,
  Package,
  PlusCircle,
  Truck,
  User,
  MapPin,
  IndianRupee,
  ChefHat
} from "lucide-react";

type Delivery = {
  _id: string;

  restaurantId?: string;
  restaurantName?: string;

  riderId?: string;
  riderName?: string;

  pickupLocation: string;
  dropLocation: string;
  packageDetails: string;
  payment: number;
  status: string;

  platform?: string;
  orderId?: string;
  category?: string;

  distance?: string;
  estimatedTime?: string;
};

type Review = {
  _id: string;
  riderName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

// Helper to choose an image based on dish details or category
const getDishImage = (details: string = "", category: string = "") => {
  const text = (details + " " + category).toLowerCase();
  
  if (text.includes("pizza")) {
    return "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80";
  } else if (text.includes("burger")) {
    return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80";
  } else if (text.includes("cafe") || text.includes("coffee") || text.includes("bakery")) {
    return "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80";
  } else if (text.includes("grocery") || text.includes("vegetable")) {
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80";
  } else if (text.includes("chicken") || text.includes("biryani") || text.includes("meal")) {
    return "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80";
  } else {
    return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80";
  }
};

export default function RestaurantDashboard(){

const navigate = useNavigate();


const [user,setUser] = useState<any>(null);

const [deliveries,setDeliveries] =
useState<Delivery[]>([]);

const [showRatings, setShowRatings] =
useState(false);

const [reviews,setReviews] =
useState<Review[]>([]);

const [showForm,setShowForm] =
useState(false);


const [loading,setLoading] =
useState(false);


const [pickupLocation,setPickupLocation] =
useState("");

const [dropLocation,setDropLocation] =
useState("");

const [packageDetails,setPackageDetails] =
useState("");

const [payment,setPayment] =
useState("");

const [platform,setPlatform] =
useState("");

const [orderId,setOrderId] =
useState("");

// Delivery type
const [category,setCategory] =
useState("restaurant");


// Google Maps calculated values
const [distance,setDistance] =
useState("");

const [estimatedTime,setEstimatedTime] =
useState("");


// =============================
// LOGIN CHECK
// =============================

useEffect(()=>{


const savedUser =
localStorage.getItem("user");


if(!savedUser){

navigate("/login");
return;

}


const userData =
JSON.parse(savedUser);



setUser(userData);


fetchDeliveries(userData.id);
fetchReviews(userData.id);



},[]);


const fetchRiderRatings = async () => {
  if (user?.id) {
    await fetchReviews(user.id);
    setShowRatings(true);
  }
};



// =============================
// GET RESTAURANT DELIVERY
// =============================

const fetchDeliveries = async(id:string)=>{


try{


const response = await fetch(

`http://localhost:5000/api/deliveries/restaurant/${id}`

);



const data =
await response.json();



console.log(
"Restaurant deliveries:",
data
);



if(response.ok){

setDeliveries(data);

}
else{

console.log(data.message);

}


}
catch(error){

console.log(error);

alert("Server not connected");

}


};

const fetchReviews = async(id:string)=>{

try{

const response = await fetch(
`http://localhost:5000/api/reviews/restaurant/${id}`
);

const data = await response.json();

if(response.ok){
setReviews(data);
}

}
catch(error){

console.log("Reviews error:", error);

}

};








// =============================
// CREATE DELIVERY
// =============================

const createDelivery =
async(e:React.FormEvent)=>{


e.preventDefault();


if(category===""){

alert("Please select delivery type");

return;

}

try{


setLoading(true);

console.log({
restaurantId:user.id,
restaurantName:user.name,
category,
pickupLocation,
dropLocation,
packageDetails,
payment:Number(payment)
});

const response =
await fetch(

"http://localhost:5000/api/deliveries",

{


method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

    restaurantId:user.id,

    restaurantName:user.name,
    
    riderId:user.id,

    category:category,  
    
     platform,

     orderId,  

    pickupLocation,

    dropLocation,

    distance,

    estimatedTime,

    packageDetails,

    payment:Number(payment)

})

}

);




const data =
await response.json();



console.log(data);



if(!response.ok){

alert(data.message);

return;

}



alert(
"Delivery Created Successfully"
);

setPickupLocation("");
setDropLocation("");
setPackageDetails("");
setPayment("");
setPlatform("");
setOrderId("");
setShowForm(false);


fetchDeliveries(user.id);



}
catch(error){

console.log(error);

alert(
"Server not connected"
);


}

finally{

setLoading(false);

}


};








// =============================
// LOGOUT
// =============================

const logout=()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


navigate("/login");


};





const totalPayment =
deliveries.reduce(

(total,item)=>
total + Number(item.payment || 0),

0

);

const averageRating = reviews.length
  ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
  : 0;







return(


<div className="min-h-screen bg-slate-50">


<header className="bg-white border-b">


<div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">


<div>

<h1 className="text-3xl font-extrabold text-[#A33D20]">

GigWorker

</h1>


<p className="text-gray-500">

Restaurant Dashboard

</p>


</div>



<div className="flex items-center gap-5">


<div className="flex gap-2 items-center font-semibold">

<User size={20}/>

{user?.name}

</div>



<button

onClick={logout}

className="bg-red-100 text-red-600 px-5 py-2 rounded-xl flex gap-2 items-center"

>

<LogOut size={18}/>

Logout

</button>


</div>


</div>


</header>






<main className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">

  {/* 🍔 Realistic Restaurant Hero Banner with Food Photography */}
  <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-orange-950 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative border border-slate-800">
    
    {/* Background High-End Food Image */}
    <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-25 md:opacity-30 pointer-events-none">
      <img 
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
        alt="Gourmet Kitchen" 
        className="w-full h-full object-cover"
      />
    </div>

    <div className="z-10 space-y-2 max-w-xl">
      <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">
        🔥 Kitchen Portal Active
      </span>
      <h2 className="text-3xl md:text-4xl font-black tracking-tight">
        Welcome {user?.name} 👋
      </h2>
      <p className="text-slate-300 text-sm font-medium">
        Create delivery requests, dispatch orders, and monitor your kitchen performance.
      </p>
    </div>

    {/* Quick Action Pill */}
    <div className="z-10 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-3 shadow-lg shrink-0">
      <ChefHat className="w-8 h-8 text-orange-400" />
      <div>
        <p className="text-xs text-slate-300 font-semibold uppercase">Total Revenue</p>
        <p className="text-xl font-black">₹{totalPayment}</p>
      </div>
    </div>
  </div>




<div className="grid md:grid-cols-3 gap-6 mt-6">
  
  {/* Card 1: Total Deliveries */}
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-orange-200 cursor-default group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 font-semibold text-sm group-hover:text-orange-600 transition-colors">Total Deliveries</p>
        <h1 className="text-4xl font-black text-slate-900 mt-1">{deliveries.length}</h1>
      </div>
      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
        <Truck className="w-5 h-5" />
      </div>
    </div>
  </div>

  {/* Card 2: Requests */}
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-orange-200 cursor-default group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 font-semibold text-sm group-hover:text-orange-600 transition-colors">Requests</p>
        <h1 className="text-4xl font-black text-slate-900 mt-1">{deliveries.length}</h1>
      </div>
      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
        <Package className="w-5 h-5" />
      </div>
    </div>
  </div>

  {/* Card 3: Total Payment */}
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-green-200 cursor-default group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 font-semibold text-sm group-hover:text-green-600 transition-colors">Total Payment</p>
        <h1 className="text-4xl font-black text-slate-900 mt-1">₹{totalPayment}</h1>
      </div>
      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
        <IndianRupee className="w-5 h-5" />
      </div>
    </div>
  </div>

</div>



<div className="bg-white rounded-2xl shadow p-6 mt-10">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h2 className="text-2xl font-bold">
        ⭐ Rider Ratings
      </h2>

      <p className="text-gray-500 mt-1">
        View feedback given by riders
      </p>
    </div>

    <button
      onClick={() => setShowRatings(true)}
      className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-600 transition"
    >
      View Rider Ratings
    </button>
  </div>
</div>

{/* Paste this new block right where the old one was 👇 */}
<div className="bg-gradient-to-r from-[#A33D20] to-orange-600 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between text-white transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl mt-8">
  <div>
    <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
      Need a Rider? <span className="animate-bounce">🛵</span>
    </h2>
    <p className="text-orange-100 font-medium mt-1">
      Post your delivery now and dispatch it to our EV fleet instantly.
    </p>
  </div>
  <button 
    onClick={() => navigate("/create-delivery")} 
    className="mt-4 md:mt-0 bg-white text-[#A33D20] px-8 py-3.5 rounded-xl font-extrabold shadow-md hover:bg-orange-50 hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
  >
    <span className="text-xl">⊕</span> Create Delivery
  </button>
</div>






{showForm && (


<form

onSubmit={createDelivery}

className="bg-white mt-8 p-6 rounded-2xl shadow space-y-4"


>


<input

placeholder="Pickup Location"

value={pickupLocation}

onChange={(e)=>setPickupLocation(e.target.value)}

className="w-full border p-3 rounded-xl"

/>



<input

placeholder="Drop Location"

value={dropLocation}

onChange={(e)=>setDropLocation(e.target.value)}

className="w-full border p-3 rounded-xl"

/>

<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="w-full border p-3 rounded-xl"

>

<option value="">
Select Delivery Type
</option>


<option value="cafe">
Cafe & Bakery Delivery
</option>


<option value="restaurant">
Restaurant Delivery
</option>


<option value="grocery">
Grocery Delivery
</option>


</select>

<input

placeholder="Package Details"

value={packageDetails}

onChange={(e)=>setPackageDetails(e.target.value)}

className="w-full border p-3 rounded-xl"

/>
<select
  value={platform}
  onChange={(e) => setPlatform(e.target.value)}
  className="w-full border p-3 rounded-xl"
  required
>
  <option value="">Select Platform</option>

  <option value="zomato">Zomato</option>
  <option value="swiggy">Swiggy</option>
  <option value="uber">Uber</option>
  <option value="blinkit">Blinkit</option>
  <option value="zepto">Zepto</option>
  <option value="other">Other</option>
</select>

<input
  type="text"
  placeholder="Order ID"
  value={orderId}
  onChange={(e) => setOrderId(e.target.value)}
  className="w-full border p-3 rounded-xl"
  required
/>

<input

type="number"

placeholder="Payment"

value={payment}

onChange={(e)=>setPayment(e.target.value)}

className="w-full border p-3 rounded-xl"

/>



<button

disabled={loading}

className="w-full bg-[#A33D20] text-white p-3 rounded-xl font-bold"

>


{
loading?
"Creating..."
:
"Post Delivery"
}


</button>

</form>
)}



<section className="bg-white mt-10 p-6 rounded-2xl shadow">
  <h2 className="text-2xl font-bold mb-5">
    My Deliveries
  </h2>

  {deliveries.length === 0 ? (
    <p className="text-slate-500 font-medium">No delivery created</p>
  ) : (
    <div className="space-y-4 mt-6">
      {deliveries.map((delivery) => (
        <div 
          key={delivery._id} 
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:ring-1 hover:ring-[#A33D20]/20 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
        >
          
          {/* Left Side: Image & Info */}
          <div className="flex items-center gap-5">
            <div className="relative overflow-hidden rounded-2xl shadow-sm shrink-0">
              <img 
                src={getDishImage(delivery.packageDetails, delivery.category)} 
                alt="Food" 
                className="w-20 h-20 object-cover transform transition-transform duration-500 group-hover:scale-110" 
              />
            </div>

            <div>
              <div className="flex gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                  {delivery.platform || "Direct"}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  {delivery.status || "Pending"}
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 leading-tight">
                {delivery.packageDetails || "Food Order"}
              </h3>
              <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-400" /> {delivery.pickupLocation} <span className="text-slate-300">→</span> {delivery.dropLocation}
              </p>
            </div>
          </div>

          {/* Right Side: Price & Actions */}
          <div className="flex items-center justify-between md:flex-col md:items-end gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 shrink-0">
            <p className="text-2xl font-black text-slate-900">
              <span className="text-orange-600 text-lg mr-0.5">₹</span>{delivery.payment}
            </p>
            
            {/* Only show Message Rider if a rider is assigned */}
            {delivery.riderId && (
              <button 
                onClick={() => navigate("/messages", { state: { delivery: delivery } })}
                className="bg-[#A33D20] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-red-900/20 hover:bg-[#8f331b] hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
              >
                💬 Message Rider
              </button>
            )}
          </div>

        </div>
      ))}
    </div>
  )}
</section>


        {showRatings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    ⭐ Rider Ratings
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {reviews.length
                      ? `Average rating: ${averageRating.toFixed(1)} / 5`
                      : "No ratings yet"}
                  </p>
                </div>

                <button
                  onClick={() => setShowRatings(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-gray-500">
                    No rider ratings yet.
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border rounded-xl p-5"
                    >
                      <div className="flex justify-between gap-4">
                        <div>
                          <h3 className="font-bold">
                            {review.riderName}
                          </h3>

                          <p className="text-yellow-500 text-sm mt-0.5">
                            {review.rating >= 1 ? "⭐" : "☆"}
                            {review.rating >= 2 ? "⭐" : "☆"}
                            {review.rating >= 3 ? "⭐" : "☆"}
                            {review.rating >= 4 ? "⭐" : "☆"}
                            {review.rating >= 5 ? "⭐" : "☆"}
                          </p>
                        </div>

                        <span className="text-sm text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
{review.comment && (
  <p className="text-gray-600 mt-3">
    "{review.comment}"
  </p>
)}

                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
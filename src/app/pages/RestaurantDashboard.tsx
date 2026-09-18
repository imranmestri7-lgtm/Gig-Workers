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






<div className="grid md:grid-cols-3 gap-6 mt-8">


<div className="bg-white p-6 rounded-2xl shadow">

<Truck/>

<p className="text-gray-500">

Total Deliveries

</p>


<h1 className="text-4xl font-bold">

{deliveries.length}

</h1>


</div>





<div className="bg-white p-6 rounded-2xl shadow">

<Package/>


<p className="text-gray-500">

Requests

</p>


<h1 className="text-4xl font-bold">

{deliveries.length}

</h1>


</div>






<div className="bg-white p-6 rounded-2xl shadow">


<IndianRupee/>


<p className="text-gray-500">

Total Payment

</p>


<h1 className="text-4xl font-bold">

₹{totalPayment}

</h1>


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


<div className="bg-[#A33D20] text-white mt-10 p-7 rounded-3xl flex justify-between items-center">


<div>

<h2 className="text-2xl font-bold">

Need Rider?

</h2>


<p>

Post your delivery now

</p>


</div>



<button

onClick={()=>setShowForm(!showForm)}

className="bg-white text-[#A33D20] px-6 py-3 rounded-xl font-bold flex gap-2"

>

<PlusCircle/>

Create Delivery

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
    <p>No delivery created</p>
  ) : (
    <div>
      {deliveries.map((delivery) => (
        <div
          key={delivery._id}
          className="border border-slate-100 bg-white p-6 rounded-3xl shadow-sm mb-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all"
        >
          {/* Realistic Food Thumbnail & Info */}
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=200&q=80"
              alt="Meal dish"
              className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-slate-100 shrink-0"
            />

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-orange-50 text-orange-700 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-orange-100">
                  {delivery.platform || "Direct"}
                </span>

                <span className="bg-slate-100 text-slate-700 text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  {delivery.status || "Pending"}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900">
                {delivery.packageDetails}
              </h3>

              <p>
                <MapPin className="inline" />{" "}
                {delivery.pickupLocation} → {delivery.dropLocation}
              </p>

              <p className="font-bold text-[#A33D20]">
                ₹{delivery.payment}
              </p>

              <span className="bg-yellow-100 px-3 py-1 rounded-full">
                {delivery.status}
              </span>

              {delivery.riderId && (
                <button
                  onClick={() =>
                    navigate("/messages", {
                      state: { delivery: delivery },
                    })
                  }
                  className="mt-4 bg-[#A33D20] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#8f331b] transition"
                >
                  💬 Message Rider
                </button>
              )}
            </div>
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
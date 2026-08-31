import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  LogOut,
  Package,
  PlusCircle,
  Truck,
  User,
  MapPin,
  IndianRupee
} from "lucide-react";


type Delivery = {
  _id:string;
  pickupLocation:string;
  dropLocation:string;
  packageDetails:string;
  payment:number;
  status:string;
};


export default function RestaurantDashboard(){

const navigate = useNavigate();


const [user,setUser] = useState<any>(null);

const [deliveries,setDeliveries] =
useState<Delivery[]>([]);


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



},[]);






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







<main className="max-w-7xl mx-auto p-8">



<h2 className="text-4xl font-bold">

Welcome {user?.name} 👋

</h2>


<p className="text-gray-600 mt-2">

Create delivery requests and connect with riders.

</p>






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







{
showForm &&


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


<option value="restaurant">
Restaurant Delivery
</option>


<option value="grocery">
Grocery Delivery
</option>


<option value="cafe">
Cafe & Bakery Delivery
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


}







<section className="bg-white mt-10 p-6 rounded-2xl shadow">


<h2 className="text-2xl font-bold mb-5">

My Deliveries

</h2>




{
deliveries.length===0?


<p>No delivery created</p>


:

deliveries.map((delivery)=>(


<div

key={delivery._id}

className="border p-5 rounded-xl mb-5"


>


<h3 className="text-xl font-bold">

{delivery.packageDetails}

</h3>



<p>

<MapPin className="inline"/>

{delivery.pickupLocation}

→

{delivery.dropLocation}

</p>



<p className="font-bold text-[#A33D20]">

₹{delivery.payment}

</p>




<span className="bg-yellow-100 px-3 py-1 rounded-full">

{delivery.status}

</span>


</div>


))


}



</section>



</main>


</div>


);


}
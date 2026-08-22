import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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

  restaurantName:string;

  pickupLocation:string;

  dropLocation:string;

  packageDetails:string;

  payment:number;

  status:string;

  riderName?:string;

};




export default function RiderDashboard(){


const navigate = useNavigate();



const [availableDeliveries,setAvailableDeliveries] =
useState<Delivery[]>([]);



const [activeDeliveries,setActiveDeliveries] =
useState<Delivery[]>([]);



const [loading,setLoading] =
useState(true);



const user =
JSON.parse(localStorage.getItem("user") || "{}");





// =================================
// GET AVAILABLE DELIVERY
// =================================


const fetchAvailableDeliveries = async()=>{


try{


const response = await fetch(

"http://localhost:5000/api/deliveries/available"

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







// =================================
// LOAD DATA
// =================================


const loadData = async()=>{


setLoading(true);



await Promise.all([

fetchAvailableDeliveries(),

fetchActiveDeliveries()

]);



setLoading(false);


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


const response =
await fetch(

`http://localhost:5000/api/deliveries/reject/${id}`,

{


method:"PUT",

headers:{

"Content-Type":"application/json"

}


}

);



const data =
await response.json();



console.log(data);



if(response.ok){

alert(
"Delivery rejected"
);


loadData();

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







const earnings =
activeDeliveries.reduce(

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

Rider Dashboard

</p>


</div>





<div className="flex items-center gap-5">


<span className="font-bold">

{user.name}

</span>



<button

onClick={logout}

className="bg-red-100 text-red-600 px-5 py-2 rounded-xl flex gap-2"

>

<LogOut size={18}/>

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

Earnings

</p>


<h1 className="text-4xl font-bold">

₹{earnings}

</h1>


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

className="bg-white p-6 rounded-2xl shadow"


>



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

className="flex-1 bg-red-500 text-white p-3 rounded-xl flex justify-center gap-2"

>

<X/>

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



<div className="grid md:grid-cols-2 gap-6">



{

activeDeliveries.map((delivery)=>(


<div

key={delivery._id}

className="bg-green-50 border border-green-300 p-6 rounded-2xl"


>


<h3 className="font-bold text-xl">

{delivery.restaurantName}

</h3>


<p>

{delivery.pickupLocation}

→

{delivery.dropLocation}

</p>



<p>

📦 {delivery.packageDetails}

</p>



<p className="font-bold text-green-700">

₹{delivery.payment}

</p>


</div>



))


}



</div>


</section>




</main>


</div>


);


}
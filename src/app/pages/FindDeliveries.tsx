import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import DeliveryBatchCard from "../components/DeliveryBatchCard";

import {
  MapPin,
  Search,
  Banknote,
  Package,
  Filter,
  Store
} from "lucide-react";



type Delivery = {

_id:string;

restaurantName:string;

category:string;

pickupLocation:string;

dropLocation:string;

distance:string;

estimatedTime:string;

packageDetails:string;

payment:number;

status:string;

};




export default function FindDeliveries(){


const [deliveries,setDeliveries] =
useState<Delivery[]>([]);


const [search,setSearch] =
useState("");



const [loading,setLoading] =
useState(true);

const [selectedCategory,setSelectedCategory] =
useState("");

const viewOrders = (category:string)=>{

setSelectedCategory(category);

document
.getElementById("available-orders")
?.scrollIntoView({
behavior:"smooth"
});

};

// ===============================
// GET AVAILABLE DELIVERY
// ===============================


useEffect(()=>{


fetchDeliveries();


},[]);





const fetchDeliveries = async()=>{


try{


const response =
await fetch(

"http://localhost:5000/api/deliveries/available"

);



const data =
await response.json();



console.log(
"Available Deliveries:",
data
);



if(response.ok){

setDeliveries(data);

}



}
catch(error){

console.log(error);

}


finally{

setLoading(false);

}


};








const filteredDeliveries = deliveries.filter((item)=>{


const searchMatch =

item.restaurantName
.toLowerCase()
.includes(search.toLowerCase())

||

item.pickupLocation
.toLowerCase()
.includes(search.toLowerCase());



const categoryMatch =

selectedCategory === ""

||

item.category === selectedCategory;



return searchMatch && categoryMatch;


});







return(


<div className="pt-12 pb-24 bg-slate-50 min-h-screen">






{/* HERO */}


<section className="max-w-7xl mx-auto px-6 mb-12">


<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="bg-slate-900 rounded-[3rem] p-12 relative overflow-hidden"

>



<div className="relative z-10">


<h1 className="text-5xl font-extrabold text-white mb-5">

Find Delivery Orders

</h1>


<p className="text-slate-300 text-lg mb-8">

Choose delivery orders near you and start earning with GigWorker.

</p>





<div className="flex gap-3">


<div className="flex-1 relative">


<Search

className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"

/>



<input


placeholder="Search restaurant or location..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}


className="w-full pl-12 py-4 rounded-xl bg-white text-black outline-none"

/>



</div>




<button

className="px-6 py-4 bg-[#A33D20] text-white rounded-xl flex gap-2 font-bold"

>


<Filter/>

Filter


</button>



</div>



</div>


</motion.div>



</section>



<DeliveryBatchCard 
viewOrders={viewOrders}
/>





{/* DELIVERY LIST */}


<section className="max-w-7xl mx-auto px-6">



<div className="flex justify-between mb-8">


<h2 className="text-3xl font-bold">

Available Deliveries

</h2>


<p className="text-gray-500">

{deliveries.length} Orders Found

</p>


</div>









{

loading ?


<p className="text-center text-xl">

Loading deliveries...

</p>



:

filteredDeliveries.length===0 ?


<div className="bg-white p-10 rounded-2xl text-center">

No delivery available

</div>



:



<div className="grid md:grid-cols-3 gap-6">


{


filteredDeliveries.map((delivery)=>(



<motion.div

key={delivery._id}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}


className="bg-white rounded-[2rem] p-6 shadow hover:shadow-xl transition"

>




<div className="flex justify-between">


<div className="bg-orange-100 text-[#A33D20] px-3 py-1 rounded-full text-sm font-bold">

Available

</div>


<Store/>

</div>





<h3 className="text-2xl font-bold mt-5">

{delivery.restaurantName}

</h3>





<div className="space-y-4 mt-5 text-gray-600">



<p className="flex gap-2">

<MapPin/>

{delivery.pickupLocation}

</p>





<p className="flex gap-2">

📍

{delivery.dropLocation}

</p>





<p className="flex gap-2">

<Package/>

{delivery.packageDetails}

</p>





<p className="flex gap-2 font-bold text-[#A33D20]">

<Banknote/>

₹{delivery.payment}

</p>




</div>







<Link

to="/login"

className="block mt-6 text-center bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-[#A33D20]"

>

Accept Delivery

</Link>






</motion.div>



))


}



</div>


}




</section>







</div>


);


}
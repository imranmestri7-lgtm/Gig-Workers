import {
  MapPin,
  IndianRupee
} from "lucide-react";


const batches = [

  {
    id:1,
    title:"Restaurant Delivery",
    category:"restaurant",
    icon:"🍔",
    orders:"12 Orders Available",
    location:"Kolhapur City",
    earning:"₹800 - ₹1200"
  },


  {
    id:2,
    title:"Grocery Delivery",
    category:"grocery",
    icon:"🥦",
    orders:"8 Orders Available",
    location:"Market Area",
    earning:"₹600 - ₹1000"
  },


  {
    id:3,
    title:"Cafe & Bakery Run",
    category:"cafe",
    icon:"☕",
    orders:"5 Orders Available",
    location:"University Area",
    earning:"₹400 - ₹700"
  }

];



type Props = {

  viewOrders:(category:string)=>void;

};



export default function DeliveryBatchCard({

viewOrders

}:Props){



return (

<section className="max-w-7xl mx-auto px-6 mt-12">


<h2 className="text-3xl font-bold text-slate-900 mb-6">

Nearby Delivery Batches

</h2>



<div className="grid md:grid-cols-3 gap-6">


{

batches.map((batch)=>(


<div

key={batch.id}

className="bg-white rounded-3xl shadow-sm border p-6 hover:shadow-lg transition"

>


<div className="text-5xl mb-4">

{batch.icon}

</div>



<h3 className="text-xl font-bold">

{batch.title}

</h3>



<p className="text-gray-500 mt-2">

{batch.orders}

</p>




<div className="mt-5 space-y-3">


<p className="flex items-center gap-2">

<MapPin size={18}/>

{batch.location}

</p>



<p className="flex items-center gap-2 font-bold text-[#A33D20]">

<IndianRupee size={18}/>

{batch.earning}

</p>


</div>





<button

type="button"

onClick={()=>{

console.log("Selected Batch:",batch.category);

viewOrders(batch.category);

}}

className="mt-6 w-full bg-[#A33D20] text-white py-3 rounded-xl font-bold cursor-pointer"

>

View Orders

</button>




</div>


))

}



</div>


</section>

);


}
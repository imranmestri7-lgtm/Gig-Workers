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
} from "lucide-react";


export default function RestaurantDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  const [showForm, setShowForm] = useState(false);

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  const [payment, setPayment] = useState("");

  const [loading, setLoading] = useState(false);

  const [deliveries, setDeliveries] = useState<any[]>([]);



  // ===============================
  // CHECK LOGIN
  // ===============================

  useEffect(() => {

    const savedUser = localStorage.getItem("user");


    if (!savedUser) {
      navigate("/login");
      return;
    }


    try {

      const userData = JSON.parse(savedUser);


      if(userData.accountType !== "restaurant"){
        navigate("/");
        return;
      }


      setUser(userData);


      fetchRestaurantDeliveries(userData.id);


    } catch(error){

      console.log(error);
      navigate("/login");

    }


  }, [navigate]);





  // ===============================
  // GET RESTAURANT DELIVERIES
  // ===============================


  const fetchRestaurantDeliveries = async(
    restaurantId:string
  )=>{


    try{


      const response = await fetch(
        `http://localhost:5000/api/deliveries/restaurant/${restaurantId}`
      );



      const data = await response.json();



      if(response.ok){

        setDeliveries(
          data.deliveries || data
        );

      }
      else{

        console.log(data.message);

      }



    }
    catch(error){

      console.error(
        "Fetch delivery error:",
        error
      );

    }


  };






  // ===============================
  // CREATE DELIVERY
  // ===============================


  const handleCreateDelivery = async(
    e:React.FormEvent<HTMLFormElement>
  )=>{


    e.preventDefault();



    if(!user){

      alert("Please login again");
      return;

    }



    setLoading(true);



    try{


      const response = await fetch(
        "http://localhost:5000/api/deliveries",
        {

          method:"POST",


          headers:{

            "Content-Type":"application/json",

          },


          body:JSON.stringify({

            restaurantId:user.id,

            pickupLocation,

            dropLocation,

            packageDetails,

            payment:Number(payment),

          }),


        }
      );





      const data = await response.json();





      if(!response.ok){

        alert(
          data.message ||
          "Failed to create delivery"
        );

        return;

      }






      alert(
        "Delivery created successfully!"
      );





      // reset form

      setPickupLocation("");

      setDropLocation("");

      setPackageDetails("");

      setPayment("");

      setShowForm(false);





      // refresh data

      fetchRestaurantDeliveries(
        user.id
      );



    }

    catch(error){


      console.error(
        "Create delivery error:",
        error
      );


      alert(
        "Server not connected"
      );


    }


    finally{

      setLoading(false);

    }



  };






  // ===============================
  // LOGOUT
  // ===============================


  const handleLogout = ()=>{


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    navigate("/login");


  };
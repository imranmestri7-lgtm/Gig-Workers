import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";



delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"

});


type DeliveryMapProps = {

  pickupPosition: [number, number];

  dropPosition: [number, number];

};


export default function DeliveryMap({

  pickupPosition,

  dropPosition

}: DeliveryMapProps){


  return(

    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <MapContainer

        center={pickupPosition}

        zoom={13}

        style={{
          height:"400px",
          width:"100%"
        }}

      >

        <TileLayer

          attribution='&copy; OpenStreetMap contributors'

          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        />


        <Marker position={pickupPosition}>

          <Popup>

            📍 Pickup Location

          </Popup>

        </Marker>


        <Marker position={dropPosition}>

          <Popup>

            🏠 Drop Location

          </Popup>

        </Marker>


      </MapContainer>

    </div>

  );

}

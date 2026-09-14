import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
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
}: DeliveryMapProps) {
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([pickupPosition, dropPosition]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${pickupPosition[1]},${pickupPosition[0]};${dropPosition[1]},${dropPosition[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.routes && data.routes[0]) {
          const formattedCoordinates: [number, number][] = data.routes[0].geometry.coordinates.map(
            (coord: [number, number]) => [coord[1], coord[0]]
          );
          setRouteCoords(formattedCoordinates);
        }
      } catch (error) {
        console.error("Failed to fetch road route", error);
      }
    };

    fetchRoute();
  }, [pickupPosition, dropPosition]);

  const centerLat = (pickupPosition[0] + dropPosition[0]) / 2;
  const centerLng = (pickupPosition[1] + dropPosition[1]) / 2;

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={13}
        style={{
          height: "400px",
          width: "100%"
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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

        {/* Real street-following routing line */}
        <Polyline positions={routeCoords} color="#2563eb" weight={5} opacity={0.8} />
      </MapContainer>
    </div>
  );
}
import  { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Corregir el problema de iconos con react-leaflet y leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const EarthquakeMap = () => {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query', {
          params: {
            format: 'geojson',
            starttime: '2000-01-01', // Puedes ajustar la fecha de inicio según sea necesario
            endtime: new Date().toISOString().split('T')[0], // Fecha actual
            minlatitude: 18.800000,
            maxlatitude: 19.200000,
            minlongitude: -98.800000,
            maxlongitude: -97.000000
          }
        });
        setEarthquakes(response.data.features);
      } catch (error) {
        console.error('Error fetching earthquake data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer center={[19.0, -97.9]} zoom={8} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {earthquakes.map((earthquake) => (
        <Marker
          key={earthquake.id}
          position={[
            earthquake.geometry.coordinates[1],
            earthquake.geometry.coordinates[0]
          ]}
        >
          <Popup>
            <div>
              <strong>Magnitud:</strong> {earthquake.properties.mag}<br />
              <strong>Ubicación:</strong> {earthquake.properties.place}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EarthquakeMap;

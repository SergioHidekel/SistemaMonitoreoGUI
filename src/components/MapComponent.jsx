import  { useState, useEffect } from 'react';
import {MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
//import Markers from './Markers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const WeatherMapComponent = () => {
  const [markers, setMarkers] = useState([
    { position: [19.020921, -98.626786], popup: "Loading...", },
    { position: [19.1783588,-98.6530277], popup: "Loading..." },
    { position: [19.0304015,-97.2783758], popup: "Loading..." },
    { position: [19.001735, -98.202897]}
  ]);

  const apiKey = '9cb0b15cbe8a509a5b050bde27f68b9f'; // Reemplaza con tu API Key de OpenWeatherMap

  useEffect(() => {
    const fetchWeatherData = async () => {
      const updatedMarkers = await Promise.all(markers.map(async (marker) => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${marker.position[0]}&lon=${marker.position[1]}&units=metric&appid=${apiKey}`);
        const temperature = response.data.main.temp;
        return { ...marker, popup: `Temperature: ${temperature}°C`   };
      }));
      setMarkers(updatedMarkers);
    };

    fetchWeatherData();
  }, [apiKey]);

  const position = [19.001735, -98.202897];

  return (
    <MapContainer center={position} zoom={10} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
       {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default WeatherMapComponent;






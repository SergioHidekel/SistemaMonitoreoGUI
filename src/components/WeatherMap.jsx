import  { useState, useEffect } from 'react';
import {MapContainer, TileLayer, Marker, Popup, Polygon  } from 'react-leaflet'
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

const WeatherMap = () => {

  const [markers, setMarkers] = useState([
    { position: [19.020921, -98.626786], popup: "Loading...", },
    { position: [19.1783588,-98.6530277], popup: "Loading..." },
    { position: [19.0304015,-97.2783758], popup: "Loading..." },
    { position: [19.001735, -98.202897]}
  ]);

  const [earthquakeData, setEarthquakeData] = useState(null);
const [showPopup, setShowPopup] = useState(false);
const [popupPosition, setPopupPosition] = useState([0, 0]);


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

  const mapBounds = [
    [18.500000, -99.000000], // Suroeste
    [19.500000, -97.000000]  // Noreste
  ];

  const geofenceCoordinates = [
    [19.200000, -98.800000],
    [19.200000, -97.000000],
    [18.800000, -97.000000],
    [18.800000, -98.800000],
  ];

  const handlePolygonClick = async (event) => {
    const { latlng } = event;
    setPopupPosition([latlng.lat, latlng.lng]);

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

    setEarthquakeData(response.data.features);
    setShowPopup(true);
  };

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }} bounds={mapBounds}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
       {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
            <Polygon 
        positions={geofenceCoordinates} 
        color="blue" 
        eventHandlers={{
          click: handlePolygonClick,
        }} 
      />
      {showPopup && (
        <Popup position={popupPosition} onClose={() => setShowPopup(false)}>
          <div>
            <h4>Earthquake Data</h4>
            {earthquakeData && earthquakeData.length > 0 ? (
              <ul>
                {earthquakeData.map((quake, index) => (
                  <li key={index}>
                    {quake.properties.place}: {quake.properties.mag} magnitude, {new Date(quake.properties.time).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No earthquakes found in this area.</p>
            )}
          </div>
        </Popup>
      )}

    </MapContainer>
  );
};

export default WeatherMap;
//import React from 'react'
//import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
//import MapComponent from './components/MapComponent';
import './App.css';
//import EarthquakeList from './components/EarthquakeList';
//import WeatherComponent from './components/WeatherComponent';


function App() {
  

  return (
    <div className="App" style={{ display: 'flex' }}>
      <Sidebar/>
    </div>

  )
}

export default App
 /*
    
    <WeatherComponent/>
    <Sidebar />
    <MapComponent />
    <EarthquakeList/>
 */
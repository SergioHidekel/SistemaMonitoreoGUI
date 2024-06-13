//import React from 'react'
//import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MapComponent from './components/MapComponent';
import './App.css';


function App() {
  

  return (
    <div className="App" style={{ display: 'flex' }}>
    <Sidebar />
    <MapComponent />
  </div>

  )
}

export default App

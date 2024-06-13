//import React from 'react'
import {Marker, Popup} from 'react-leaflet'

const Markers = () => {
  return (
    <Marker position={{lat:'19.075988', lng:'-98.612523'}}>
        <Popup>
            Temperatura
        </Popup>
    </Marker>
 
  )
}

export default Markers

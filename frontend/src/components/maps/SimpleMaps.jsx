import React, { Component } from 'react';
import { GoogleMap, LoadScript,Circle,Marker } from '@react-google-maps/api';


const mapContainerStyle = {
    height: "400px",
    width: "800px"
  }
  
  const center = {
    lat: -3.745,
    lng: -38.523
  }
    
  const position = {
    lat: 40.6710729,
    lng: -73.9988001
  }
  
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1

  }
  
  const onLoad = circle => {
    console.log('Circle onLoad circle: ', circle)
  }

    const onUnmount = circle => {
        console.log('Circle onUnmount circle: ', circle)
    }

    const places = [
        {
          id: 1,
          name: "Park Slope",
          latitude: "40.6710729",
          longitude: "-73.9988001",
          circle: {
            radius: 3000,
            options: {
              strokeColor: "#ff0000"
            }
          }
        },   
      ] 


class SimpleMap extends Component {
  
  
  render() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyBbeRcs-pasAaXrl5Ph3K-I4Zcd2SgCRKA"
      >
        <GoogleMap
        id="circle-example"
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={2}
        >
          { /* Child components, such as markers, info windows, etc. */ }
        
        <Circle
        // optional
        onLoad={onLoad}
        // optional
        onUnmount={onUnmount}
        // required
        center={position}
        // required
        options={options}
        />
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default SimpleMap;
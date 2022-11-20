import React, { Component, Fragment } from 'react';
import { GoogleMap, LoadScript,Circle,Marker } from '@react-google-maps/api';


const mapContainerStyle = {
    height: "200px",
    width: "400px"
  }


class SimpleMaps extends Component {
  
  
  render() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyBbeRcs-pasAaXrl5Ph3K-I4Zcd2SgCRKA"
      >
        <GoogleMap
        id="circle-example"
          mapContainerStyle={mapContainerStyle}
          center={this.props.places[0].position}
          zoom={4}
        >
            {
                this.props.places.map(place=>{
                    return(
                        <Marker
                        key={place.name}
                        position={place.position} />)})
            }
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default SimpleMaps;
import React, { Component, Fragment } from 'react';
import { GoogleMap, LoadScript,Circle,Marker } from '@react-google-maps/api';
import {Card} from 'react-bootstrap';


const mapContainerStyle = {
    height: "300px",
    width: "80%"
  }


class SimpleMaps extends Component {
  
  
  render() {
    return (
    <div style={{marginLeft:"4rem"}}>
      <center>
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
        <Card style={{width:"80%",textAlign:"left",marginTop:"1rem"}}>
        <Card.Header as="h5">{this.props.place}</Card.Header>
        <Card.Body>
            <Card.Text>
            {this.props.description}
            </Card.Text>
        </Card.Body>
        </Card>
        </center>
      </div>
    )
  }
}

export default SimpleMaps;
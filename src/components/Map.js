//import React from 'react';
import '../App.css';
import React, { Component } from 'react';






  

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            zoom: 15,
            center: { lat: 13.7648, lng: 100.5381 }
        }
    }
    componentWillMount() {
        window.initMap = this.initMap
    }
    initMap = () => {
        window.map = new window.google.maps.Map(document.getElementById("map"), {
            center: this.state.center,
            zoom: this.state.zoom,
            
            //clickableIcons: false,
            // mapTypeControl: false,
            // streetViewControl: false,
            // fullscreenControl: false,
            mapTypeId: 'satellite',
        })
        this.setState({
            isLoad: true
        })
        var marker = new window.google.maps.Marker({
            map: window.map,
            position: { lat: 13.7648, lng: 100.5381 },
            clickable: true,
            draggable: true,
            
        })
        window.google.maps.event.addListener(window.map, 'click', function (event) {
            console.log("This last lat",event.latLng.lat())
            console.log("This last lng",event.latLng.lng())
            marker.setOptions({ position: event.latLng })
        })
    }
// btnmarker = () => {
//        var marker = new window.google.maps.Marker({
//             map: window.map,
//             position: { lat: 13.7648, lng: 100.5381 },
//             clickable: true,
//             draggable: true,

//         })
//         window.google.maps.event.addListener(window.map, 'click', function (event) {
//             console.log(event.latLng)
//             marker.setOptions({ position: event.latLng })
//         })
// }
    render() {
        var childrenOutput = null;
        if (this.state.isLoad === true) {
            childrenOutput = this.props.children;
        }
        return (
            <div style={{
                //left: this.props.left,
                height: "500px"
            }}
                className="Map"
                id="map"
            >
            {/* <button onClick={this.btnmarker()}>Click me </button> */}
                {childrenOutput}
            </div>
        );
    }
}
export default Map;
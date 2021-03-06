//import React from 'react';
import '../App.css';
import React, { Component } from 'react';
import pikachu from './paprika.png'

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            zoom: 9,
            // center: { lat: 13.7648, lng: 100.5381 },
        }
        this.initMap = this.initMap.bind(this);


    }
    componentWillMount() {
        window.initMap = this.initMap
    }

    initMap = () => {
        window.map = new window.google.maps.Map(document.getElementById("map"), {
            center: this.props.center,
            zoom: this.state.zoom,
            mapTypeId: 'satellite',

        })
        this.setState({
            isLoad: true
        })
        // var infoWindow = new window.google.maps.InfoWindow;
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((position) => {
        //         var pos = {
        //             lat: position.coords.latitude,
        //             lng: position.coords.longitude
        //         };

        //         infoWindow.setPosition(pos);
        //         infoWindow.setContent('คุณอยู่ตรงนี้');
        //         infoWindow.open(window.map);
        //         window.map.setCenter(pos);
        //         setTimeout(function () {
        //             infoWindow.close(window.map)
        //         }, 3000);
        //     });
        // }
        // var imageBounds = {
        //     north: 16.166301    ,
        //     south: 14.214607,
        //     east: 105.897751,
        //     west: 104.390427
        //   };
        // var historicalOverlay;
        // historicalOverlay = new window.google.maps.GroundOverlay(
        //     pikachu,
        //     imageBounds);
        // historicalOverlay.setMap(window.map);
    }
   



    render() {
        var childrenOutput = null;
        const { marks } = this.state
        if (this.state.isLoad === true) {
            childrenOutput = this.props.children;
        }
        return (
            <div style={{
                // position: 'absolute',
                // top: 0,
                // right: 0,
                // left: 0,
                // bottom: 0,
                width: '100%',
                height: '90vh'
            }}
                //className="Map"
                id="map"
            >
                {/* <button onClick={this.btnmarker()}>Click me </button> */}
                {childrenOutput}
            </div>
        );
    }
}
export default Map;
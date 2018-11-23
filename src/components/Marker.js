import React, { Component } from 'react';
//import { Marker } from 'react-google-maps';

class Marker extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.marker = false
    }
    componentWillUnmount() {
        if (this.marker !== false) {
            this.marker.setMap(null)
        }
    }
    redrawMarker = () => {
        var image = {
            // url: icon,
            //size: new window.google.maps.Size(71, 71),
            //origin: new window.google.maps.Point(0, 0),
            //anchor: new window.google.maps.Point(15, 15),
            //scaledSize: new window.google.maps.Size(25, 25)
        };
        if (this.marker === false) {
            this.marker = new window.google.maps.Marker({
                //map: window.map,
                position: this.props.position,
                // overlayId,
                // overlayType,
                // overlayDrawType,
                // icon: image,
                clickable: true,
                draggable: true,
                // overlayName,
                // overlayDetail,
                // zIndex,
                // undoCoords,
                // redoCoords,
                // overlaySource,
            })
            //this.props.addMarkerListener(this.marker)
        } else {
            this.marker.setOptions({
                position: this.props.position,
                //icon: image,
                // overlayName,
                // overlayDetail,
                // zIndex,
                // undoCoords,
                // redoCoords,
                // overlaySource,
            })
        }
    }


    render() {
        this.redrawMarker()
        return (null);
    }
}
export default Marker
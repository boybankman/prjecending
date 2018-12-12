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

        if (this.marker === false) {
            this.marker = new window.google.maps.Marker({
                position: this.props.position,
                clickable: true,
                draggable: true,
            })

        } else {
            this.marker.setOptions({
                position: this.props.position,
            })
        }
    }


    render() {
        this.redrawMarker()
        return (null);
    }
}
export default Marker
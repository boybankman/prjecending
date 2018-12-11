//import React from 'react';
import '../App.css';
import React, { Component } from 'react';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            zoom: 5,
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
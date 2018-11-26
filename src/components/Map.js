//import React from 'react';
import '../App.css';
import React, { Component } from 'react';
import fire from '../firebase/Fire'
import Testmark from './Marker'






class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            zoom: 15,
            center: { lat: 13.7648, lng: 100.5381 }
        }
        this.sendPosition = this.sendPosition.bind(this);
        this.initMap = this.initMap.bind(this);
        this.btnmarker = this.btnmarker.bind(this);
        this.getMarker = this.getMarker.bind(this);
      
    }
    componentWillMount() {
        this.getMarker()
        window.initMap = this.initMap
     
    }
    initMap = () => {
        var _this = this
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

        // var marker = new window.google.maps.Marker({
        //     map: window.map,
        //     position: { lat: 13.7648, lng: 100.5381 },
        //     clickable: true,
        //     draggable: true,

        // })
        // window.google.maps.event.addListener(window.map, 'click', function (event) {
        //     console.log("This last lat", event.latLng.lat())
        //     console.log("This last lng", event.latLng.lng())
        //     marker.setOptions({ position: event.latLng })
        //     //  _this.sendPosition(event.latLng)
        // })
    }
    //******************************************************************************************************************** */
    sendPosition(latLng) {
        let sendToP = {
            lat: latLng.lat(),
            lng: latLng.lng()
        }

        const databaseRef = fire.database().ref('/Marker');
        const MarkerPoint = databaseRef.push({ sendToP })
        console.log(MarkerPoint)
        const keyMarker = MarkerPoint.key
        this.setState({ keyMarker: keyMarker })
        console.log(keyMarker)
    }
    //*********************************************************************************************************************** */
    btnmarker = () => {
        var _this = this
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

        window.google.maps.event.addListener(window.map, 'click', function (event) {
            var marker = new window.google.maps.Marker({
                map: window.map,
                position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
                clickable: true,
                draggable: true,

            })
            console.log("This last lat", event.latLng.lat())
            console.log("This last lng", event.latLng.lng())
            marker.setOptions({ position: event.latLng })
            _this.sendPosition(event.latLng)
        })

    }
    getMarker() {
        const dataref = fire.database().ref('Marker')
        dataref.on('value', (snapshot) => {
            let marks = [];

            snapshot.forEach(function (childSnapshot) {
                marks.push({
                    key: childSnapshot.key,
                    lat: childSnapshot.val().sendToP.lat,
                    lng: childSnapshot.val().sendToP.lng

                })
            })
            this.setState({
                marks: marks
            });
            console.log(marks)
            marks.map((m) => {
                var marker = new window.google.maps.Marker({
                    map: window.map,
                    position: { lat: m.lat, lng: m.lng },
                    clickable: true,
                    draggable: false,
                })
            })
        })
  
    }
    render() {
        var childrenOutput = null;
       const {marks} =  this.state
        if (this.state.isLoad === true) {
            childrenOutput = this.props.children;
        }
        return (
            <div style={{
                //left: this.props.left,
                height: "100vh"
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
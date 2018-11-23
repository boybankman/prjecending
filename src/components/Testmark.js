import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class TestMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let testMarker = this.state.marks.map((m) => {
        var marker = new window.google.maps.Marker({
            map: window.map,
            position: { lat: m.lat, lng: m.lng },
            clickable: true,
            draggable: true,
    
        })
    console.log('test')
    })
    return (null);
}
}
export default TestMarker;
import React, { Component } from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import Map from './components/Map'
import Marker from './components/Marker';


class App extends Component {

  render() {
    return (
      <div>
        <Map>
        <Marker
          
          />
        </Map>
      </div>
    )
  }
}

export default App;

function new_script(src) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function () {
      resolve();
    });
    script.addEventListener('error', function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  })
};
// Promise Interface can ensure load the script only once
var my_script = new_script('https://maps.googleapis.com/maps/api/js?&libraries=geometry,drawing,places,visualization&key=&callback=initMap');


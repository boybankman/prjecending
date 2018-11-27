import React, { Component } from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import Map from './components/Map'
import Marker from './components/Marker';
import fire from './firebase/Fire';
import Login from './LoginPage/Login'
import Register from './RegisterPage/Register'
import Upload from './UploadPage/Upload'
import { Switch, Route } from 'react-router-dom'


class App extends Component {
  constructor(props){
      super(props);
      this.state = {
        user: null ,
      }
      this.getMarker = this.getMarker.bind(this)
    }
  
    componentDidMount(){
      this.authListener();
    }
    componentWillMount(){
      this.getMarker();
    }
    authListener() {
      fire.auth().onAuthStateChanged((user) => {
        //console.log(user);
        if (user) {
          this.setState({user});
         // localStorage.setItem('user', user.uid);
        }
        else {
          this.setState({user : null});
         // localStorage.removeItem('user');
        }
      });
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
          marks.map((m) => {ป
              var marker = new window.google.maps.Marker({
                  map: window.map,
                  position: { lat: m.lat, lng: m.lng },
                  clickable: true,
                  draggable: false,
              })
          })
      })

  }
    btnmarker = () => {
      var _this = this
      // window.map = new window.google.maps.Map(document.getElementById("map"), {
      //     center: this.state.center,
      //     zoom: this.state.zoom,

      //     //clickableIcons: false,
      //     // mapTypeControl: false,
      //     // streetViewControl: false,
      //     // fullscreenControl: false,
      //     mapTypeId: 'satellite',
      // })
      // this.setState({
      //     isLoad: true
      // })

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
          window.google.maps.event.clearinstan
      })

  }
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
    
    
  
    render() {
      
      return (
        <div className="App">
            <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Upload" component={Upload} />
          </Switch>
      <Map>
      <Button variant="contained" onClick={this.btnmarker}>test database</Button>
      
      </Map>
        </div> 
      );
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


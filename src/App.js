import React, { Component } from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import Map from './components/Map'
import Marker from './components/Marker';
import fire from './firebase/Fire';
import Login from './LoginPage/Login'
import Register from './RegisterPage/Register'
import Upload from './UploadPage/Upload'
import Formup from './Menuform/Formup'
import { Switch, Route } from 'react-router-dom'
import { func } from 'prop-types';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      open: false,
      keym: {}
    }
    this.getMarker = this.getMarker.bind(this)
  }

  componentDidMount() {
    this.authListener();
  }

  componentWillMount() {
    this.getMarker()
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      //console.log(user);
      if (user) {
        this.setState({ user });
        // localStorage.setItem('user', user.uid);
      }
      else {
        this.setState({ user: null });
        // localStorage.removeItem('user');
      }
    });
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
 
  
  getMarker() {
    var self = this
    const dataref = fire.database().ref('Marker')
    dataref.on('value', (snapshot) => {
      let marks = [];

      snapshot.forEach(function (childSnapshot) {
        marks.push({
          key: childSnapshot.key,
          name: childSnapshot.val().sendToP.name,
          lat: childSnapshot.val().sendToP.lat,
          lng: childSnapshot.val().sendToP.lng,
          pic: childSnapshot.val().sendToP.pic

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
        window.google.maps.event.addListener(marker, 'click', function (event) {
          var keym = m;
          self.setState({ open: true, keym });
        })

      })
    })

  }
  
  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Upload" component={Upload} />
        </Switch>
        <Formup
          handleDrawerClose={this.handleDrawerClose}
          handleDrawerOpen={this.handleDrawerOpen}
          
          {...this.state}
        >

        

        </Formup>
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


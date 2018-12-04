import React, { Component } from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import Map from './components/Map'
import Marker from './components/Marker';
import fire from './firebase/Fire';
import Login from './LoginPage/Login'
import Register from './RegisterPage/Register'
import Upload from './UploadPage/Upload'
import Sform from './Menuform/Sform'
import { Switch, Route } from 'react-router-dom'
import { func } from 'prop-types';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      open: false,
      keym: {},
      openLog: false,
    }
  }
  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Upload" component={Upload} />
        </Switch>
        <Sform
          handleDrawerClose={this.handleDrawerClose}
          handleDrawerOpen={this.handleDrawerOpen}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
          {...this.state}
        >

        

        </Sform>
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


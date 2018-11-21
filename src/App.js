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
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
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




  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Upload" component={Upload} />
        </Switch>
        <Map>
          <Marker/>
        </Map>
      </div>
    );
  }
}

export default App;
new_script('https://maps.googleapis.com/maps/api/js?&libraries=geometry,drawing,places,visualization&key=&callback=initMap');
function new_script(src) {
    console.log('initial google map api load!', src)
    return new Promise(function (resolve, reject)  {
      var script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', function () {
        resolve();
      });
      script.addEventListener('error', function (e) {
        reject(e);
        console.log(456)
      });
      document.body.appendChild(script);
    })
  };
  // Promise Interface can ensure load the script only once
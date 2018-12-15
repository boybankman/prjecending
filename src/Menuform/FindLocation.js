import './Formup.css'
import React from 'react';
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Cancel from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';



class FindLocation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
        isAddMarkerClickAble: false,
    }
  }
    btnLocation = () => {
    var infoWindow = new window.google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('คุณอยู่ตรงนี้');
            infoWindow.open(window.map);
            window.map.setCenter(pos);
            const bounds = new window.google.maps.LatLngBounds
            bounds.extend(pos)
            window.map.fitBounds(bounds)
        });
    }
 }

  render() {
      const { isAddMarkerClickAble } = this.state
    const { classes,user } = this.props
    return (
        <Button variant="contained" disabled={user ? isAddMarkerClickAble : true} onClick={() => {this.btnLocation()}} >My Location</Button>
    )
  }
}
export default FindLocation
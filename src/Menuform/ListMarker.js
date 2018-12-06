import React, { Component } from 'react';
import firebase from '../firebase/Fire';
import Popup from "reactjs-popup";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marks: []
        }

    }
    componentWillMount = () => {
        this.getDataList()
    }

    getDataList = () => {

        const dataref = firebase.database().ref('Marker')

        dataref.on('value', (snapshot) => {
            let marks = [];

            snapshot.forEach(function (childSnapshot) {
                marks.push({
                    key: childSnapshot.key,
                    name: childSnapshot.val().sendToP.name,
                    lat: childSnapshot.val().sendToP.lat,
                    lng: childSnapshot.val().sendToP.lng,
                    pic: childSnapshot.val().sendToP.pic
                });
            });

            this.setState({
                marks: marks
            });
            console.log(marks)
        });
    }

    render() {
        const { marks } = this.state
        let showMarks = marks.map((m) => {

            return (

                <tr >
                    
                    <th >{m.name}</th>
                    <th><button onClick={() => {this.props.gotoMarker(m)}}>Go</button></th>

                </tr>
            )
        });
        return (
            <div className="App">
                {showMarks}
            </div>
        );
    }
}

export default Register;
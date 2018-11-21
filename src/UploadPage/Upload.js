import React, { Component } from 'react';
import fire from '../firebase/Fire';
import { auth } from '../firebase/Fire';
import { Link } from 'react-router-dom'
import DocumentInput from './DocumentInput';
import Map from '../components/Map'

class UploadFolders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value1: 0,
            value2: 0,
            center: {lat: 18.796143, lng: 98.979263 },
            documents: [],
            rows: [],
            folderN: '',
        }
        this.logout = this.logout.bind(this);
        this.renderFolder = this.renderFolder.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.sendDTB = this.sendDTB.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }
    logout() {
        fire.auth().signOut();
        this.setState({ user: null });
    }
    sendDTB(folderName) {

        let sendName = {
            name: folderName,
            UserId: this.state.user.email
        }
        // let usertt = this.props.index
        const databaseRef = fire.database().ref('/Folders');
        const FolderDTB = databaseRef.push({ sendName });
        const keyDtb = FolderDTB.key
        this.setState({ keyDtb: keyDtb })
        console.log(keyDtb)
    }
    handleChange1(event) {
        this.setState({ value1: event.target.value })
    }
    handleChange2(event) {
        this.setState({ value2: event.target.value })
    }
    handleSubmit(event) {
        const lat = this.state.value1
        const long = this.state.value2
        event.preventDefault();
        this.setState({ lat : lat })
        this.setState({ long : long })
        console.log(lat,long)
        // const documents = this.state.documents.concat(DocumentInput);

        // this.setState({ documents }, () => console.log(this.state.documents));
        // this.sendDTB(folderName)
        // this.setState({ folderN: folderName })

    }
    componentWillMount() {
        this.getdataFromDatabase()
    }
    getdataFromDatabase() {
        //    console.log("getMetaDataFromDatabase");
        const dataRef = fire.database().ref('Folders');

        dataRef.on('value', (snapshot) => {
            let rows = [];

            snapshot.forEach(function (childSnapshot) {
                rows.push({

                    key: childSnapshot.key,
                    name: childSnapshot.val().sendName.name,
                    create: childSnapshot.val().sendName.create,
                    UserId: childSnapshot.val().sendName.UserId,
                });
            });

            this.setState({
                rows: rows
            });
            console.log(rows)
        });
    }
    btnMarker =() => {
        console.log(this.state.lat)
        
           
          
            var map = new window.google.maps.Map(document.getElementById('map'), {
              zoom: 4,
              center: {lat: this.state.lat , lng: this.state.long }
            });
          
            // var marker = new window.google.maps.Marker({
            //   position: {lat: this.state.lat, lng: this.state.long},
            //   map: map,
            //   title: 'Hello World!',
            //   clickable: true,

            // });
          
    }
    renderFolder() {
        var _this = this

        if (this.state.user) {
            const { rows, user } = this.state
            return (
                <div>
                    <p>Hi ♥ {this.state.user.displayName || this.state.user.email}</p>
                    <Link to="/" ><button className="loginBtn--N" onClick={this.logout}>Logout</button></Link>

                    <h3>My Google Maps Demo</h3>
                     <form onSubmit={this.handleSubmit}>
                        Name:
                        <input type="number" value={this.state.value1} name="name" onChange={this.handleChange1} />
                        <input type="number" value={this.state.value2} name="name" onChange={this.handleChange2} />
                        <input type="submit" value="Submit" />
                    </form>
                    <DocumentInput
                     rows={rows}
                     user={user}
                    />
                          <button onClick={this.btnMarker}>WTF This</button>
                </div>
            )


            
        }
    }
    render() {
        return (
            <div>
                {this.renderFolder()}
      
            </div>
        )

    }

}
export default UploadFolders;
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
            value: '',
            keyDtb: '',
            documents: [],
            rows: [],
            folderN: '',
        }
        this.logout = this.logout.bind(this);
        this.renderMap = this.renderMap.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
    handleChange(event) {
        this.setState({ value: event.target.value })
    }
    handleSubmit(event) {
        const folderName = this.state.value
        event.preventDefault();
        this.setState({ folderName: folderName })
        const documents = this.state.documents.concat(DocumentInput);

        this.setState({ documents }, () => console.log(this.state.documents));
        this.sendDTB(folderName)
        this.setState({ folderN: folderName })

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
    

    
    renderMap() {
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
                        <input type="text" value={this.state.value} name="name" onChange={this.handleChange} />
                        <input type="submit" value="Submit" />
                    </form>
                    <DocumentInput
                     rows={rows}
                     user={user}
                    />  

                    <Map/>
                </div>
            )



        }
    }
    render() {
        return (
            <div>
                {this.renderMap()}
            </div>
        )

    }

}
export default UploadFolders;
import React, { Component } from 'react';
import fire from '../firebase/Fire';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconCancel from '../IconCancel.png';
import IconPause from '../IconPause.png';
import IconPlay from '../IconPlay.png';
import Popup from "reactjs-popup";

var shortid = require('shortid');

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    root: {
        width: '100%',
        maxWidth: 500,
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing.unit,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});




class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            textnName: '',
            uploadFilesObj: {},
        }
        this.handleChange = this.handleChange.bind(this);
        this.uploadSubmit = this.uploadSubmit.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.CheckUrl = this.CheckUrl.bind(this);
        this.strRef = fire.storage().ref();
        this.btnCancel = this.btnCancel.bind(this)
        this.btnPause = this.btnPause.bind(this)
        this.btnPlay = this.btnPlay.bind(this)
    }
    handleChange(e) {
        this.setState({ fname: e.target.value });
        //////////////////////////////////
        // this.setState({
        //     [name]: event.target.value,
        //   });
        //////////////////////////////////
    }
    handleDescription = (e) => {
        this.setState({ textnName: e.target.value });
    }
    //new multi
    uploadSubmit(event) {
        event.preventDefault();
        const allFiles = Array.from(this.fileInput.files);
        if (allFiles.length > 0) {
            // Add each files to state
            var tempUploadFilesObj = {};
            allFiles.forEach((file, index) => {
                var fileObj = {};
                fileObj.fileName = file.name;
                fileObj.isUploading = true;
                fileObj.progressPercent = 0;
                fileObj.uploadTask = 1;
                const objKey = `file${index}`;
                tempUploadFilesObj[objKey] = fileObj;
            });
            this.setState({
                uploadFilesObj: tempUploadFilesObj
            }, () => {
                // Upload each files & update progress
                allFiles.forEach((file, index) => {
                    this.uploadFile(file, index)
                });
            });

        }
        //console.log(tempUploadFilesObj)


    }
    //new muti upload C.


    uploadFile(file, index) {
        const id = shortid.generate()
        const fileName = id + file.name
        var fileObjKey = `file${index}`;
        var metadata = {
            contentType: file.type
        };
        var thisSpecialStrref = this;
        var uploadTask = this.strRef.child(`images/${fileName}`).put(file, metadata);
        var stateCopy1 = Object.assign({}, this.state);
        stateCopy1.uploadFilesObj[fileObjKey].uploadTask = uploadTask
        this.setState(stateCopy1)
        uploadTask.on("state_changed", (snapshot) => {
            // Progress handling
            var progressFix = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            var progressPercent = progressFix.toFixed(2)
            console.log(`Upload #${index} is ${progressPercent}% done`);
            var stateCopy = Object.assign({}, this.state);
            stateCopy.uploadFilesObj[fileObjKey].progressPercent = progressPercent;

            this.setState(stateCopy);
            console.log(snapshot.state)
            switch (snapshot.state) {
                case fire.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    this.setState(stateCopy);
                    break;
                case fire.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    this.setState(stateCopy);
                    break;
                default:
                    console.log('No default');
            }
        }, (error) => {
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    console.log('Canceled')
                    this.props.closeDrawerafterup()
                    this.props.btncancel()
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
            var stateCopy = Object.assign({}, this.state);
            delete stateCopy.uploadFilesObj[fileObjKey];
            thisSpecialStrref.setState(stateCopy);
            // Error handling
            console.log(error);

        }, () => {
            // Complete handling
            console.log(`Upload #${index} completed`);
            var stateCopy = Object.assign({}, this.state);

            stateCopy.uploadFilesObj[fileObjKey].progressPercent = 100;
            setTimeout(function () {
                delete stateCopy.uploadFilesObj[fileObjKey];
                thisSpecialStrref.setState(stateCopy);
            }, 2000)
            this.CheckUrl(fileName);
        });


    }
    CheckUrl(file) {
        const { slatlong, user } = this.props
        var originalName = file // 01.jpg
        var originalPath = "images/" + originalName; // resized/....^
        const timestamp = new Date();
        console.log(originalName)

        var thisSpecialStrref = this;

        thisSpecialStrref.strRef.child(originalPath).getDownloadURL().then(function (downloadURL3) {
            thisSpecialStrref.strRef.child(`images/${originalName}`).getMetadata().then((metadata) => {

                let sendToP = {
                    name: thisSpecialStrref.state.fname,
                    lat: slatlong.lat(),
                    lng: slatlong.lng(),
                    pic: downloadURL3,
                    desc: thisSpecialStrref.state.textnName,
                    namepic: originalName,
                    userUP: user.email,
                    timestamp: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date())

                }

                const databaseRef = fire.database().ref('/Marker');
                const MarkerPoint = databaseRef.push({ sendToP })
                thisSpecialStrref.props.closeDrawerafterup()
                console.log(MarkerPoint.key)


                // Delay before delete file from state

            }).catch((error) => {
                console.log("URL error 4 : " + error.message);
            });
        }).catch((error) => {
            console.log("URL error 1 : " + error.code);
        });

    }
    btnCancel(fileId) {
        // console.log(fileId)
        var uploadTaskS = Object.assign({}, this.state);
        var uploadTask = uploadTaskS.uploadFilesObj[fileId].uploadTask;
        uploadTask.cancel();
    }
    btnPlay(fileId) {
        // console.log(fileId)
        var uploadTaskS = Object.assign({}, this.state);
        var uploadTask = uploadTaskS.uploadFilesObj[fileId].uploadTask;
        uploadTask.resume();
    }
    btnPause(fileId) {
        // console.log(fileId)
        var uploadTaskS = Object.assign({}, this.state);
        var uploadTask = uploadTaskS.uploadFilesObj[fileId].uploadTask;
        uploadTask.pause();
    }
    render() {
        const { uploadFilesObj } = this.state
        const { classes, user } = this.props;
        return (
            <div className={classes.root}>
                <div className="loading container wrapper">

                    <TextField
                        type="text"
                        name="fname"
                        id="standard-name"
                        label="Name"
                        className={classes.textField}
                        value={this.state.fname}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <form onSubmit={this.uploadSubmit}>
                        <div class="inpc">
                            <input
                                type="file"
                                accept=".jpg, .png, .tiff"
                                ref={input => {
                                    this.fileInput = input;
                                }} />
                        </div>
                        <br />
                        <textarea rows="10" cols="30" value={this.state.textnName}
                            onChange={this.handleDescription} type="text" placeholder="เพิ่มข้อมูล" ></textarea><br />
                        <br />
                        <Button variant="contained" color="primary" className="loginBtn2 loginBtn--U" type="submit">
                            Upload</Button>

                        <Button variant="contained" color="secondary" className={classes.button}
                            onClick={(e) => { this.props.btncancel(e) }}>Cancel</Button>
                    </form>
                </div>

                <div class="barPro">
                    {
                        Object.keys(uploadFilesObj).map((key, index) => {
                            //const updateKey = `file${index}`;
                            const fileObj = uploadFilesObj[key];
                            return (
                                <div key={index}>




                                    {fileObj.progressPercent}

                                    <br />
                                    <br />
                                    {/* <progress value={fileObj.progressPercent} max="100"></progress>&nbsp; &nbsp;{fileObj.progressPercent}% */}


                                    <Popup trigger={<button className="button"> <img src={IconCancel} className="IconCancel" alt="Icon" height="10" weight="10" /> </button>} modal>
                                        {close => (
                                            <div className="Dmodal">
                                                <div className="Dheader"> Do you want to Cancel </div>
                                                <div className="Dactions">
                                                    <button className="button" onClick={() => {

                                                        this.btnCancel(key)
                                                        close()
                                                    }}>Yes</button>
                                                    <button
                                                        className="button"
                                                        onClick={() => {
                                                            console.log('modal closed')
                                                            close()
                                                        }}
                                                    >
                                                        No</button>
                                                </div>
                                            </div>
                                        )}</Popup>

                                    <button type="button"><img src={IconPause} className="IconCancel" onClick={() => this.btnPause(key)} alt="Icon" height="10" weight="10" /></button>
                                    <button type="button"><img src={IconPlay} className="IconCancel" onClick={() => this.btnPlay(key)} alt="Icon" height="10" weight="10" /></button>
                                    <p>{fileObj.fileName}</p>
                                    <br />
                                </div>
                            );
                        })
                    }
                </div>


            </div>
        );
    }
}

UploadForm.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(UploadForm);
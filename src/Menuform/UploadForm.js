import React, { Component } from 'react';
import fire from '../firebase/Fire';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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
    }
    uploadFile(file, index) {
        var fileObjKey = `file${index}`;
        var metadata = {
            contentType: file.type
        };
        var thisSpecialStrref = this;
        var uploadTask = thisSpecialStrref.strRef.child(`images/${file.name}`).put(file, metadata);

        uploadTask.on("state_changed", (snapshot) => {
            // Progress handling
            var progressFix = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            var progressPercent = progressFix.toFixed(2)
            console.log(`Upload #${index} is ${progressPercent}% done`);
            var stateCopy = Object.assign({}, this.state);
            stateCopy.uploadFilesObj[fileObjKey].progressPercent = progressPercent;
            this.setState(stateCopy);

            switch (snapshot.state) {
                case fire.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    this.setState(stateCopy);
                    break;
                case fire.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    this.setState(stateCopy);
                    break;
                case fire.storage.TaskState.CANCELED:
                    console.log('test')
                    delete stateCopy.uploadFilesObj[fileObjKey];
                    this.setState(stateCopy);
                    break;
                default:
                    console.log('No default');
            }
        }, (error) => {
            alert('Upload Fail');
            // Error handling
            console.log(error);
            var stateCopy = Object.assign({}, this.state);
            this.setState(stateCopy);

        }, () => {
            // Complete handling
            console.log(`Upload #${index} completed`);
            var stateCopy = Object.assign({}, this.state);

            stateCopy.uploadFilesObj[fileObjKey].progressPercent = 100;
            setTimeout(function () {
                delete stateCopy.uploadFilesObj[fileObjKey];
                thisSpecialStrref.setState(stateCopy);
            }, 2000)


            this.CheckUrl(file);

        });


    }
    CheckUrl(file) {

        const { slatlong,user } = this.props
        var originalName = file.name // 01.jpg
        var originalPath = "images/" + originalName; // resized/....^
console.log(originalName)


        var thisSpecialStrref = this;
      
            thisSpecialStrref.strRef.child(originalPath).getDownloadURL().then(function (downloadURL3) {
                thisSpecialStrref.strRef.child(`images/${file.name}`).getMetadata().then((metadata) => {

                    let sendToP = {
                        name: thisSpecialStrref.state.fname,
                        lat: slatlong.lat(),
                        lng: slatlong.lng(),
                        pic: downloadURL3,
                        desc: thisSpecialStrref.state.textnName,
                        namepic: originalName,
                       userUP: user.email
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

    render() {
        const { uploadFilesObj } = this.state
        const { classes,user } = this.props;
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
                        <textarea rows="10" cols="30" disabled={this.fileInput ? false : true} value={this.state.textnName} 
                        onChange={this.handleDescription} type="text" placeholder="เพิ่มข้อมูล" ></textarea><br />
                        <br />
                        <Button variant="contained" color="primary" className="loginBtn2 loginBtn--U" type="submit">
                         Upload</Button>

                         <Button variant="contained" color="secondary" className={classes.button} 
                onClick={(e) => { this.props.btncancel(e) }}>Cancel</Button>
                        </form>
                </div>
            
                {
                    Object.keys(uploadFilesObj).map((key, index) => {
                        const fileObj = uploadFilesObj[key];
                        return (
                            <div key={index}>
                                <progress value={fileObj.progressPercent} max="100"></progress>&nbsp; &nbsp;{fileObj.progressPercent}%
                                                <p>{fileObj.fileName}</p>
                                <br />
                            </div>
                        );
                    })
                }


            </div>
        );
    }
}

UploadForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles, { withTheme: true })(UploadForm);
import React, { Component } from 'react';
import fire from '../firebase/Fire';
import Popup from "reactjs-popup";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.uploadSubmit = this.uploadSubmit.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.CheckUrl = this.CheckUrl.bind(this);
        this.strRef = fire.storage().ref();
    }
    handleChange(e) {
        this.setState({ fname: e.target.value });
    }
    // sendPosition() {
    //     const { slatlong } = this.props
    //     console.log(slatlong.lng())
    //     let sendToP = {
    //         name: this.state.fname,
    //         lat: slatlong.lat(),
    //         lng: slatlong.lng()
    //     }

    //     const databaseRef = fire.database().ref('/Marker');
    //     const MarkerPoint = databaseRef.push({ sendToP })
    //     console.log(MarkerPoint.key)
    //     this.setState({ oopen: false })

    //     // const keyMarker = MarkerPoint.key
    //     // this.setState({ keyMarker: keyMarker })
    //     // console.log(keyMarker)
    // }
    uploadSubmit(event) {
        event.preventDefault();
        // const timestamp = Date.now();
        // console.log(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp));
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
        const { slatlong } = this.props
        var originalName = file.name // 01.jpg
        var originalPath = "images/" + originalName; // resized/....^

   
    
        var thisSpecialStrref = this;
        setTimeout(function () {
        thisSpecialStrref.strRef.child(originalPath).getDownloadURL().then(function (downloadURL3) {
      thisSpecialStrref.strRef.child(`images/${file.name}`).getMetadata().then((metadata) => {

                            // let sendName = {
                            //     UserId: thisSpecialStrref.state.user.email,
                            //     name: "GGFOLDER",
                            //     create: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)
                            //     //  stateCopy: this.state.stateCopy
                            // }
                            // const databaseRefFolder = fire.database().ref(`folder`);
                            // const FolderKeyRef = databaseRefFolder.push({ sendName });
                            // const FolderKeyRef = this.props.FolderKeyRef
                            // console.log(FolderKeyRef)

                            let sendToP = {
                                name: thisSpecialStrref.state.fname,
                                lat: slatlong.lat(),
                                lng: slatlong.lng(),
                                pic: downloadURL3,
                                // FolderKey: FolderKeyRef,
                                // timestamp: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)
                                // //  stateCopy: this.state.stateCopy
                            }



                            //Process save metadata

                            // const databaseRef = fire.database().ref(`images`);
                            // const metadataKeyRef = databaseRef.push({ metadataFile });
                            const databaseRef = fire.database().ref('/Marker');
                            const MarkerPoint = databaseRef.push({ sendToP })
                            thisSpecialStrref.props.btncancel()
                            console.log(MarkerPoint.key)


                            // Delay before delete file from state

                        }).catch((error) => {
                            console.log("URL error 4 : " + error.message);
                        });
                    }).catch((error) => {
                        console.log("URL error 1 : " + error.code);
                    });
                }, 3000);
                }
          


    render() {
        const { uploadFilesObj } = this.props
        const { fname } = this.state
        return (
            <div className="App">
                <div className="loading container wrapper">
                    <label for="กรุณากรอกชื่อที่ต้องการ">Name:</label>
                    <input value={this.state.fname} onChange={this.handleChange} type="text" name="fname" ></input>
                    <form onSubmit={this.uploadSubmit}>
                        <div class="inpc">
                            <input
                                type="file"
                                accept=".jpg, .png, .tiff"
                                
                                ref={input => {
                                    this.fileInput = input;
                                }} />
                            <button className="loginBtn2 loginBtn--U" type="submit">Upload</button>
                        </div>

                    </form>
                    {/* <button onClick={this.sendPosition}>Test get latloong</button><br /> */}
                    {/* <div class="barPro">
                                {
                                    Object.keys(uploadFilesObj).map((key, index) => {
                                        const fileObj = uploadFilesObj[key];
                                        return (
                                            <div key={index}>
                                                <progress value={fileObj.progressPercent} max="100"></progress>&nbsp; &nbsp;{fileObj.progressPercent}%


                                                 <Popup trigger={<button className="button"> <img  className="IconCancel" alt="Icon" /> </button>} modal>
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

                                                <button type="button"><img  className="IconCancel" onClick={() => this.btnPause(key)} alt="Icon" /></button>
                                                <button type="button"><img  className="IconCancel" onClick={() => this.btnPlay(key)} alt="Icon" /></button>
                                                <p>{fileObj.fileName}</p>
                                                <br />
                                            </div>
                                        );
                                    })
                                }
                            </div> */}

                    {/* <p class="sansserif">Register</p>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <br /><br />
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" /><br /><br /><br />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label><br /><br />
                        <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div><br />
                    <button type="submit" onClick={this.registerU} class="loginBtn loginBtn--L">Register</button> */}
                </div>
                <button onClick={(e) => { this.props.btncancel(e) }}>Cancel</button>
            </div>
        );
    }
}

export default Register;
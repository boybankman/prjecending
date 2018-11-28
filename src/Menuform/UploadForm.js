import React, { Component } from 'react';
import fire from '../firebase/Fire';
import Popup from "reactjs-popup";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            fname:''
        }
        this.handleChange = this.handleChange.bind(this);
       
    }
    handleChange(e) {
        this.setState({ fname: e.target.value });
    }
    // getlatlong(){
    //     var _this = this
    //     const oopen = this.props.oopen
    //     const slatlong = this.props.slatlong
    //     console.log(slatlong.lng())
    //     let sendToP = {
    //         name: this.state.fname,
    //         lat: slatlong.lat(),
    //         lng: slatlong.lng()
    //     }

    //     const databaseRef = fire.database().ref('/Marker');
    //     const MarkerPoint = databaseRef.push({ sendToP })
    //     console.log(MarkerPoint)
    //     this.setState({ oopen : false })
    //     // const keyMarker = MarkerPoint.key
    //     // this.setState({ keyMarker: keyMarker })
    //     // console.log(keyMarker)
    // }





    render() {
        const {uploadFilesObj} = this.props
        const {fname} = this.state
        return (
            <div className="App">
                <div className="loading container wrapper">
                <label for="กรุณากรอกชื่อที่ต้องการ">Name:</label>
                <input value={this.state.fname} onChange={this.handleChange} type="text" name="fname" ></input>
                <form onSubmit={this.onSubmit}>
                                <div class="inpc">
                                    <input
                                        type="file"
                                        accept=".jpg, .png, .tiff"
                                        multiple
                                        ref={input => {
                                            this.fileInput = input;
                                        }} />
                                    <button className="loginBtn2 loginBtn--U" type="submit">Upload</button>
                                </div>

                            </form>
                <button onClick={(e) => {this.props.sendPosition(e, fname)}}>Test get latloong</button><br/>
                <div class="barPro">
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
                            </div>
                <button onClick={(e) => {this.props.btncancel(e)}}>Cancel</button>
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

            </div>
        );
    }
}

export default Register;
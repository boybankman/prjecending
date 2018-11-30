import React, { Component } from 'react';
import firebase from '../firebase/Fire';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



  
const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
  });
  

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            open:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.registerU = this.registerU.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
      
    registerU(e) {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            alert('Register Complete');
        }).catch((error) => {
            console.log(error);
          });     
    }
    handleOpen = () => {
        this.setState({ open: true });
      };    
    handleClose = () => {
        this.setState({ open: false });
      };


    
  render() {

    const { classes } = this.props;
    return (
        <div className="App">


             <div className="loading container wrapper">
                     
                      <br />
                          <p class="sansserif">Register</p>
                      <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <br/><br/>
                  <input  value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" /><br/><br/><br/>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label><br/><br/>
                <input  value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div><br/>
              <button type="submit" onClick={this.registerU} class="loginBtn loginBtn--L">Register</button>   
              <br/>
              <Link to="/" >BACK</Link>
                <br /> <br />
                <br /> <br />     
                  </div>
          <div>
      </div>

 
 
    </div>
    
    );
  }
  }
  Register.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles, { withTheme: true })(Register);
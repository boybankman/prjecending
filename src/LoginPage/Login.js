import React, { Component } from 'react';
import firebase from '../firebase/Fire';
import { provider, auth, provider2 } from '../firebase/Fire';
import { Link } from 'react-router-dom';
import Map from '../components/Map'
import Upload from '../UploadPage/Upload'
//sad
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

class Login extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      email: '',
      password: '',
      open: false,
      top: false,
      left: false,
      bottom: false,
      right: false,
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loginE = this.loginE.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  loginE(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).catch((error) => {
      console.log(error);
      alert("incorrect id or password");
    });
  }
  verifyEmail(e) {
    e.preventDefault();
    firebase.auth().currentUser.sendEmailVerification().then((u) => {
      alert("Please Check Your Mail");
    }).catch((error) => {
      console.log(error);
      alert("Error");
    });
  }


  login = () => {
    var that = this;
    const result = auth.signInWithPopup(provider).then(function (result) {
      var user = result.user;
      console.log(user);
      that.setState({ user: user });
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }
  login2 = () => {
    var that = this;
    const result = auth.signInWithPopup(provider2).then(function (result) {
      var user = result.user;
      console.log(user);
      that.setState({ user: user });
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  logout() {
    firebase.auth().signOut();
    this.setState({ user: null });
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  
  renderLoginButon() {
    const { classes } = this.props;

  
    // const fullList = (
    //   <div className={classes.fullList}>
         
        
    //                 {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //                 <br />
    //                 <p>Log in</p>
    //                 <div class="form-group">
    //                     <label for="exampleInputEmail1">Email address</label>
    //                     <br />
    //                     <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" /><br /><br /><br />

    //                     <label for="exampleInputPassword1">Password</label>
    //                     <br />
    //                     <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
    //                     <br />
    //                     <button type="submit" onClick={this.loginE} class="loginBtn--L">Login</button>
    //                     <br />

    //                     <button className="loginBtn loginBtn--facebook" onClick={this.login}>Log in with Facebook</button>
    //                     <button className="loginBtn loginBtn--google" onClick={this.login2}>Log in with Google</button><br /><br />
    //                     <Link to="/Register" >สมัครสมาชิค</Link>
    //                     &nbsp;&nbsp;&nbsp;&nbsp;
    //         <Link to="/Reset" >ลืมรหัสผ่าน</Link>       &nbsp;&nbsp;&nbsp;&nbsp;
          
    //         <br/><br/>
          
         
                   
    //             </div>
        
    //   </div>
    //   );
      const fullList = (
        <div className={classes.fullList}>
  
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <tab /> <p class="sansserif">Log in</p>
          <br /> <br />
          <div class="form-group">
            <br />    <br />
            <label for="exampleInputEmail1">Email address: </label>
  
            <Input
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              id="exampleInputEmail1" aria-describedby="emailHelp"
              placeholder="Enter email" /><br
              className={classes.input}
              inputProps={{ 'aria-label': 'Description', }} />
  
            <label for="exampleInputPassword1">Password: </label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              id="exampleInputEmail1" aria-describedby="emailHelp"
              placeholder="Enter Password" /><br
              className={classes.input}
              inputProps={{ 'aria-label': 'Description', }} />
  
            <Button type="submit" onClick={this.loginE} variant="contained" className={classes.button}>Login</Button>
            <Button onClick={this.login} variant="contained" color="primary" className={classes.button}> Log in with Facebook </Button>
            <Button onClick={this.login2} variant="contained" color="secondary" className={classes.button}>Log in with Google</Button>
            <br /><br /><Link to="/Register" >Regis</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/Reset" >Reset</Link>       &nbsp;&nbsp;&nbsp;&nbsp;
                      <br /><br />
          </div>
        </div>
      );
      if (this.state.user) {
        return (
          <div>
            {/* <img src={logo} className="App-logo" alt="logo" />   */}
            <div class="form-group">
              <br />
              <Button variant="contained" color="secondary" type="submit" onClick={this.logout}>logout</Button>
              <br />
              {/* <Link to="/Upload" >Go to Upload</Link>  */}
  
            </div>
            <div class="form-group">
            </div><br />
          </div>
  
        )
      }

    if (this.state.user) {
      return (
        <div>
          {/* <img src={logo} className="App-logo" alt="logo" />   */}
          <div class="form-group">
            <br />
            <Button variant="contained" color="secondary" type="submit" onClick={this.logout}>logout</Button>
            <br />
            {/* <Link to="/Upload" >Go to Upload</Link>  */}

          </div>
          <div class="form-group">
          </div><br />
        </div>

      )
    } else {
      return (

        <div>
         
        <Button variant="contained" color="secondary" onClick={this.toggleDrawer('top', true)}>LOGIN</Button>
         <br />
         <br />
        <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
          <div
            tabIndex={0}
            role="button"
            // onClick={this.toggleDrawer('top', false)}
            // onKeyDown={this.toggleDrawer('top', false)}
          >
            {fullList}
          </div>
        </Drawer>
        
      </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderLoginButon()}

      </div>

    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
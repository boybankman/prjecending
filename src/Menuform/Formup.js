import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Map from '../components/Map'
import Button from '@material-ui/core/Button';
import fire from '../firebase/Fire';
import Login from '../LoginPage/Login'
import Input from '@material-ui/core/Input';
import { Link } from 'react-router-dom';
import firebase from '../firebase/Fire';
import { provider, auth, provider2 } from '../firebase/Fire';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';



const drawerWidth = 240;


const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
  });
const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
      },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

    //////////////////Start///////////////////////////////////
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
      },
    ///////////////////N//////////////////////////////////////


});

class Formup extends React.Component {

    constructor() {
        super();
        this.state = {

            email: '',
            password: '',

        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginE = this.loginE.bind(this);
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

    loginE(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
            alert("incorrect id or password");
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
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    btnmarker = () => {
        var _this = this
        // window.map = new window.google.maps.Map(document.getElementById("map"), {
        //     center: this.state.center,
        //     zoom: this.state.zoom,

        //     //clickableIcons: false,
        //     // mapTypeControl: false,
        //     // streetViewControl: false,
        //     // fullscreenControl: false,
        //     mapTypeId: 'satellite',
        // })
        // this.setState({
        //     isLoad: true
        // })

        window.google.maps.event.addListener(window.map, 'click', function (event) {
            var marker = new window.google.maps.Marker({
                map: window.map,
                position: event.latLng,
                clickable: true,
                draggable: true,

            })
            console.log("This last lat", event.latLng.lat())
            console.log("This last lng", event.latLng.lng())
            _this.sendPosition(event.latLng)
            window.google.maps.event.clearListeners(window.map, 'click')
        })

    }
    sendPosition(latLng) {
        let sendToP = {
            lat: latLng.lat(),
            lng: latLng.lng()
        }

        const databaseRef = fire.database().ref('/Marker');
        const MarkerPoint = databaseRef.push({ sendToP })
        console.log(MarkerPoint)
        const keyMarker = MarkerPoint.key
        this.setState({ keyMarker: keyMarker })
        console.log(keyMarker)
    }

    getModalStyle = () => {
        const top = 50;
        const left = 50;
    
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
      handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    render() {
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
        const { classes, theme, open } = this.props;

        var _this = this
        if (this.state.user) {
            return (
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.props.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography className={classes.typography} variant="h6" color="inherit" noWrap>
                            BKB Upload Image System
            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={this.props.open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.props.handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <div className={classes.fullList}>

                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       <p className="sansserif">{this.state.user.email}</p>
                            <br />

                        </div>

                        {this.props.keym.key}
                        <br />
                        {this.props.keym.lat}
                        <br />
                        {this.props.keym.lng}
                        <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={this.getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
          value={this.state.info}
          onChange={this.handleChange}
          margin="normal"
        />
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <withStyles />
          </div>
        </Modal>
                        <Divider />
                        <List>
                            <Button variant="contained" color="secondary" type="submit" onClick={this.logout}>logout</Button>
                        </List>
                    </Drawer>
                    <main
                        className={classNames(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes} />
                        <Login />
                        <Map><Button variant="contained" onClick={this.btnmarker}>test database</Button></Map>
                    </main>
                </div >

            )
        } else {


            return (
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.props.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography className={classes.typography} variant="h6" color="inherit" noWrap>
                               BKB Upload Image System 
            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={this.props.open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.props.handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <div className={classes.fullList}>

                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <p className="sansserif">Log in</p>
                            <br /> <br />
                            <div className="form-group">
                                <br />    <br />
                                <label >Email address: </label>

                                <TextField
                                    value={this.state.email}
                                    onChange={_this.handleChange}
                                    type="email"
                                    name="email"
                                    id="exampleInputEmail2" aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    className={classes.input}
                                />

                                <label>Password: </label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                               <TextField
                                    value={this.state.password}
                                    onChange={_this.handleChange}
                                    type="password"
                                    name="password"
                                    id="exampleInputEmail1" aria-describedby="emailHelp"
                                    placeholder="Enter Password"
                                    className={classes.input}
                                />

                                <Button type="submit" onClick={this.loginE} variant="contained" className={classes.button}>Login</Button>
                                <Button onClick={this.login} variant="contained" color="primary" className={classes.button}> Log in with Facebook </Button>
                                <Button onClick={this.login2} variant="contained" color="secondary" className={classes.button}>Log in with Google</Button>
                                <br /><br /><Link to="/Register" >Regis</Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/Reset" >Reset</Link>       &nbsp;&nbsp;&nbsp;&nbsp;
                      <br /><br />
                            </div>
                        </div>

                        {this.props.keym.key}
                        <br />
                        {this.props.keym.lat}
                        <br />
                        {this.props.keym.lng}

                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <main
                        className={classNames(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes} />
                        <Login />
                        <Map><Button variant="contained" onClick={this.btnmarker}>test database</Button></Map>
                    </main>
                </div >
            );
        }
    }
}
Formup.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Formup);

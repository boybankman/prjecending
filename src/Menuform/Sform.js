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
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import UploadForm from './UploadForm'
import firebase from '../firebase/Fire';
import { provider, auth, provider2 } from '../firebase/Fire';




const drawerWidth = 240;

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }


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
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
      },
    
    
});
class PersistentDrawerLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            user: null,
            email: '',
            password: '',
            emailregis: '',
            passwordregis: '',
            uploadFilesObj: {},
            drawerPage: 'homePage',
            isWaitingForUserResult: true,
            selectedMarker: null
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.loginE = this.loginE.bind(this);
        this.btnmarker = this.btnmarker.bind(this);

    }
    componentWillMount() {
        auth.onAuthStateChanged((result) => {
            var user
            if (result) {
                user = result
            }
            this.setState({ isWaitingForUserResult: false, user })
        });
        this.getMarker()
    }
    getMarker() {
        var self = this
        const dataref = firebase.database().ref('Marker')
        dataref.on('value', (snapshot) => {
            let marks = [];

            snapshot.forEach(function (childSnapshot) {
                // marks.push({
                //     key: childSnapshot.key,
                //     name: childSnapshot.val().sendToP.name,
                //     lat: childSnapshot.val().sendToP.lat,
                //     lng: childSnapshot.val().sendToP.lng,
                //     pic: childSnapshot.val().sendToP.pic

                // })
                var marker = new window.google.maps.Marker({
                    map: window.map,
                    position: { lat: childSnapshot.val().sendToP.lat, lng: childSnapshot.val().sendToP.lng },
                    clickable: true,
                    draggable: false,
                    pic: childSnapshot.val().sendToP.pic,
                    name: childSnapshot.val().sendToP.name,
                    key: childSnapshot.key,
                })
                self.addMarkerListener(marker)
            })
            //this.setState({ marks });
            console.log(marks)
            // marks.map((m) => {
            //     var marker = new window.google.maps.Marker({
            //         map: window.map,
            //         position: { lat: m.lat, lng: m.lng },
            //         clickable: true,
            //         draggable: false,
            //     })
            //     self.addMarkerListener(marker)
            // })
        })
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
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    handleModalOpen = () => {
        this.setState({ open: true });
      };
    handleModalClose = () => {
        this.setState({ open: false });
      };
    btnmarker = () => {

        var self = this
        window.google.maps.event.addListener(window.map, 'click', function (event) {
            var marker = new window.google.maps.Marker({
                map: window.map,
                position: event.latLng,
                clickable: true,
                draggable: true,

            })
            console.log("This last lat", event.latLng.lat())
            console.log("This last lng", event.latLng.lng())
            self.setState({ slatlong: event.latLng, open: true, drawerPage: 'upload' })
            window.google.maps.event.clearListeners(window.map, 'click')
            self.addMarkerListener(marker)
            self.setState({ open: true })
        })
    };
    addMarkerListener = (marker) => {
        var self = this
        window.google.maps.event.addListener(marker, 'click', function (event) {
            self.setSelectedMarker(marker)
            self.setState({ open: true, drawerPage: 'information' })
        })
    }
    setSelectedMarker = (marker) => {
        this.setState({ selectedMarker: marker })
    }
    renderDrawerPage = () => {
        const { drawerPage, selectedMarker, } = this.state
        const {classes} = this.props
        switch (drawerPage) {
            case 'upload':
                return (
                    <UploadForm
                        btncancel={this.btncancel}
                    // slatlong={slatlong}
                    />
                )
            case 'homePage': return (

                <p className="sansserif">{this.state.user.email}</p>
            )
            case 'information': return (
                <List>
                    {selectedMarker.getPosition().lat()}
                    {selectedMarker.key}

                    <div className="Dmodal">
                        <img src={selectedMarker.pic} width='250' height='250' alt="pic64*64" />

                        <Button onClick={this.handleOpen}>Information</Button>
                        <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleModalClose}
                        >
                        <div style={getModalStyle()} className={classes.paper}>
                            <Typography variant="h6" id="modal-title">
                            Text in a modal
                            </Typography>
                            <Typography variant="subtitle1" id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                            < PersistentDrawerLeft/>
                        </div>
                        </Modal>
                        


                    </div>


                </List>
            )
            default: return;
        }
    }
    render() {
        const { classes, theme } = this.props;
        const { open, user, isWaitingForUserResult } = this.state;

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
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Persistent drawer
            </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        {user ? <Button variant="contained" color="secondary" type="submit" onClick={this.logout}>logout</Button> : null}
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>

                    </div>
                    <Divider />
                    {!isWaitingForUserResult ?

                        user ?
                            this.renderDrawerPage()
                            :
                            < div className="form-group">
                                <br />    <br />
                                <label >Email address: </label>

                                <TextField
                                    value={this.state.email}
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
                                    type="password"
                                    name="password"
                                    id="exampleInputEmail1" aria-describedby="emailHelp"
                                    placeholder="Enter Password"
                                    className={classes.input}
                                />
                                <br /> <br />

                                <Button type="submit" onClick={this.loginE} variant="contained" className={classes.button}>Login</Button>
                                <Button onClick={this.login} variant="contained" color="primary" className={classes.button}> Log in with Facebook </Button>
                                <Button onClick={this.login2} variant="contained" color="secondary" className={classes.button}>Log in with Google</Button>
                                <br /><br />

                                <Button onClick={this.handleOpen}>Register</Button>
                                {/* ************************************************************************************************** */}
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={false}
                                    onClose={this.handleClose} s
                                >
                                    <div style={getModalStyle()} className={classes.paper}>

                                        <p class="headRegis">
                                            <Typography variant="h4" gutterBottom> ****** Register ****** </Typography>
                                        </p>
                                        <div class="form-group">

                                            <Typography variant="h6" gutterBottom>Email addresssda</Typography>

                                            <TextField value={this.state.email2} onChange={this.handleChange} type="email" name="email2" class="form-control"
                                                id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

                                        </div>
                                        <div class="form-group">
                                            <Typography variant="h6" gutterBottom>Password</Typography>
                                            <TextField value={this.state.password2} onChange={this.handleChange} type="password" name="password2" class="form-control" id="exampleInputPassword1" placeholder="Password" />

                                        </div><br />
                                        <Button type="submit" onClick={this.registerU} >Register</Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={this.handleClose}>Back</Button>
                                        <br /> <br />
                                    </div></Modal>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button>Reset</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;
          <br /><br />
                            </div>

                        : 'Loading'}


                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <Map>
                        <Button variant="contained" disabled = {user ? false:true} onClick={this.btnmarker}>Add marker</Button>
                    </Map>
                </main>
            </div >
        );
    }
}

PersistentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
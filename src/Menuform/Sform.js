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
import red from '@material-ui/core/colors/red';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import ListMarker from '../Menuform/ListMarker';
import LockIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';




const drawerWidth = 300;

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
        width: theme.spacing.unit * 100,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    paperRegister: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    card: {
        maxWidth: 800,
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
        //
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
     demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },


});
class PersistentDrawerLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            modalOpen: false,
            user: null,
            email: '',
            password: '',
            emailregis: '',
            passwordregis: '',
            passwordregis2: '',
            drawerPage: 'homePage',
            isWaitingForUserResult: true,
            selectedMarker: null,
            center: { lat: 13.7648, lng: 100.5381 },
            marcus: [],
            isAddMarkerClickAble: false
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.loginE = this.loginE.bind(this);
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
                marks.push({
                    key: childSnapshot.key,
                    name: childSnapshot.val().sendToP.name,
                    lat: childSnapshot.val().sendToP.lat,
                    lng: childSnapshot.val().sendToP.lng,
                    pic: childSnapshot.val().sendToP.pic,
                    desc: childSnapshot.val().sendToP.desc,
                    namepic: childSnapshot.val().sendToP.namepic,
                    source: 'server',
                    userUP: childSnapshot.val().sendToP.userUP,
                })
                // var marker = new window.google.maps.Marker({
                //     map: window.map,
                //     position: { lat: childSnapshot.val().sendToP.lat, lng: childSnapshot.val().sendToP.lng },
                //     clickable: true,
                //     draggable: false,
                //     pic: childSnapshot.val().sendToP.pic,
                //     name: childSnapshot.val().sendToP.name,
                //     key: childSnapshot.key,
                //     desc: childSnapshot.val().sendToP.desc
                // })
                // self.addMarkerListener(marker)
            })


            const marcus = marks.map((m) => {
                var marker = new window.google.maps.Marker({
                    //map: window.map,
                    position: { lat: m.lat, lng: m.lng },
                    clickable: true,
                    draggable: false,
                    pic: m.pic,
                    name: m.name,
                    key: m.key,
                    desc: m.desc,
                    namepic: m.namepic,
                    userUP: m.userUP
                })
                self.addMarkerListener(marker)
                return marker
            })
            this.setState({ marks, marcus });
            var markerCluster = new window.MarkerClusterer(window.map, marcus,
                { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' })
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
        this.setState({ open: false,drawerPage: 'homePage' });
    };
    handleModalOpen = () => {
        this.setState({ modalOpen: true });
    };
    handleModalClose = () => {
        this.setState({ modalOpen: false });
    };
    handleOpenResgister = () => {
        this.setState({ registerOpen: true });
    }
    handleCloseResgister = () => {
        this.setState({ registerOpen: false, emailregis: null, passwordregis: null, passwordregis2: null, });
    };
    handleOpenReset = () => {
        this.setState({ resetOpen: true })
    }
    handleCloseReset = () => {
        this.setState({ resetOpen: false })
    }
    btncancel = () => {
        const { selectedMarker } = this.state
        selectedMarker.setMap(null)
        this.setState({ open: false ,isAddMarkerClickAble:false})
    }
    closeDrawerafterup = () => {
        this.setState({ open: false ,isAddMarkerClickAble:false})
    }
    backToMenu = () => {
        var self = this
        self.setState({ drawerPage: 'homePage' })

    }
    registerU = (e) => {
        e.preventDefault()
        if (this.state.passwordregis == this.state.passwordregis2) {
            firebase.auth().createUserWithEmailAndPassword(this.state.emailregis, this.state.passwordregis).then((u) => {
                alert('Success!!');
                this.setState({ emailregis: null, passwordregis: null, passwordregis2: null, registerOpen: false })
            }).catch((error) => {
                alert('Please correctly your information')
            })
        } else {
            alert('The Paaword is not match');
        }
    }
    resetPassword = () => {
        firebase.auth().sendPasswordResetEmail(this.state.emailAddress).then((e) => {
            alert('Please Check in Email')
        })
    }
    btnmarker = () => {

        var self = this
        window.google.maps.event.addListener(window.map, 'click', function (event) {
            var marker = new window.google.maps.Marker({
                map: window.map,
                position: event.latLng,
                clickable: true,
                draggable: true,
                source: 'local',
            })
            self.addMarkerListener(marker)
            self.setSelectedMarker(marker)
            self.setState({ slatlong: event.latLng, open: true, drawerPage: 'information', isAddMarkerClickAble: true })
            window.google.maps.event.clearListeners(window.map, 'click')
        })
    };
    addMarkerListener = (marker) => {
        var self = this
        var infowindow = new window.google.maps.InfoWindow({
            content: `${marker.name}<br/><img src=${marker.pic} width=100 height=100/>`
        })
        window.google.maps.event.addListener(marker, 'click', function (event) {
            self.setSelectedMarker(marker)
            infowindow.open(marker.get('map'), marker);
            self.setState({ open: true, drawerPage: 'information' })
        })
    }
    setSelectedMarker = (marker) => {
        this.resetSelectedMarker()
        this.setState({ selectedMarker: marker })
    }
    resetSelectedMarker = () => {
        const { selectedMarker } = this.state
        if (selectedMarker) {
            console.log('ieie')
        }
    }
    gotoMarker = (m) => {
        console.log("this is a ",m.position.lat())
        const bounds = new window.google.maps.LatLngBounds
        bounds.extend({ lat: m.position.lat(), lng: m.position.lng() })
        window.map.fitBounds(bounds)
    }
    removeMarker = (m) => {

        m.setMap(null);
        (console.log(m.namepic))
        const storageRef = firebase.storage().ref(`images/${m.namepic}`);
        storageRef.delete().then(() => {
            console.log('OK Delete')
        }).catch((error) => {
            console.log("Delete pic error : ", error.message);
        });
        const databaseRef = firebase.database().ref('/Marker')
        databaseRef.child(m.key).remove()
            .then(() => {
                console.log("Delete metada success");

            })
            .catch((error) => {
                console.log("Delete data error : ", error.message);
            });


    }

    renderDrawerPage = () => {
        const { drawerPage, selectedMarker, slatlong, marks,user } = this.state
        const { classes, keym } = this.props
        switch (drawerPage) {
            case 'information':
                return (
                    selectedMarker.source === 'local'
                        ?
                        <UploadForm
                        closeDrawerafterup={this.closeDrawerafterup}
                            user={user}
                            btncancel={this.btncancel}
                            slatlong={slatlong}
                            drawerPage={drawerPage}
                        />
                        :
                        <List>
                            
                            <u>Name</u>: {selectedMarker.name}<br />
                            <u>Lat</u>: {selectedMarker.getPosition().lat()}<br />
                            <u>Lng</u>: {selectedMarker.getPosition().lng()}<br />
                            <u>Descriptions</u>: {selectedMarker.desc}<br /><br />
                            {/* {selectedMarker.key}<br/> */}


                            <div className="Dmodal">
                                <img src={selectedMarker.pic} width='250' height='250' alt="pic64*64" /><br /><br />

                                <Button variant="contained" color="primary" onClick={this.handleModalOpen}>Information</Button>
                                <Modal

                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.modalOpen}
                                    onClose={this.handleModalClose}
                                >
                                    <div style={getModalStyle()} className={classes.paper}>

                                        <CardHeader

                                            action={
                                                <IconButton>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title="Shrimp and Chorizo Paella"
                                            subheader="September 14, 2016"
                                        />

                                        <CardMedia
                                            className={classes.media}
                                            image={selectedMarker.pic}

                                        />
                                        <CardContent>
                                            <Typography component="p">
                                                Description : {selectedMarker.desc}
                                            </Typography>
                                        </CardContent>

                                    </div>
                                </Modal>
                                <br /> <br />
                                <Button variant="contained" color="secondary" className={classes.button} onClick={this.backToMenu}>
                                    Back
                                </Button>

                            </div>


                        </List>
                )
            case 'homePage': return (
                <div>

                    <br />

                    <p className="sansserif">{this.state.user.email}</p>
                    {<Button variant="contained" color="secondary" type="submit" onClick={this.logout}>logout</Button>}      <br />  <br />
                    <Divider /><br />
                    <ListItem>
                    <ListMarker
                        marcus={this.state.marcus}
                        gotoMarker={this.gotoMarker}
                        removeMarker={this.removeMarker}
                    />
                    </ListItem>

                    
                </div>
            )
            default: return;
        }
    }
    render() {
        const { classes, theme } = this.props;
        const { open, user, isWaitingForUserResult, isAddMarkerClickAble } = this.state;

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
                        <Typography variant="h6" color="inherit" noWrap> Welcome! </Typography>
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

                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>

                    </div><br />
                    {/* <Typography variant="h3" color="inherit"> Login </Typography><br />
                    {user ? <Button variant="contained" color="secondary" type="submit" onClick={this.logout}>logout</Button> : null}
                       <br />     */}



                    <Divider />
                    {!isWaitingForUserResult ?

                        user ?
                            this.renderDrawerPage()
                            :
                            < div className="form-group">
                                <br />
                                <Typography variant="h3" color="inherit"> Login </Typography><br />
                                {user ? <Button variant="contained" color="secondary" type="submit" onClick={this.logout}>logout</Button> : null}
                                <br />

                                <Typography variant="h6" color="inherit"> Email address: </Typography>

                                <TextField
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    type="email"
                                    name="email"
                                    id="exampleInputEmail2" aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    className={classes.input}
                                />

                                <br /> <br />
                                <Typography variant="h6" color="inherit"> Password: </Typography>

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

                                <Button type="submit" onClick={this.loginE} variant="contained" className={classes.button}>Login</Button><br /><br />
                                <Button onClick={this.login} variant="contained" color="primary" className={classes.button}> Log in with Facebook </Button><br /><br />
                                <Button onClick={this.login2} variant="contained" color="secondary" className={classes.button}>Log in with Google</Button><br /><br />
                                <br /><br />

                                <Button onClick={this.handleOpenResgister} variant="outlined" >Register</Button>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.registerOpen}
                                    onClose={this.handleCloseRegister}
                                >

                                    <div style={getModalStyle()} className={classes.paperRegister}>

                                        <p class="headRegis">
                                            <Typography variant="h4" gutterBottom> ****** Register ****** </Typography>
                                        </p>
                                        <div class="form-group">

                                            <Typography variant="h6" gutterBottom>Email address</Typography>

                                            <TextField value={this.state.emailregis} onChange={this.handleChange} type="email" name="emailregis" class="form-control"
                                                id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

                                        </div>
                                        <div class="form-group">
                                            <Typography variant="h6" gutterBottom>Password</Typography>
                                            <TextField value={this.state.passwordregis} onChange={this.handleChange} type="password" name="passwordregis" class="form-control" id="exampleInputPassword1" placeholder="Password" />

                                            <div class="form-group">
                                                <Typography variant="h6" gutterBottom>Confirm Password</Typography>
                                                <TextField value={this.state.passwordregis2} onChange={this.handleChange} type="password" name="passwordregis2"
                                                    class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                            </div>
                                        </div><br />
                                        <Button type="submit" onClick={this.registerU} variant="outlined" >Register</Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={this.handleCloseResgister} variant="outlined" >Back</Button>
                                        <br /> <br />

                                    </div></Modal>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={this.handleOpenReset} variant="outlined" >Reset</Button>
                                {/* ******************************************************************************************************************** */}
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.resetOpen}
                                    onClose={this.handleCloseReset}
                                >
                                    <div style={getModalStyle()} className={classes.paperRegister}>

                                        <p class="headRegis">
                                            <Typography variant="h4" gutterBottom> ****** Reset  ****** </Typography>
                                        </p>
                                        <div class="form-group">

                                            <Typography variant="h6" gutterBottom>Email addresssd</Typography>

                                            <TextField value={this.state.emailAddress} onChange={this.handleChange} type="email" name="emailAddress" class="form-control"
                                                id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

                                        </div> <br /> <br />
                                        <Button type="submit" onClick={this.resetPassword} variant="outlined" >Send</Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={this.handleCloseReset} variant="outlined" >Back</Button>
                                        <br /> <br />

                                    </div></Modal>
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
                    {/* <div className={classes.drawerHeader} /> */}
                    <Map    {...this.state}>


                        <Button variant="contained" disabled={user ? isAddMarkerClickAble : true} onClick={this.btnmarker} >Add marker</Button>
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
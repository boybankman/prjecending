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
import Map from '../components/Map'
import Button from '@material-ui/core/Button';
import fire from '../firebase/Fire';
import Login from '../LoginPage/Login'
import firebase from '../firebase/Fire';
import { provider, auth, provider2 } from '../firebase/Fire';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import classnames from 'classnames';


const drawerWidth = 240;

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});
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

    card: {
        maxWidth: 400,
    },

    grow: {
        flexGrow: 1,
    },
    avatar: {
        backgroundColor: red[500],
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
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

});

class Formup extends React.Component {

    constructor() {
        super();
        this.state = {

            oopen: false,

            email: '',
            password: '',
            email2: '',
            password2: '',
            uploadFilesObj: {}


        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginE = this.loginE.bind(this);
        this.btnmarker = this.btnmarker.bind(this);
        this.btncancel = this.btncancel.bind(this);
        this.sendPosition = this.sendPosition.bind(this);
        this.registerU = this.registerU.bind(this);
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }
    // componentWillMount() {
    //     this.renderSearch()
    //   }

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
    handleChange2(e) {
        this.setState({ [e.target.name2]: e.target.value2 });
    }

    btnmarker() {
        var _this = this
        window.google.maps.event.addListener(window.map, 'click', function (event) {
            var marker = new window.google.maps.Marker({
                map: window.map,
                position: event.latLng,
                clickable: true,
                draggable: true,

            })
            console.log("This last lat", event.latLng.lat())
            console.log("This last lng", event.latLng.lng())
            _this.setState({ slatlong: event.latLng })
            window.google.maps.event.clearListeners(window.map, 'click')
            _this.setState({ oopen: true });
        })

    }
    sendPosition(e, fname) {
        const { slatlong } = this.state
        console.log(slatlong.lng())
        let sendToP = {
            name: fname,
            lat: slatlong.lat(),
            lng: slatlong.lng()
        }

        const databaseRef = fire.database().ref('/Marker');
        const MarkerPoint = databaseRef.push({ sendToP })
        console.log(MarkerPoint)
        this.setState({ oopen: false })


    }
    btncancel() {
        this.setState({ oopen: false })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    registerU(e) {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email2, this.state.password2).then((u) => {
            alert('Register Complete');
        }).catch((error) => {
            console.log(error);
        });
    }
    /////////////////////////////////////////////////////////////////////////
    // renderSearch = () =>{

    //         var _this = this
    //         var input = document.getElementById('pac-input');
    //         var searchBox = new window.google.maps.places.SearchBox(input);
    //         this.map.controls[this.google.maps.ControlPosition.TOP_LEFT].push(input);

    //         // Bias the SearchBox results towards current map's viewport.
    //         this.map.addListener('bounds_changed', function() {
    //          searchBox.sewtBounds(this.map.getBounds());
    //         });

    //         searchBox.addListener('places_changed', function() {
    //             var places = searchBox.getPlaces();
    //             if (places.length == 0) {
    //               return;
    //             }
    //             var bounds = new window.google.maps.LatLngBounds();
    //            places.forEach(function(place) {
    //               if (!place.geometry) {
    //                 console.log("Returned place contains no geometry");
    //                 return;
    //               }
    //               if (place.geometry.viewport) {
    //                 // Only geocodes have viewport.
    //                 bounds.union(place.geometry.viewport);
    //               } else {
    //                 bounds.extend(place.geometry.location);
    //               }
    //             });
    //             _this.map.fitBounds(bounds);
    //           });
    //     }
    //////////////////////////////////////////////////////////////////////////
    render() {
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
        const { classes, theme, open } = this.props;
        const { user, oopen, slatlong, uploadFilesObj } = this.state;
        var _this = this
        if (this.state.user) {
            if (this.state.oopen) {
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
                </Typography>   <div className={classes.grow} />
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        id="pac-input"
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                    />
                                </div>
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            className={classes.drawer}
                            variant="persistent"
                            anchor="left"
                            open={this.state.oopen}
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

                            <Button variant="contained" color="secondary" type="submit" onClick={this.logout}>upload</Button>
                            <Divider />
                            <List>
                                {this.state.slatlong.lng()}
                                {this.state.slatlong.lat()}
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
            }
            var { keym } = this.props
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
            </Typography>   <div className={classes.grow} />
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    id="pac-input"
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
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


                        <Button variant="contained" color="secondary" type="submit" onClick={this.logout}>logout</Button>
                        <Divider />
                        <List>
                            {this.props.keym.key}
                            <br />
                            {this.props.keym.name}
                            <br />
                            {this.props.keym.lat}
                            <br />
                            {this.props.keym.lng}
                        </List>
                        <Divider />

                        <div>
                            <Button onClick={(e) => { this.handleOpen(e) }}>Open Modal</Button>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                                <div style={getModalStyle()} className={classes.paper}>
                        {/* <img src={keym.pic}/> */}
                        <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
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
          image={keym.pic}
          title="Paella dish"
        />
        <div>
            <img src={keym.pic} width = "100%" height = "100%" />
        </div>
        <CardContent>
          <Typography component="p">
            คำอธิบาย
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>หัวข้อ:</Typography>
            <Typography paragraph>
              คำอธิบาย
            </Typography>
            
          </CardContent>
        </Collapse>
      </Card>

                                </div>
                            </Modal>
                        </div>
                        {/* ///////////////////////////////////////////////////////////// */}
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
                            <div className={classes.grow} />
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    id="pac-input"
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>

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

                            <Typography variant="h4" gutterBottom> Login </Typography>
                            {/* <p className="sansserif">Log in</p> */}
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
                                    open={this.state.open}
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


                        </div>

                        <Divider />
                        {this.props.keym.key}
                        <br />
                        Lat: {this.props.keym.lat}
                        <br />
                        Lng: {this.props.keym.lng}

                        {/* <Divider />   */}
                        {/* <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List> */}
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

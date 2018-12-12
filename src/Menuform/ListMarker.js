import React, { Component } from 'react';
import firebase from '../firebase/Fire';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import sendIcon from '../sendIcon.png'
import trash from '../trash.png'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Location from '@material-ui/icons/LocationOn';
import Popup from "reactjs-popup";
import Grid from '@material-ui/core/Grid';
const styles = theme => ({

    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});



class ListMarker extends Component {
    constructor(props) {
        super(props);
        this.state = { openDialog: false }
    }
    handleDialogClose = () => {
        this.setState({ openDialog: false })
        document.addEventListener("keydown", this.escFunction, false);
        console.log(this.state.openDialog)
    }
    handleClickOpen = () => {
        this.setState({ openDialog: true });
    };

    //   handleClose = () => {

    //     this.setState({ openDialog: false });
    //   };

    render() {
        const { classes, showFiltermark, user } = this.props;
        return (
            <List
                className={classes.root}>
                {showFiltermark.map(marker => (
                    <ListItem
                        key={marker.key}
                        button
                        onClick={() => this.props.gotoMarker(marker)}
                    >


                        <Grid item xs zeroMinWidth >
                            <Typography noWrap><ListItemText primary={marker.name} /></Typography>
                        </Grid>


                        <ListItemSecondaryAction>
                            <IconButton aria-label="Location">
                                <Location
                                    onClick={() => this.props.gotoMarker(marker)}
                                />
                            </IconButton>
                            {user.email === marker.userUP ?

                                <IconButton aria-label="Delete">

                                    <DeleteForeverIcon

                                        onClick={() => this.props.handleOpenDel(marker)}
                                    />

                                </IconButton>
                                :
                                null
                            }

                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    }
}

ListMarker.propTypes = {
    classes: PropTypes.object.isRequired,
};


// export default ListMarker;

export default withStyles(styles, { withTheme: true })(ListMarker);
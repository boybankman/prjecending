import React, { Component } from 'react';
import firebase from '../firebase/Fire';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import sendIcon from '../sendIcon.png'
import trash from '../trash.png'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Location from '@material-ui/icons/LocationOn';

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
        this.state = {}

    }
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
                        <ListItemText primary={marker.name} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Location">
                                <Location
                                    onClick={() => this.props.gotoMarker(marker)}
                                />
                            </IconButton>
                            {user.email === marker.userUP ?
                                <IconButton aria-label="Delete">
                                    <DeleteForeverIcon
                                        onClick={() => this.props.removeMarker(marker)}
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
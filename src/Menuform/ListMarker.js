import React, { Component } from 'react';
import firebase from '../firebase/Fire';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import sendIcon from '../sendIcon.png'
import trash from '../trash.png'

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
});

class ListMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }
    render() {
        const { classes, marcus } = this.props;
        let showMarks = marcus.map((m) => {

            return (

                <tr >

                    <Typography variant="h6" gutterBottom>{m.name}</Typography>

                    <th><Button color="secondary" className={classes.button} onClick={() => { this.props.gotoMarker(m) }}>
                        <img src={sendIcon} width="30px" height="30px" />
                    </Button></th>

                    <th><Button color="secondary" className={classes.button} onClick={() => { this.props.removeMarker(m) }}>
                        <img src={trash} width="30px" height="30px" />
                    </Button></th>





                </tr>
            )
        });
        return (
            <div className="App">
                {showMarks}
            </div>
        );
    }
}

ListMarker.propTypes = {
    classes: PropTypes.object.isRequired,
};


// export default ListMarker;

export default withStyles(styles, { withTheme: true })(ListMarker);
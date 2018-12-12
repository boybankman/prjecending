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
        this.state = {openDialog: false}
    }
    handleDialogClose = () => {
        this.setState({ openDialog : false})
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
        const { classes, marcus} = this.props;

       
        let showMarks = marcus.map((m) => {
            return (
                <tr >

                    <Typography variant="h6" gutterBottom>{m.name}</Typography>

                    <th><Button color="secondary" className={classes.button} onClick={() => { this.props.gotoMarker(m) }}>
                        <img src={sendIcon} width="30px" height="30px" />
                    </Button></th>

                    <th><Button color="secondary" className={classes.button} onClick={this.handleClickOpen}>
                  
                    <Dialog
                //   fullScreen={fullScreen}
                  open={this.state.openDialog}
                  onClose={this.handleDialogClose}
                  aria-labelledby="responsive-dialog-title"
                    >
                     <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Do want to delete?
                        </DialogContentText>
                    </DialogContent>
                 
                       
                    <DialogActions>
                    <Button onClick={this.handleDialogClose}  color="primary" >
                        {/* <Button  onClick={() => { this.props.removeMarker(m) }} color="primary"> */}
                        No
                        </Button>
                        {/* <Button onClick={this.handleClose}  color="primary" > */}
                        <Button  onClick={() => { this.props.removeMarker(m) }} color="primary"> 
                        Yes
                        </Button>
                    </DialogActions>
                  
                    </Dialog>
                   
                   
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
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import waterScale from './waterScale.png'
const styles = theme => ({

    fab: {
        margin: theme.spacing.unit,
    }
})
function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

class ShowDetail extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props
        if(this.state.open) {
           return( <div>
                     <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle id="draggable-dialog-title">Tip</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                      ระดับของสีในแมพเป็นการแสดงพื้นที่ที่มีความเหมาะสมสำหรับการเลือกขุดเจาะบ่อน้ำบาดาล วัดจาก..... มาคำนวณหาความเหมาะสม
            </DialogContentText>
                    <img src={waterScale} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
            </Button>
                    </DialogActions>
                </Dialog>
                </div>
           )
        }
        return (
      
                <Fab color="primary" size="small" aria-label="Add" className={classes.fab} onClick={() => { this.handleClickOpen() }}  >
                    <HelpOutline />
                </Fab>
         
        );
    }
}
ShowDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(ShowDetail);
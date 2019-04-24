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
import waterScale from './scaleWater.png'
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({

    fab: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
})
function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

class ShowDetail extends React.Component {


    handleClickOpen = () => {
        this.setState({ openDetai1: true });
    };

    handleClose = () => {
        this.setState({ openDetai1: false });
    };

    render() {
        const { classes } = this.props
        return (
            <div>
         
                <Dialog
                    open={this.props.openDetai1}
                    onClose={this.props.handleDialogClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle id="draggable-dialog-title">Tip</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ระดับของสีในแผนที่เป็นการแสดงพื้นที่ที่มีความเหมาะสมสำหรับการเลือกขุดเจาะบ่อน้ำบาดาล วัดจาก ชนิดของชั้นหินใต้น้ำ(Hydrogeological Unit) ,หน่วยทางธรณีวิทยา(Geological Unit) 
                            ,อัตตราการซึมของน้ำลงสู่ชั้นน้ำบาดาล ,ระดับน้ำบาดาล(Groundwater Level) ,ศักยภาพน้ำบาดาล(Groundwater Availability) มาคำนวณหาความเหมาะสม
                </DialogContentText>
                        <img src={waterScale} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleDialogClose} color="primary">
                            Close
                 </Button>
                    </DialogActions>
                </Dialog>
            </div>


        );
    }
}
ShowDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(ShowDetail);
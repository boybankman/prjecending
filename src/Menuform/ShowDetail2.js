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
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Geology from './Geology.PNG'
import IconButton from '@material-ui/core/IconButton';
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
        openDetai1: false,
    };

    handleClickOpen = () => {
        this.setState({ openDetai: true });
    };

    handleClose = () => {
        this.setState({ openDetai1: false });
    };

    render() {
        const { classes } = this.props
        return (
            <div>
              
                <Dialog
                    open={this.props.openDetai2}
                    onClose={this.props.handleDialogClose2}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle id="draggable-dialog-title">Tip</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                          
            </DialogContentText>
                        <img src={Geology} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleDialogClose2} color="primary">
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
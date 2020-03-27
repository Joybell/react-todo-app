import React from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { StylesContext } from '../../node_modules/@material-ui/styles';

const styles = {
  root: {
    width: '400px',
  },
}

@inject('task')
@observer
class TaskItemDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskItem: {},
      open: false
    } 
  }

  openDialog = (taskItem) => {
    this.setState({
      taskItem: taskItem,
      open: true
    });
  }
  
  closeDialog = () => {
    this.setState({
      open: false
    });
  }

  handleChange = (event) => {
    this.setState({
      taskItem: {
        task_id: this.state.taskItem.task_id,
        task_title: event.target.value
      }
    });
  }

  @action
  updateTask = async() => {
    const taskId = this.state.taskItem.task_id;
    const payload = {
      task_title: this.state.taskItem.task_title
    }

    const response = await this.props.task.updateTask(taskId, payload);
    
    this.props.task.getActiveTasks();

    this.closeDialog();
  }

  render() {
    console.log('===============', this.props.taskId)

    return (
      <div>
        <Dialog fullWidth={true} maxWidth="md" open={this.state.open} onClose={this.closeDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update a task</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText> */}
            <TextField
              margin="dense"
              id="name"
              value={this.state.taskItem.task_title}
              onChange={this.handleChange}
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.updateTask} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }  
}

export default TaskItemDialog
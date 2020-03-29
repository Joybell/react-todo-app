import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';

const styles = {
  formControl: {
    width: '100%',
    marginTop: '20px',
    marginBottom: '20px',
  },
}

@inject('task')
@observer
class TaskItemDialog extends React.Component {
  @observable taskTitleOrigin = '';
  @observable taskItem = {};
  @observable activeTasks = [];
  @observable open = false;
  @observable errorMessage = '';

  constructor(props) {
    super(props);
  }

  openDialog = (taskItem) => {
    this.taskTitleOrigin = taskItem.task_title;
    this.taskItem = taskItem;
    this.activeTasks = [ ...this.props.task.activeTasks ];
    this.open = true;
  }
  
  closeDialog = () => {
    this.open = false;
  }

  handleErrorClose = () => {
    this.errorMessage = ''
  }

  handleChange = (event) => {
    this.taskItem = {
      task_id: this.taskItem.task_id,
      task_title: event.target.value,
      pre_tasks: this.taskItem.pre_tasks,
    }
  }

  handleChangePreTasks = (event) => {
    this.taskItem.pre_tasks = event.target.value
  }

  updateTask = async() => {
    if (!this.taskItem.task_title) {
      return false;
    }

    const taskId = this.taskItem.task_id;
    const payload = {
      task_title: this.taskItem.task_title,
      pre_tasks: this.taskItem.pre_tasks
    }

    const response = await this.props.task.updateTask(taskId, payload);

    if (response) {
      this.props.onFetchData();
    }
    
    this.closeDialog();
  }

  render() {
    return (
      <div>
        <Dialog fullWidth={true} maxWidth="md" open={this.open} onClose={this.closeDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update a task</DialogTitle>
          <DialogContent>
            Task Title
            <TextField
              margin="dense"
              id="task_title"
              value={this.taskItem.task_title}
              onChange={this.handleChange}
              fullWidth
            />
          
            <Input 
              fullWidth 
              onChange={this.handleChangePreTasks} 
              inputProps={{ 'aria-label': 'description' }} 
              placeholder="1,13 콤마 구분으로 입력하세요"
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
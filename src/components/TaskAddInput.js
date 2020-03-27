import React from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  textField: {
    margin: '8px',
  },
}

@inject('task')
@observer
class TaskAddInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskTitle: ''
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      taskTitle: event.target.value
    });
  }

  @action
  handleKeyDown = async(event) => {
    if (this.state.taskTitle && event.keyCode === 13) { 
      const response = await this.props.task.addTask({
        task_title: this.state.taskTitle
      });

      this.setState({taskTitle: ''})
      this.props.task.getActiveTasks();
      this.props.task.getClosedTasks();
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <TextField
          id="standard-full-width"
          label="Add a task"
          style={styles.textField}
          placeholder="Write your task here"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.taskTitle}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );    
  }
}

export default TaskAddInput
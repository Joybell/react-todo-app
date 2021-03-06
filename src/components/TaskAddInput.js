import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
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
  @observable taskTitle = '';

  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange = (event) => {
    this.taskTitle = event.target.value;
  }

  handleKeyDown = async(event) => {
    if (this.taskTitle && event.keyCode === 13) { 
      const response = await this.props.task.addTask({
        task_title: this.taskTitle
      });

      if (response) {
        this.props.onFetchData();
      }

      this.taskTitle = '';
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
          value={this.taskTitle}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );    
  }
}

export default TaskAddInput
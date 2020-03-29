import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '20px',
    borderColor: '#86b9eb',
  },
  textField: {
    margin: '8px',
  },
}

@inject('task')
@observer
class SearchBox extends React.Component {
  @observable taskTitle = '';

  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    this.taskTitle = event.target.value;
  }

  handleKeyDown = async(event) => {
    if (this.taskTitle && event.keyCode === 13) {
      const params = {
        task_title: this.taskTitle
      }

      this.taskTitle = '';

      this.props.onFetchData(params);
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <TextField
          id="standard-full-width"
          // label="Task title"
          style={styles.textField}
          placeholder="Search here"
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

export default SearchBox
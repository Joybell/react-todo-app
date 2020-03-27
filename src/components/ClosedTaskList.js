import React from 'react';
import { observer, inject } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const styles = {
  root: {
    width: '100%',
  },
}

@inject('task')
@observer
class ClosedTaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxClickId: 0
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.props.task.getClosedTasks();
  }

  reopenTask = async(item, event) => {
    event.stopPropagation();

    this.setState({
      checkboxClickId: item.task_id
    });

    const response = await this.props.task.updateTaskStatus(item.task_id, 'reopen');

    if (response) {
      this.props.task.getActiveTasks();
      this.props.task.getClosedTasks();
    }
  }

  render() {
    const { task } = this.props;

    return (
      <List style={styles.root}>
        {task.closedTasks.map((item, index) => {
          return (
            <div key={index}>
              <ListItem>
                <ListItemIcon>
                  <IconButton onClick={(event) => this.reopenTask(item, event)}>
                    {this.state.checkboxClickId === item.task_id ? <CheckBoxOutlineBlankIcon /> : <CheckBoxIcon />}
                  </IconButton>
                </ListItemIcon>
                <ListItemText 
                  id={item.task_id} 
                  primary={item.task_title}
                  secondary={`작성일 : ${item.createdAt} / 수정일 : ${item.updatedAt}`} 
                  />
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    )
  }
}

export default ClosedTaskList
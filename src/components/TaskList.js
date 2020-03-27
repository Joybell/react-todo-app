import React from 'react';
import { observer, inject } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TaskItemDialog from './TaskItemDialog';
import TaskAddInput from './TaskAddInput';
import ClosedTaskList from './ClosedTaskList';

const styles = {
  root: {
    width: '100%',
  },
  contentTop: {
    paddingTop: '50px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  nested: {
    paddingLeft: '70px',
  },
}

@inject('task')
@observer
class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listItemClickId: 0,
      checkboxClickId: 0,
      expandClickId: 0,
    };

    this.taskDialogRef = React.createRef();
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.props.task.getActiveTasks();
    this.props.task.getClosedTasks();
  }

  openTaskDialog = (item) => {
    this.setState({
      listItemClickId: item.task_id
    });

    this.taskDialogRef.current.openDialog(item);
  }

  preTaskToggle = (item, event) => {
    event.stopPropagation();

    item.open = !item.open;

    this.setState({
      expandClickId: item.task_id
    });
  }

  closeTask = async(item, event) => {
    event.stopPropagation();

    this.setState({
      checkboxClickId: item.task_id
    });

    const response = await this.props.task.updateTaskStatus(item.task_id, 'close');

    if (response) {
      this.fetchData();
    }
  }

  removeTask = async(item, event) => {
    event.stopPropagation();

    this.setState({
      checkboxClickId: item.task_id
    });

    const response = await this.props.task.removeTask(item.task_id);

    if (response) {
      this.fetchData();
    }
  }

  changedPage = (event, value) => {
    // setPage(value)
    // console.log(page)
  }

  render() {
    const { task } = this.props;

    return (     
      <div style={styles.contentTop}>
        <TaskItemDialog ref={this.taskDialogRef} />
        <TaskAddInput />
        <List style={styles.root}>
          {task.activeTasks.map((item, index) => {
            return (
              <div key={index}>
                <ListItem button onClick={() => this.openTaskDialog(item)}>
                  <ListItemIcon>
                    <IconButton onClick={(event) => this.closeTask(item, event)}>
                      {this.state.checkboxClickId === item.task_id ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText 
                    id={item.task_id} 
                    primary={item.task_title}
                    secondary={`작성일 : ${item.createdAt} / 수정일 : ${item.updatedAt}`} 
                    />
                  <IconButton onClick={(event) => this.preTaskToggle(item, event)}>
                    {/* {this.state.expandClickId === item.task_id ? <ExpandLess /> : <ExpandMore />} */}
                    {item.open ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </ListItem>
                <Collapse in={item.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem style={styles.nested}>
                      <ListItemIcon>
                        <CheckBoxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Starred" />
                    </ListItem>
                    <ListItem style={styles.nested}>
                      <ListItemIcon>
                        <CheckBoxOutlineBlankIcon />
                      </ListItemIcon>
                      <ListItemText primary="Starred" />
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
              </div>
            );
          })}
        </List>
        <Pagination 
          style={styles.pagination} 
          count={10} 
          page={this.page} 
          onChange={this.changedPage} 
          />
        <ClosedTaskList />
      </div>
    )
  }
}

export default TaskList
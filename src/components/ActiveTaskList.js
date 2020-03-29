import React from 'react';
import { observer, inject } from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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
    marginTop: '10px',
  },
  nested: {
    paddingLeft: '70px',
  },
}

@inject('task')
@observer
class ActiveTaskList extends React.Component {
  constructor(props) {
    super(props);
  }

  openTaskDialog = (item) => {
    this.props.onOpenTaskDialog(item);
  }

  closeTask = async(item, event) => {
    event.stopPropagation();
    this.props.onCloseTask(item, event);
  }

  removeTask = (item, event) => {
    this.props.onRemoveTask(item, event);
  }

  render() {
    const { task } = this.props;

    return (     
      <div style={styles.contentTop}>
        {
          task.activeTasks.length > 0
          ? <Typography variant="h6" color="inherit" noWrap>
              Todo
            </Typography>
          : ''
        }
        <List style={styles.root}>
          {task.activeTasks.map((item, index) => {
            task.preTasks.map((preTask, preTaskIndex) => {
              if (item.task_id === preTask.task_id) {
                item.pre_tasks = [ ...preTask.pre_tasks.split(',') ]
              }
            });

            return (
              <div key={index}>
                <ListItem button onClick={() => this.openTaskDialog(item)}>
                  <ListItemIcon>
                    <IconButton onClick={(event) => this.closeTask(item, event)}>
                      {
                        item.close 
                        ? <CheckBoxIcon /> 
                        : <CheckBoxOutlineBlankIcon />
                      }
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText 
                    id={item.task_id} 
                    primary={
                      task.preTasks.map((preTask, preTaskIndex) => {
                        if (item.task_id === preTask.task_id) {
                        const pre_task_ids = preTask.pre_tasks.split(',').map(num => `@${num}`).join(' ')
                          return `${item.task_id}. ${item.task_title} ${pre_task_ids}`
                        } else {
                          return `${item.task_id}. ${item.task_title}`
                        }
                      })
                    }
                    secondary={`작성일 : ${item.created_at} / 수정일 : ${item.updated_at}`} 
                  />
                  <IconButton onClick={(event) => this.removeTask(item, event)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    )
  }
}

export default ActiveTaskList
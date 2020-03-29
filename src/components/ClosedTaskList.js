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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const styles = {
  root: {
    width: '100%',
    marginTop: '30px',
  }
}

@inject('task')
@observer
class ClosedTaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxClickId: 0,
      unChecked: []
    };
  }

  reopenTask = async(item, event) => {
    event.stopPropagation();
    item.reopen = true;

    this.props.onReopenTask(item, event);
  }

  removeTask = (item, event) => {
    this.props.onRemoveTask(item, event);
  }

  render() {
    const { task } = this.props;

    return (
      <div style={styles.root}>
        {
          task.closedTasks.length > 0
          ? <Typography variant="h6" color="inherit" noWrap>
              Done
            </Typography>
          : ''
        }
        <List>
          {task.closedTasks.map((item, index) => {
            return (
              <div key={index}>
                <ListItem>
                  <ListItemIcon>
                    <IconButton onClick={(event) => this.reopenTask(item, event)}>
                      {
                        item.reopen 
                        ? <CheckBoxOutlineBlankIcon /> 
                        : <CheckBoxIcon />
                      }
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText 
                    id={item.task_id} 
                    primary={`${item.task_id}. ${item.task_title}`}
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

export default ClosedTaskList
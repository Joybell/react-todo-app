import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';
import TodoItemDialog from './TodoItemDialog';
import TodoInput from './TodoInput';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    
  },
  contentTop: {
    paddingTop: theme.spacing(5),
  },
  preTasks: {
    '& > span': {
      marginRight: theme.spacing(2),
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  }
}));

const TodoList = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className={classes.contentTop}>
      <TodoInput />
      <List className={classes.root}>
        {[0, 1, 2, 3].map(value => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <div>
              <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText 
                  id={labelId} 
                  primary={`Task ${value + 1}`}
                  secondary={
                    <div className={classes.preTasks}>
                      <span>@Task 1</span>
                      <span>@Task 2</span>
                    </div>
                  } />
                
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={handleClickOpen}>
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
      <Pagination className={classes.pagination} count={10} />
      <TodoItemDialog />
    </div>
  );
}

export default TodoList

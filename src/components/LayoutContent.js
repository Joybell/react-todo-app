import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LayoutFooter from './LayoutFooter';
import TaskList from './TaskList'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 640,
  },
}));

const LayoutContent = () => {
  const classes = useStyles(); 
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={fixedHeightPaper}>
              <TaskList />
            </Paper>
          </Grid>
        </Grid>
        <Box pt={4}>
          <LayoutFooter />
        </Box>
      </Container>
    </main>
  );
}

export default LayoutContent
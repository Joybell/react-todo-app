import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LayoutFooter from './LayoutFooter';
import TaskList from '../TaskList'

const styles = {
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: '50px',
    paddingBottom: '20px'
  },
  paper: {
    padding: '20px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 1200,
  },
}

class LayoutContent extends React.Component {
  render() {
    return (
      <main style={styles.content}>
        <Container maxWidth="lg" style={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper style={styles.paper}>
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
}

export default LayoutContent
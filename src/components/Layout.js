import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

const Layout = () => {
  const classes = useStyles(); 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <LayoutHeader />
      <LayoutContent />
    </div>
  );
}

export default Layout
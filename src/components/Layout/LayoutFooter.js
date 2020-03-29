import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

class LayoutFooter extends React.Component {
  render() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Designed By '}
        <Link color="inherit" href="https://material-ui.com/">
          Material-UI
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
}

export default LayoutFooter
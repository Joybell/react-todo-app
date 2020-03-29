import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import LayoutHeader from './components/Layout/LayoutHeader';
import LayoutContent from './components/Layout/LayoutContent';

const styles = {
  app: {
    display: 'flex',
  }
}
class App extends React.Component {
  render() {
    return (
      <div style={styles.app}>
        <CssBaseline />
        <LayoutHeader />
        <LayoutContent />
      </div>
    )
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import TaskStore from './stores/taskStore';

const task = new TaskStore();

ReactDOM.render(
  <Provider task={task}>
    <App />
  </Provider>
, document.getElementById('root')
);
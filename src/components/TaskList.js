import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import Pagination from '@material-ui/lab/Pagination';
import SearchBox from './SearchBox';
import TaskUpdateDialog from './TaskUpdateDialog';
import TaskAddInput from './TaskAddInput';
import ActiveTaskList from './ActiveTaskList';
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
    marginTop: '10px',
  },
  nested: {
    paddingLeft: '70px',
  },
}

@inject('task')
@observer
class TaskList extends React.Component {
  @observable page = 1;
  @observable totalPage = 0;

  constructor(props) {
    super(props);

    this.taskDialogRef = React.createRef();
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async(searchParams = null) => {
    const params = searchParams ? searchParams : {
      page: this.page,
    }

    const responseActive = await this.props.task.getActiveTasks(params);
    this.totalPage = Math.ceil(Number.parseInt(responseActive.totalCount) / 5);
    
    const responseClose = this.props.task.getClosedTasks(searchParams);

    this.props.task.getPreTasks();
  }

  changedPage = (event, value) => {  
    this.page = value;
    this.fetchData();
  }

  openTaskDialog = (item) => {
    
    this.taskDialogRef.current.openDialog(item);
  }

  preTaskToggle = (item, event) => {
    event.stopPropagation();
    item.open = !item.open;
  }

  paginationCorrection = () => {
    const totalCount = Number.parseInt(this.props.task.totalCount);

    if (this.page && Math.ceil((totalCount - 1) / 5) < this.page) {
      this.page--;
    }
  }

  closeTask = async(item, event) => {
    event.stopPropagation();
    const response = await this.props.task.updateTaskStatus(item.task_id, 'close');

    if (response.data.result_code === 'FAIL') {
        alert(response.data.message);
        return false;
    }

    if (response) {
      item.close = true;
      this.paginationCorrection();  
      this.fetchData();
    }
  }

  reopenTask = async(item, event) => {
    event.stopPropagation();
    const response = await this.props.task.updateTaskStatus(item.task_id, 'reopen');

    if (response) {
      this.fetchData();
    }
  }

  removeTask = async(item, event) => {
    event.stopPropagation();
    const response = await this.props.task.removeTask(item.task_id);

    if (response) {
      this.paginationCorrection();
      this.fetchData();
    }
  }

  render() {
    return (     
      <div style={styles.contentTop}>
        <TaskUpdateDialog 
          ref={this.taskDialogRef} 
          onFetchData={this.fetchData} 
        />
        <SearchBox
          onFetchData={this.fetchData}
        />
        <TaskAddInput 
          onFetchData={this.fetchData}
        />
        <ActiveTaskList
          onOpenTaskDialog={(item) => this.openTaskDialog(item)}
          onCloseTask={(item, event) => this.closeTask(item, event)}
          onRemoveTask={(item, event) => this.removeTask(item, event)}
        />
        {
          this.totalPage 
          ? <Pagination 
              style={styles.pagination} 
              count={this.totalPage} 
              page={this.page} 
              onChange={this.changedPage} 
            />
          : ''
        }
        <ClosedTaskList 
          onReopenTask={(item, event) => this.reopenTask(item, event)}
          onRemoveTask={(item, event) => this.removeTask(item, event)}
        />
      </div>
    )
  }
}

export default TaskList
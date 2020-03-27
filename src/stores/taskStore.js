import { observable, action } from 'mobx';
import api from '../api';

class TaskStore {
  @observable
  activeTasks = [];

  @observable
  closedTasks = [];

  @observable
  task = {};

  @action 
  setActiveTasks = (activeTasks) => {
    this.activeTasks = [ ...activeTasks ];
  }

  @action 
  getActiveTasks = async() => {
    const response = await api.get(`/tasks?task_status=active`);

    if (response) {
      this.setActiveTasks(response.data);     
    }
  }

  @action 
  setClosedTasks = (closedTasks) => {
    this.closedTasks = [ ...closedTasks ];
  }

  @action 
  getClosedTasks = async() => {
    const response = await api.get(`/tasks?task_status=closed`);

    if (response) {
      this.setClosedTasks(response.data);     
    }
  }

  @action 
  addTask = async(payload) => {
    const response = await api.post(`/tasks`, payload);
    return response;
  }

  @action updateTask = async(taskId, payload) => {
    const response = await api.put(`/task/${taskId}`, payload);
    return response;
  }

  @action updateTaskStatus = async(taskId, actionStatus) => {
    const response = await api.put(`/task/${taskId}/${actionStatus}`)
    return response;
  }

  @action removeTask = async(taskId) => {
    const response = await api.delete(`/task/${taskId}`)
    return response;
  } 
}

export default TaskStore
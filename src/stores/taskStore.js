import { observable, action } from 'mobx';
import api from '../api';
class TaskStore {
  @observable totalCount = 0;
  @observable activeTasks = [];
  @observable closedTasks = [];
  @observable preTasks = [];
  @observable task = {};

  @action 
  setTotalCount = (totalCount) => {
    this.totalCount = totalCount;
  }

  @action 
  setActiveTasks = (activeTasks) => {
    this.activeTasks = (activeTasks && [ ...activeTasks ]) || [];
  }

  @action 
  getActiveTasks = async(params) => {
    const response = await api.get(`/tasks?task_status=active`, {
      params
    });
    
    if (response) {
      this.setTotalCount(response.data.totalCount);
      this.setActiveTasks(response.data.recordSet);
    }

    return {
      totalCount: this.totalCount,
      activeTasks: this.activeTasks
    }
  }

  @action 
  setClosedTasks = (closedTasks) => {
    this.closedTasks = (closedTasks && [ ...closedTasks ]) || [];
  }

  @action 
  getClosedTasks = async(params) => {
    const response = await api.get(`/tasks?task_status=closed`, {
      params
    });

    if (response) {
      this.setClosedTasks(response.data.recordSet);     
    }

    return {
      closeTasks: this.coseTasks
    }
  }

  @action 
  setPreTasks = (preTasks) => {
    this.preTasks = (preTasks && [ ...preTasks ]) || [];
  }

  getPreTasks = async() => {
    const response = await api.get(`/pre_tasks`);

    if (response) {
      this.setPreTasks(response.data)
    }

    return {
      preTasks: this.preTasks
    }
  }

  @action 
  addTask = async(payload) => {
    const response = await api.post(`/tasks`, payload);
    return response;
  }

  @action getTask = async(taskId) => {
    const response = await api.get(`/task/${taskId}`);
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
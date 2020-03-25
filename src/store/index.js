import { observable, extendObservable } from 'mobx'

import TodoStore from './todo'

class Store {
  constructor() {
    extendObservable(this, {
      todo: new TodoStore(this),
    })
  }
}

export default observable(new Store());

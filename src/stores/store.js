import { EventEmitter } from "events";

class Store extends EventEmitter {
  constructor() {
    super();
  }

  get CHANGE() {
    return "CHANGE";
  }

  addChangeListener(callback) {
    this.on(this.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE, callback);
  }
}

module.exports = Store;

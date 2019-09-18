import EventEmitter from "../utils/EventEmitter";

// import EventEmitter = require("events").EventEmitter;

export default class MenuBarEvents {
  eventEmitter = new EventEmitter();
  constructor() {
    // var eventEmitter = new EventEmitter();
    // eventEmitter.setMaxListeners(Infinity);
    // this.eventEmitter = eventEmitter;
  }

  addMouseOverListener(listener: any) {
    // this.eventEmitter.addListener("mouseover", listener);
    this.eventEmitter.on("mouseover", listener);
  }
  removeMouseOverListener(listener: any) {
    // this.eventEmitter.removeListener("mouseover", listener);
    this.eventEmitter.off("mouseover", listener);
  }

  emitMouseOver(event: React.MouseEvent) {
    this.eventEmitter.emit("mouseover", event);
  }
}

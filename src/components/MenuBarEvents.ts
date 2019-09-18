import EventEmitter from "../utils/EventEmitter";

// import EventEmitter = require("events").EventEmitter;

export default class MenuBarEvents {
  private eventEmitter = new EventEmitter();
  constructor() {
    // eventEmitter.setMaxListeners(Infinity);
  }

  public addMouseOverListener(listener: any) {
    // this.eventEmitter.addListener("mouseover", listener);
    this.eventEmitter.on("mouseover", listener);
  }
  public removeMouseOverListener(listener: any) {
    // this.eventEmitter.removeListener("mouseover", listener);
    this.eventEmitter.off("mouseover", listener);
  }

  public emitMouseOver(event: React.MouseEvent) {
    this.eventEmitter.emit("mouseover", event);
  }
}

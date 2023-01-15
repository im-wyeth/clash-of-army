export default class EventManager {
  constructor() {
    this.callers = [];

    window.addEventListener("click", this.click.bind(this));
    window.addEventListener("mousemove", this.mouseMove.bind(this));
    window.addEventListener("keydown", this.key.bind(this));
    window.addEventListener("keyup", this.key.bind(this));
  }

  click(e) {
    const caller = this.callers.find((c) => c.eventType === e.type);

    if (!caller) return;

    if (caller.elem) {
      if (e.target === caller.elem) {
        caller.callback(e);
      }

      return;
    }

    caller.callback(e);
  }

  mouseMove(e) {
    const caller = this.callers.find((c) => c.eventType === e.type);

    if (!caller) return;

    if (caller.elem) {
      if (e.target === caller.elem) {
        caller.callback(e);
      }

      return;
    }

    caller.callback(e);
  }

  key(e) {
    const caller = this.callers.find((c) => c.eventType === e.type);

    if (!caller) return;

    if (caller.eventType === caller.eventType) {
      caller.callback(e);
    }
  }

  addCaller(eventType, callback) {
    this.callers.push({ elem: null, eventType, callback });
  }

  addCallerToElem(elem, eventType, callback) {
    this.callers.push({ elem, eventType, callback });
  }
}

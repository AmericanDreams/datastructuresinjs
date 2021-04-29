import * as Util from "../../../util/Util";
import Node from "./Node";

export default class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.counter = 0;
  }

  // O(1)
  enQueue(item) {
    const node = new Node(item);

    if (this.isEmpty()) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = this.tail.next;
    }
    this.counter++;
  }

  // O(1)
  deQueue() {
    if (this.isEmpty()) {
      return undefined;
    }

    let temp = this.head.data;
    this.head = this.head.next;

    if (this.size() === 1) {
      this.tail == null;
    }
    this.counter--;
    return temp;
  }

  // O(1)
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.head.data;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.counter;
  }

  print() {
    Util.print("Printing the Queue");
    let node = this.head;
    for (let i = 0; i < this.size(); i++) {
      if (i === this.size() - 1) {
        Util.print(node.data + " <= TAIL");
      } else if (i === 0) {
        Util.print(node.data + " <= HEAD");
      } else {
        Util.print(node.data);
      }
      node = node.next;
    }
  }
}

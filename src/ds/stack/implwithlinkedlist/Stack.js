import * as Util from "../../../util/Util";
import Node from "./Node";

export default class Stack {
  constructor() {
    this.head = null;
    this.counter = 0;
  }

  // O(1)
  push(item) {
    const node = new Node(item);

    if (this.isEmpty()) {
      this.head = node;
    }

    node.next = this.head;
    this.head = node;
    this.counter++;
  }

  // O(1)
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.head.data;
  }

  // O(1)
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    const temp = this.head.data;
    this.head = this.head.next;
    this.counter--;
    return temp;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.counter;
  }

  print() {
    Util.print("Printing the Stack (L)");
    let node = this.head;
    for (let i = 0; i < this.size(); i++) {
      if (i === this.size() - 1) {
        Util.print(node.data + " <= BOTTOM");
      } else if (i === 0) {
        Util.print(node.data + " <= HEAD");
      } else {
        Util.print(node.data);
      }
      node = node.next;
    }
  }
}

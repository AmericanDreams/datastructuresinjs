import * as Util from "../../../util/Util";
import Node from "./SNode";

export default class SingleLinkedList {
  constructor() {
    this.root = null;
    this.counter = 0;
  }

  // O(N)
  add(item) {
    const node = new Node(item);
    if (this.isEmpty()) {
      this.root = node;
    } else {
      const lastNode = this.getLastNode();
      lastNode.next = node;
    }

    this.counter++;
  }

  // O(N) in the worst case
  get(index) {
    if (!this.isValidIndex(index)) {
      return undefined;
    }

    return this.getNodeByIndex(index).data;
  }

  // O(N) in the worst case
  set(index, newItem) {
    if (!this.isValidIndex(index)) {
      return undefined;
    }

    const node = this.getNodeByIndex(index);
    node.data = newItem;
    return node.data;
  }

  // O(N) in the worst case
  remove(index) {
    if (!this.isValidIndex(index)) {
      return undefined;
    }

    let node = this.root;

    if (index === 0) {
      this.root = this.root.next;
      this.counter--;
      return node.data;
    }

    for (let i = 2; i <= index; i++) {
      node = node.next;
    }

    let temp = node.next;
    node.next = node.next.next;
    this.counter--;
    return temp.data;
  }

  // O(1)
  addToHead(item) {
    const node = new Node(item);
    node.next = this.root;
    this.root = node;
    this.counter++;
  }

  // O(1)
  size() {
    return this.counter;
  }

  // O(1)
  isEmpty() {
    return this.root === null;
  }

  isValidIndex(index) {
    return index >= 0 && index < this.size();
  }

  getNodeByIndex(index) {
    if (!this.isValidIndex(index)) {
      return undefined;
    }

    let node = this.root;
    for (let i = 1; i <= index; i++) {
      node = node.next;
    }

    return node;
  }

  getLastNode() {
    if (this.isEmpty()) {
      return undefined;
    }

    if (this.size() === 1) {
      return this.root;
    }

    let node = this.root;
    while (node.next !== null) {
      node = node.next;
    }

    return node;
  }

  print() {
    Util.print("Printing the SingleLinkedList");
    let node = this.root;
    while (node != null) {
      Util.print(node.data);
      node = node.next;
    }
  }
}

import * as Util from "../../../util/Util";
import Node from "./DNode";

export default class SingleLinkedList {
  constructor() {
    this.root = null;
    this.tail = null;
    this.counter = 0;
  }

  // O(1)
  add(item) {
    const node = new Node(item);
    if (this.isEmpty()) {
      this.root = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.counter++;
  }

  // O(N/2)
  get(index) {
    const node = this.getNode(index);
    return node === undefined ? undefined : node.data;
  }

  // O(N/2)
  set(index, newItem) {
    const node = this.getNode(index);
    if (node === undefined) {
      return undefined;
    }

    node.data = newItem;
    return node.data;
  }

  // O(N/2)
  remove(index) {
    const node = this.getNode(index);
    if (node === undefined) {
      return undefined;
    }

    if (this.size() === 1) {
      // The node we wanna remove is the only node in the linkedlist
      this.root = null;
      this.tail = null;
      this.counter--;
      return node.data;
    }

    if (node.prev === null) {
      // So this is the root node
      node.next.prev = null;
      this.root = node.next;
    }

    if (node.next === null) {
      // So this is the tail node
      node.prev.next = null;
      this.tail = node.prev;
    }

    if (node.next !== null && node.prev !== null) {
      // So node is placed in the middle
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    this.counter--;
    return node.data;
  }

  // O(1)
  addToHead(item) {
    const node = new Node(item);
    if (this.isEmpty()) {
      this.root = node;
      this.tail = node;
    } else {
      node.next = this.root;
      this.root.prev = node;
      this.root = node;
    }
    this.counter++;
  }

  size() {
    return this.counter;
  }

  isEmpty() {
    return this.root == null;
  }

  isValidIndex(index) {
    return index >= 0 && index < this.size();
  }

  // O(N/2)
  getNode(index) {
    if (!this.isValidIndex(index)) {
      return undefined;
    }

    if (index > this.size() / 2) {
      let node = this.tail;
      let startIndex = this.size() - 1;
      while (startIndex !== index) {
        node = node.prev;
        startIndex--;
      }
      return node;
    } else {
      let node = this.root;
      let startIndex = 0;
      while (startIndex !== index) {
        node = node.next;
        startIndex++;
      }
      return node;
    }
  }

  print() {
    Util.print("Printing the DoublyLinkedList");
    let node = this.root;
    while (node != null) {
      Util.print(node.data);
      node = node.next;
    }
  }
}

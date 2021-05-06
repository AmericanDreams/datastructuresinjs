import * as Util from "../../util/Util";

export default class HashTable {
  constructor() {
    this.counter = 0;
    this.INTERNAL_ARRAY_SIZE = 17;
    this.internalArray = [
      /** INTERNAL_ARRAY_SIZE */
    ];
  }

  put(key, value) {
    const hash = this.hash(key);
    const newNode = new Node(key, value);
    let node = this.internalArray[hash];

    if (node) {
      // finding the last node
      while (node.next != null && node.key != key) {
        node = node.next;
      }

      if (node.key == key) {
        return undefined;
      }

      node.next = newNode;
    } else {
      this.internalArray[hash] = newNode;
    }
    this.counter++;
  }

  get(key) {
    const node = this.getNode(key);
    if (node) {
      return node.value;
    } else {
      return undefined;
    }
  }

  set(key, value) {
    const node = this.getNode(key);
    if (node) {
      node.value = value;
      return node.value;
    } else {
      return undefined;
    }
  }

  remove(key) {
    const hash = this.hash(key);
    let node = this.internalArray[hash];

    if (!node) {
      return undefined;
    } else {
      if (node.key === key) {
        const temp = node.value;
        this.internalArray[hash] = node.next;
        this.counter--;
        return temp;
      } else {
        while (node.next != null && node.next.key !== key) {
          node = node.next;
        }

        if (!node.next) {
          return undefined;
        } else {
          const temp = node.next.value;
          node.next = node.next.next;
          this.counter--;
          return temp;
        }
      }
    }
  }

  hash(key) {
    return key.length % this.INTERNAL_ARRAY_SIZE;
  }

  getNode(key) {
    const hash = this.hash(key);
    let node = this.internalArray[hash];

    if (!node) {
      return undefined;
    } else {
      // Finding the node which has same key in the linkedList
      while (node != null && node.key != key) {
        node = node.next;
      }

      if (node) {
        return node;
      } else {
        return undefined;
      }
    }
  }

  size() {
    return this.counter;
  }

  print() {
    for (let c = 0; c < this.INTERNAL_ARRAY_SIZE; c++) {
      const node = this.internalArray[c];
      if (node) {
        let str = "";
        while (node != null) {
          str += ` ${node.value}`;
          node = node.next;

          if (node != null) {
            str += " =>";
          }
        }

        Util.print(`[${c}] => ${str}`);
      } else {
        Util.print(`[${c}] => NULL`);
      }
    }
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

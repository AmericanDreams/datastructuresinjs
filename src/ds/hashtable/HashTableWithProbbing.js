import * as Util from "../../util/Util";

const MIN_CAPASITY = 3;

export default class HashTable {
  constructor() {
    this.counter = 0;
    this.INTERNAL_ARRAY_SIZE = MIN_CAPASITY;
    this.internalArray = [
      /** INTERNAL_ARRAY_SIZE */
    ];
  }

  // The best O(1) the worst O(N)
  put(key, value) {
    if (this.isFull()) {
      this.reSize();
    }

    let hash = this.hash(key);
    let slot = this.internalArray[hash];

    while (slot && slot.key !== key) {
      slot = this.internalArray[++hash % this.INTERNAL_ARRAY_SIZE];
    }

    if (slot) {
      // It means the key already exists inside the hashtable.
      return undefined;
    } else {
      const item = new Item(key, value);
      this.internalArray[hash % this.INTERNAL_ARRAY_SIZE] = item;
      this.counter++;
    }
  }

  // The best O(1) the worst O(N)
  get(key) {
    const item = this.getItem(key);
    if (item) {
      return item.value;
    }
    return undefined;
  }

  // The best O(1) the worst O(N)
  set(key, value) {
    const item = this.getItem(key);
    if (item) {
      item.value = value;
      return item.value;
    }
    return undefined;
  }

  // The best O(1) the worst O(N)
  remove(key) {
    let hash = this.hash(key);
    let slot = this.internalArray[hash];

    while (slot && slot.key !== key) {
      slot = this.internalArray[++hash % this.INTERNAL_ARRAY_SIZE];
    }

    if (slot) {
      const temp = slot.value;
      this.internalArray[hash % this.INTERNAL_ARRAY_SIZE] = null;
      this.counter--;
      this.reHash();
      return temp;
    } else {
      return undefined;
    }
  }

  // The best O(1) the worst O(N)
  getItem(key) {
    let hash = this.hash(key);
    let slot = this.internalArray[hash];

    while (slot && slot.key !== key) {
      slot = this.internalArray[++hash % this.INTERNAL_ARRAY_SIZE];
    }

    return slot;
  }

  hash(key) {
    return key.length % this.INTERNAL_ARRAY_SIZE;
  }

  size() {
    return this.counter;
  }

  reHash() {
    const copyOfInternalArray = this.internalArray;
    this.internalArray = [
      /** this.INTERNAL_ARRAY_SIZE */
    ];
    this.counter = 0;

    for (let i = 0; i < this.INTERNAL_ARRAY_SIZE; i++) {
      const item = copyOfInternalArray[i];
      if (item) {
        this.put(item.key, item.value);
      }
    }
  }

  reSize() {
    const copyOfInternalArray = this.internalArray;
    const copyOfSize = this.INTERNAL_ARRAY_SIZE;
    this.INTERNAL_ARRAY_SIZE *= 2;
    this.internalArray = [
      /** this.INTERNAL_ARRAY_SIZE */
    ];
    this.counter = 0;

    for (let i = 0; i < copyOfSize; i++) {
      const item = copyOfInternalArray[i];
      if (item) {
        this.put(item.key, item.value);
      }
    }
  }

  isFull() {
    return this.size() === this.INTERNAL_ARRAY_SIZE;
  }

  isEmpty() {
    return this.size() === 0;
  }

  print() {
    for (let i = 0; i < this.INTERNAL_ARRAY_SIZE; i++) {
      if (this.internalArray[i]) {
        Util.print(
          `${i} = (${this.internalArray[i].key} => ${this.internalArray[i].value})`
        );
      } else {
        Util.print(`${i} = (NULL)`);
      }
    }
  }
}

class Item {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

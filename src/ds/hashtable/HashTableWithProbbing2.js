import * as Util from "../../util/Util";

const MIN_CAPASITY = 10;

export default class HashTable {
  constructor() {
    this.counter = 0;
    this.realCounter = 0;
    this.INTERNAL_ARRAY_SIZE = MIN_CAPASITY;
    this.internalArray = [
      /** INTERNAL_ARRAY_SIZE */
    ];
  }

  put(key, value) {
    if (this.isInternalArrayFull()) {
      this.reSize();
    }

    let hash = this.hash(key);
    let slot = this.internalArray[hash];

    while (slot && !slot.isRemoved && slot.key !== key) {
      slot = this.internalArray[++hash % this.INTERNAL_ARRAY_SIZE];
    }

    if (slot && !slot.isRemoved) {
      // It means the key already exists inside the hashtable.
      return undefined;
    } else {
      if (slot) {
        // This item is going to be replaced
        this.realCounter--;
      }
      const item = new Item(key, value);
      this.internalArray[hash % this.INTERNAL_ARRAY_SIZE] = item;
      this.counter++;
      this.realCounter++;
    }
  }

  get(key) {
    const item = this.getItem(key);
    if (item) {
      return item.value;
    }
    return undefined;
  }

  set(key, value) {
    const item = this.getItem(key);
    if (item) {
      item.value = value;
      return item.value;
    }
    return undefined;
  }

  remove(key) {
    let hash = this.hash(key);
    let slot = this.internalArray[hash];

    while (slot && !slot.isRemoved && slot.key !== key) {
      slot = this.internalArray[++hash % this.INTERNAL_ARRAY_SIZE];
    }

    if (slot && !slot.isRemoved) {
      const temp = slot.value;
      this.internalArray[hash % this.INTERNAL_ARRAY_SIZE].isRemoved = true;
      this.counter--;
      return temp;
    } else {
      return undefined;
    }
  }

  getItem(key) {
    let hash = this.hash(key);
    let slot = this.internalArray[hash];

    while (slot && !slot.isRemoved && slot.key !== key) {
      slot = this.internalArray[++hash % this.INTERNAL_ARRAY_SIZE];
    }

    if (slot && slot.isRemoved) {
      return undefined;
    }

    return slot;
  }

  reSize() {
    if (this.counter < this.realCounter) {
      // It means there are some items inside the array which's isRemoved = true
      // So I can simply remove those items and it will create avaliable space for later

      // O(N) Time complexity
      for (let i = 0; i < this.INTERNAL_ARRAY_SIZE; i++) {
        const item = this.internalArray[i];
        if (item && item.isRemoved) {
          this.internalArray[i] = null;
          this.realCounter--;
        }
      }
    } else {
      // So it means internal array is really full and all items has isMoved = false
      // So only way it to create bigger array and rehash all items

      const copyOfInternalArray = this.internalArray;
      const copyOfSize = this.INTERNAL_ARRAY_SIZE;
      this.INTERNAL_ARRAY_SIZE *= 2;
      this.internalArray = [
        /** this.INTERNAL_ARRAY_SIZE */
      ];
      this.counter = 0;
      this.realCounter = 0;

      for (let i = 0; i < copyOfSize; i++) {
        const item = copyOfInternalArray[i];
        if (item) {
          this.put(item.key, item.value);
        }
      }
    }
  }

  hash(key) {
    return key.length % this.INTERNAL_ARRAY_SIZE;
  }

  size() {
    return this.counter;
  }

  isInternalArrayFull() {
    return this.realCounter === this.INTERNAL_ARRAY_SIZE;
  }

  isEmpty() {
    return this.size() === 0;
  }

  print() {
    for (let i = 0; i < this.INTERNAL_ARRAY_SIZE; i++) {
      if (this.internalArray[i] && !this.internalArray[i].isRemoved) {
        Util.print(
          `${i} = (${this.internalArray[i].key} => ${this.internalArray[i].value})`
        );
      } else if (this.internalArray[i]) {
        Util.print(
          `<b style="color: red;">${i} = (${this.internalArray[i].key} => ${this.internalArray[i].value})<b>`
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
    this.isRemoved = false;
  }
}

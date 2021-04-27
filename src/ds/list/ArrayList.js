import * as Util from "../../util/Util";

export default class ArrayList {
  constructor() {
    this.INTERNAL_CAPASITY = 10;
    this.internalArray = [
      /*this.INTERNAL_CAPASITY */
    ];
    this.pointer = 0;
  }

  // Amortized O(1)
  add(item) {
    if (this.isInternalArrayFull() || this.isEmpty()) {
      this.resize();
    }

    this.internalArray[this.pointer++] = item;
  }

  // O(1)
  get(index) {
    if (!this.isValidIndex(index)) {
      return undefined;
    }

    return this.internalArray[index];
  }

  // O(1)
  set(index, newItem) {
    if (!this.isValidIndex(index)) {
      return undefined;
    }

    this.internalArray[index] = newItem;
    return this.internalArray[index];
  }

  // O(N) in the worst case
  remove(index) {
    if (!this.isValidIndex(index)) {
      return undefined;
    }

    const temp = this.internalArray[index];
    this.internalArray[index] = undefined;
    this.moveAlltoLeft(index + 1);
    this.pointer--;
    return temp;
  }

  // O(N)
  addToHead(item) {
    if (this.isInternalArrayFull() || this.isEmpty()) {
      this.resize();
    }

    this.moveAlltoRight(0);
    this.pointer++;
    this.internalArray[0] = item;
  }

  // O(1)
  size() {
    return this.pointer;
  }

  // O(1)
  isEmpty() {
    return this.pointer === 0;
  }

  // O(N)
  resize() {
    if (this.isInternalArrayFull()) {
      // Internal array is full. Need to make bigger

      /**
       * Creating new Internal array with 1.5 times bigger size and copying all
       * elements from last internal array into new one
       */
      this.INTERNAL_CAPASITY *= 1.5;
      const newInternalArray = [
        /*this.INTERNAL_CAPASITY */
      ];
      for (let i = 0; i < this.internalArray.length; i++) {
        newInternalArray[i] = this.internalArray[i];
      }

      // Replacing old internal array with new (bigger) one
      this.internalArray = newInternalArray;
    } else if (this.isEmpty() && this.INTERNAL_CAPASITY > 10) {
      // Internal array is full. Need make smaller

      /**
       * Creating new array with 10 size and replacing internal array with new (smaller) array
       */
      this.INTERNAL_CAPASITY = 10;
      const newInternalArray = [
        /*this.INTERNAL_CAPASITY */
      ];
      this.internalArray = newInternalArray;
    }
  }

  isInternalArrayFull() {
    return this.pointer === this.INTERNAL_CAPASITY;
  }

  isValidIndex(index) {
    return index >= 0 && index < this.size();
  }

  /*
   * This method will take all the items in the right of the given index (given index inclusive)
   * and move them 1 step right
   */
  moveAlltoRight(index) {
    if (!this.isValidIndex(index)) return;

    for (let i = this.size() - 1; i >= index; i--) {
      this.internalArray[i + 1] = this.internalArray[i];
    }
    this.internalArray[index] = undefined;
  }

  /*
   * Thii method will take all the items in the left of the given index (given index inclusive)
   * and move them 1 step left. Note first index will dissappear
   */
  moveAlltoLeft(index) {
    if (!this.isValidIndex(index)) return;

    for (let i = index; i < this.size(); i++) {
      if (i === 0) continue;
      this.internalArray[i - 1] = this.internalArray[i];
    }

    this.internalArray.pop();
  }

  print() {
    Util.print("Printing the ArrayList");
    for (let i = 0; i < this.internalArray.length; i++) {
      Util.print(this.internalArray[i]);
    }
  }
}

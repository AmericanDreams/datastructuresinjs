import * as Util from "../../util/Util";

export default class BogoSort {
  constructor(array) {
    this.array = array;
  }

  // O(N!)
  sort() {
    let counter = 1;
    while (!this.isSorted()) {
      this.createPermutation();

      counter++;
    }

    Util.print("After " + counter + " permutation creation.");
    this.print();
  }

  // O(N)
  createPermutation() {
    for (let i = this.array.length - 1; i > 0; i--) {
      this.swap(i, parseInt(i * Math.random()));
    }
  }

  swap(first, second) {
    if (
      second < 0 ||
      first < 0 ||
      first >= this.array.length ||
      second >= this.array.length
    )
      return;

    const temp = this.array[first];
    this.array[first] = this.array[second];
    this.array[second] = temp;
  }

  isSorted() {
    for (let i = 0; i < this.array.length - 1; i++) {
      if (this.array[i] > this.array[i + 1]) return false;
    }

    return true;
  }

  print() {
    Util.print(this.array);
  }
}

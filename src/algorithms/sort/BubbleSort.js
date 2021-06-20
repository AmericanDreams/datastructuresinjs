import * as Util from "../../util/Util";

export default class BubbleSort {
  constructor(array) {
    this.array = array;
  }

  //O(N*N)
  sort() {
    for (let i = this.array.length - 1; i > 0; i--) {
      for (let k = 0; k < i; k++) {
        if (this.array[k] > this.array[k + 1]) this.swap(k, k + 1);
      }
    }

    this.print();
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

  print() {
    Util.print(this.array);
  }
}

import * as Util from "../../util/Util";

export default class SelectionSort {
  constructor(array) {
    this.array = array;
  }

  sort() {
    for (let i = this.array.length - 1; i >= 0; i--) {
      let maxIndex = i;

      for (let k = 0; k < i; k++) {
        if (this.array[maxIndex] < this.array[k]) {
          maxIndex = k;
        }
      }

      this.swap(maxIndex, i);
    }

    this.print();
  }

  swap(first, second) {
    if (
      second < 0 ||
      first < 0 ||
      first >= this.array.length ||
      second >= this.array.length ||
      first === second
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

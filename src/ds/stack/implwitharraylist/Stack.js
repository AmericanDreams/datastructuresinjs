import * as Util from "../../../util/Util";
import ArrayList from "../../list/ArrayList";

export default class Stack {
  constructor() {
    this.arrayList = new ArrayList();
  }

  // Amortized O(1)
  push(item) {
    this.arrayList.add(item);
    return this.arrayList.get(this.arrayList.size() - 1);
  }

  // O(1)
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.arrayList.get(this.arrayList.size() - 1);
  }

  // O(1)
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    // O(1) Because it alwys removes the last element in the arrayList so after removing any
    // shifting operation will not needed
    return this.arrayList.remove(this.arrayList.size() - 1);
  }

  isEmpty() {
    return this.arrayList.isEmpty();
  }

  size() {
    return this.arrayList.size();
  }

  print() {
    Util.print("Printing the Stack (A)");
    for (let i = this.arrayList.size() - 1; i >= 0; i--) {
      if (i === this.arrayList.size() - 1) {
        Util.print(this.arrayList.get(i) + " <= HEAD");
      } else if (i === 0) {
        Util.print(this.arrayList.get(i) + " <= BOTTOM");
      } else {
        Util.print(this.arrayList.get(i));
      }
    }
  }
}

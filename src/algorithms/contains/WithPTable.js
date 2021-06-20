// https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm

export default class WithPTable {
  // O(N + M); N = text.length, M = pattern.length; Extra space O(M)
  contains(text, pattern) {
    if (!pattern || !text || pattern.length > text.length) return -1;

    const pTable = [];
    pTable.push(0);

    let length = 0;
    for (let i = 1, left = 0; i < pattern.length; ) {
      if (
        i + length < pattern.length &&
        pattern.charAt(left + length) === pattern.charAt(i + length)
      ) {
        length++;
      } else {
        pTable.push(length);
        i++;
        length = 0;
      }
    }

    for (let i = 0, p = 0; i < text.length; ) {
      if (text.charAt(i) === pattern.charAt(p)) {
        p++;
        i++;
      } else {
        p = Math.max(pTable[p] - 1, 0);
        if (p === 0) i++;
      }

      if (p === pattern.length) return i - p;
    }

    return -1;
  }
}

export default class BrutoForce {
  // O(N * M); N = text.length, M = pattern.length
  contains(text, pattern) {
    if (!pattern || !text || pattern.length > text.length) return -1;

    for (let i = 0; i <= text.length - pattern.length; i++) {
      let q = 0;
      for (; q < pattern.length; q++) {
        if (text.charAt(i + q) !== pattern.charAt(q)) break;
      }

      if (q === pattern.length) return i;
    }

    return -1;
  }
}

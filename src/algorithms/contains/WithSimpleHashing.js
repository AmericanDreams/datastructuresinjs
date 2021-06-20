// https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm

export default class WithSimpleHashing {
  // Avareage O(N + M), Worst O(N * M); N = text.length, M = pattern.length
  contains(text, pattern) {
    if (!pattern || !text || pattern.length > text.length) return -1;

    let hashOfPattern = 0;
    let hashOfpartOfText = 0;

    for (let i = 0; i < pattern.length; i++) {
      hashOfPattern += pattern.charCodeAt(i);
      hashOfpartOfText += text.charCodeAt(i);
    }

    //abcde //ab
    for (let i = 0; i <= text.length - pattern.length; i++) {
      if (i > 0) {
        // Rest of text
        hashOfpartOfText =
          hashOfpartOfText -
          text.charCodeAt(i - 1) +
          text.charCodeAt(i + pattern.length - 1);
      }

      if (hashOfpartOfText !== hashOfPattern) continue;

      let q = 0;
      for (; q < pattern.length; q++) {
        if (text.charAt(i + q) !== pattern.charAt(q)) break;
      }

      if (q === pattern.length) return i;
    }

    return -1;
  }
}

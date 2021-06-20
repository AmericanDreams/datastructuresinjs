//https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm

export default class WithAdvancedHashing {
  // Avareage O(N + M), Worst O(N * M); N = text.length, M = pattern.length
  contains(text, pattern) {
    if (!pattern || !text || pattern.length > text.length) return -1;

    const PRIME = 7;
    const MODULO_PRIME = 31;

    let hashOfPattern = 0;
    let hashOfpartOfText = 0;
    let biggestPolynomial = 1;
    for (let i = 0; i < pattern.length; i++) {
      hashOfPattern =
        (PRIME * hashOfPattern + pattern.charCodeAt(i)) % MODULO_PRIME;

      hashOfpartOfText =
        (PRIME * hashOfpartOfText + text.charCodeAt(i)) % MODULO_PRIME;

      if (i > 0) biggestPolynomial = PRIME * biggestPolynomial;
    }

    for (let i = 0; i <= text.length - pattern.length; i++) {
      if (i > 0) {
        hashOfpartOfText =
          ((hashOfpartOfText - text.charCodeAt(i - 1) * biggestPolynomial) *
            PRIME +
            text.charCodeAt(i + pattern.length - 1)) %
          MODULO_PRIME;

        if (hashOfpartOfText < 0) {
          hashOfpartOfText += MODULO_PRIME;
        }
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

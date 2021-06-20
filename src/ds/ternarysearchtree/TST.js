import * as Util from "../../util/Util";

export default class TernarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(word) {
    if (!word) return undefined;
    const result = [];
    this.root = this.insertNode(this.root, word, result);
    if (result[0]) return word;
    return undefined;
  }

  insertNode(node, word, result) {
    if (!word || word.length === 0) {
      return node;
    }

    const firstLetter = word.substr(0, 1);

    if (!node) {
      const n = new Node(firstLetter);
      if (word.length === 1) {
        n.isLastLetter = true;
        result.push(true);
      }
      n.middle = this.insertNode(null, word.substr(1, word.length), result);
      return n;
    }

    if (firstLetter === node.letter) {
      if (word.length === 1) {
        if (node.isLastLetter) {
          result.push(false);
        } else {
          result.push(true);
          node.isLastLetter = true;
        }
      }
      node.middle = this.insertNode(
        node.middle,
        word.substr(1, word.length),
        result
      );
    } else if (firstLetter > node.letter) {
      node.right = this.insertNode(node.right, word, result);
    } else {
      //left
      node.left = this.insertNode(node.left, word, result);
    }

    return node;
  }

  contains(word) {
    if (!word) return undefined;

    let node = this.root;
    while (word.length > 0) {
      const firstLetter = word.substr(0, 1);

      if (!node) return false;

      if (firstLetter == node.letter) {
        if (word.length === 1) return node.isLastLetter;

        word = word.substr(1, word.length);
        node = node.middle;
      } else if (firstLetter > node.letter) {
        node = node.right;
      } else {
        // firstLetter < node.letter
        node = node.left;
      }
    }
  }

  traverseSorted() {
    this.traverse(this.root, "");
  }

  traverse(node, word) {
    if (node) {
      if (node.isLastLetter) Util.print(word + node.letter);

      this.traverse(node.middle, word + node.letter);

      if (node.right) {
        this.traverse(node.right, word);
      }

      if (node.left) {
        this.traverse(node.left, word);
      }
    }
  }
}

class Node {
  constructor(letter) {
    this.letter = letter;
    this.left = null;
    this.middle = null;
    this.right = null;
    this.isLastLetter = false;
  }
}

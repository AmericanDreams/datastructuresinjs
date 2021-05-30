import * as Util from "../../util/Util";

export default class Trie {
  constructor() {
    this.root = new Node(" ");
  }

  // O(M); M = word.length
  insert(word) {
    if (!word || word.length === 0) return undefined;
    const result = this.insertNode(this.root, word);
    if (result) return word;
    return undefined;
  }

  insertNode(node, word) {
    const firstLetter = word.substr(0, 1);
    const child = node.getChildByLetterCreateIfDoesNotExist(firstLetter);
    if (word.length === 1) {
      // Okay it will be inserted as a child of node
      if (child.isLastLetter) {
        // Oh no! This child was inserted before as a last letter of another word
        return false;
      } else {
        // Cool! No dublicate!
        child.isLastLetter = true;
        return true;
      }
    } else {
      // We should go bottom still
      return this.insertNode(child, word.substr(1, word.length));
    }
  }

  // The worst is O(M); M = word.length
  contains(word) {
    if (!word || word.length === 0) return undefined;
    return this.containsNode(this.root, word);
  }

  containsNode(node, word) {
    const firstLetter = word.substr(0, 1);
    const child = node.getChildByLetter(firstLetter);

    if (!child) return false; // So it means this word never inserted before

    if (word.length === 1 && child) {
      // So it can be child of the Node
      if (child.isLastLetter) {
        // Found! So child exists with given letter and it is the last letter of the word
        return true;
      } else {
        // So it is just middle letter of another word
        return false;
      }
    } else {
      // We should go bottom still
      return this.containsNode(child, word.substr(1, word.length));
    }
  }

  // The worst is O(M); M = word.length
  remove(word) {
    if (!word || word.length === 0) return undefined;
    return this.removeNode(this.root, word);
  }

  removeNode(node, word) {
    const firstLetter = word.substr(0, 1);
    const child = node.getChildByLetter(firstLetter);

    if (!child) return false; // So it means this word never inserted before

    if (word.length === 1 && child) {
      // So it can be child of the Node
      if (child.isLastLetter) {
        // Found! So child exists with given letter and it is the last letter of the word
        // So lets remove this child
        node.removeGivenChild(child);
        return true;
      } else {
        // So it is just middle letter of another word
        return false;
      }
    } else {
      return this.removeNode(child, word.substr(1, word.length));
    }
  }

  printSorted() {
    this.printNodesSorted(this.root, "");
  }

  printNodesSorted(node, word) {
    if (!node) return;

    const index = node.letter.charCodeAt(0) - "a".charCodeAt(0);

    //First itself
    if (word !== " " && node.isLastLetter) Util.print(word + node.letter);

    //Second left children
    for (let i = 0; i < index; i++) {
      if (node.children[i])
        this.printNodesSorted(node.children[i], word + node.letter);
    }

    //Third right children
    for (let i = index; i < node.children.length; i++) {
      if (node.children[i])
        this.printNodesSorted(node.children[i], word + node.letter);
    }
  }
}

class Node {
  constructor(letter) {
    this.letter = letter;
    this.CHILDREN_COUNT = 26;
    this.isLastLetter = false;
    this.children = [
      /** this.CHILDREN_COUNT */
    ];
  }

  getChildByLetterCreateIfDoesNotExist(letter) {
    const index = letter.charCodeAt(0) - "a".charCodeAt(0);
    if (!this.children[index]) {
      this.children[index] = new Node(letter);
    }

    return this.children[index];
  }

  getChildByLetter(letter) {
    const index = letter.charCodeAt(0) - "a".charCodeAt(0);
    return this.children[index];
  }

  removeGivenChild(node) {
    if (node.isThereAnyChild()) {
      // SO it means this child node is also middle letter of another word. We can not
      // remove this completely.
      node.isLastLetter = false;
    } else {
      // So we can completely remove this child from its parent
      const index = node.letter.charCodeAt(0) - "a".charCodeAt(0);
      this.children[index] = null;
    }
  }

  isThereAnyChild() {
    if (this.children.length === 0) return false;

    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i]) return true;
    }
    return false;
  }
}

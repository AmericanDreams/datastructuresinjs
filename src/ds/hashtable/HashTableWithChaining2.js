import * as Util from "../../util/Util";

export default class HashTable {
  constructor() {
    this.counter = 0;
    this.INTERNAL_ARRAY_SIZE = 17;
    this.internalArray = [
      /** INTERNAL_ARRAY_SIZE */
    ];
  }

  // The best O(1) , avareage O(log(N)), the worst O(N)
  put(key, value) {
    const hashCode = this.hashCode(key);
    const slotIndex = hashCode % this.INTERNAL_ARRAY_SIZE;
    const node = new Node(key, hashCode, value);

    // Checking that slow which this key-value pairs should be seated
    if (this.internalArray[slotIndex]) {
      const result = this.insertIntoTree(this.internalArray[slotIndex], node);
      if (result === undefined) {
        return undefined;
      }
    } else {
      // Slot is empty
      this.internalArray[slotIndex] = node;
    }
    this.counter++;
  }

  // The best O(1) , avareage O(log(N)), the worst O(N)
  get(key) {
    const hashCode = this.hashCode(key);
    const slotIndex = hashCode % this.INTERNAL_ARRAY_SIZE;

    // Checking that slow which this key-value pairs should be seated
    if (this.internalArray[slotIndex]) {
      const result = this.findInTheTree(
        this.internalArray[slotIndex],
        hashCode,
        key
      );
      if (result) {
        return result.value;
      }
    }
    return undefined;
  }

  // The best O(1) , avareage O(log(N)), the worst O(N)
  set(key, value) {
    const hashCode = this.hashCode(key);
    const slotIndex = hashCode % this.INTERNAL_ARRAY_SIZE;

    // Checking that slow which this key-value pairs should be seated
    if (this.internalArray[slotIndex]) {
      const result = this.findInTheTree(
        this.internalArray[slotIndex],
        hashCode,
        key
      );
      if (result) {
        result.value = value;
        return result.value;
      }
    }
    return undefined;
  }

  // The best O(1) , avareage O(log(N)), the worst O(N)
  remove(key) {
    const hashCode = this.hashCode(key);
    const slotIndex = hashCode % this.INTERNAL_ARRAY_SIZE;

    // Checking that slow which this key-value pairs should be seated
    if (this.internalArray[slotIndex]) {
      const result = this.removeFromTree(
        null,
        this.internalArray[slotIndex],
        hashCode,
        key
      );
      if (result) {
        this.counter--;
        return result.value;
      }
    }
    return undefined;
  }

  removeFromTree(parent, child, code, key) {
    if (!child) return undefined;

    if (child.key === key) {
      // Found!
      const tempNode = child;
      if (child.right && !child.left) {
        // So it means node has only right child

        if (!parent) {
          // The node which we wanna remove is the root node of tree
          this.internalArray[this.hashCode(key) % this.INTERNAL_ARRAY_SIZE] =
            child.right;
        } else {
          // The node which we wanna remove is the regular node
          if (parent.right && parent.right.key === child.key) {
            // The node which we wanna remove is the right child of its parent
            parent.right = child.right;
          } else {
            // The node which we wanna remove is the left child of its parent
            parent.left = child.right;
          }
        }
      } else if (!child.right && child.left) {
        // So it means node has only left child
        if (!parent) {
          // The node which we wanna remove is the root node of tree
          this.internalArray[this.hashCode(key) % this.INTERNAL_ARRAY_SIZE] =
            child.left;
        } else {
          // The node which we wanna remove is the regular node
          if (parent.right && parent.right.key === child.key) {
            // The node which we wanna remove is the right child of its parent
            parent.right = child.left;
          } else {
            // The node which we wanna remove is the left child of its parent
            parent.left = child.left;
          }
        }
      } else if (!child.right && !child.left) {
        // So the node is the leaf one

        if (!parent) {
          // The node which we wanna remove is the root node of tree
          this.internalArray[this.hashCode(key) % this.INTERNAL_ARRAY_SIZE] =
            undefined;
        } else {
          // The node which we wanna remove is the regular node
          if (parent.right && parent.right.key === child.key) {
            // The node which we wanna remove is the right child of its parent
            parent.right = null;
          } else {
            // The node which we wanna remove is the left child of its parent
            parent.left = null;
          }
        }
      } else {
        // The node which we wanna remove has both right and left children

        // Lets find the successor of the node
        let parentOfSuccessor = node;
        let successor = node.right;
        while (successor.left) {
          parentOfSuccessor = successor;
          successor = successor.left;
        }

        // Swapping their value
        const tempKey = successor.key;
        const tempValue = successor.value;
        const tempCode = successor.code;

        successor.key = node.key;
        successor.value = node.value;
        successor.code = node.code;

        node.key = tempKey;
        node.value = tempValue;
        node.code = tempCode;

        // Now the node which we wanna remove is the successor node which can have at most 1 (right) child

        if (
          parentOfSuccessor.right &&
          successor.key === parentOfSuccessor.right.key
        ) {
          // So the node (successor) we wanna remove is the right child of its parent
          parentOfSuccessor.right = successor.right;
        } else {
          // So the node (successor) we wanna remove is the left child of its parent
          parentOfSuccessor.left = successor.right;
        }
      }
      return tempNode;
    }

    if (code >= child.code) {
      // It can be in the right sub-tree
      return this.removeFromTree(child, child.right, code, key);
    } else {
      // it can be in the left sub-tree
      return this.removeFromTree(child, child.left, code, key);
    }
  }

  findInTheTree(root, code, key) {
    if (!root) return undefined;

    if (root.key === key) return root;

    if (code >= root.code) {
      // it can be in the right sub-tree
      return this.findInTheTree(root.right, code, key);
    } else {
      // It can be in the left sub-tree
      return this.findInTheTree(root.left, code, key);
    }
  }

  insertIntoTree(root, newNode) {
    if (newNode.key === root.key) {
      // It means key already exists in the tree
      return undefined;
    }

    if (newNode.code >= root.code) {
      // It should be in the right sub-tree
      if (!root.right) {
        // Great ! Lets insert as a right child
        root.right = newNode;
        return root.right;
      } else {
        return this.insertIntoTree(root.right, newNode);
      }
    } else {
      // It should be in the left sub-tree
      if (!root.left) {
        // Great ! Lets insert as a left child
        root.left = newNode;
        return root.left;
      } else {
        return this.insertIntoTree(root.left, newNode);
      }
    }
  }

  size() {
    return this.counter;
  }

  hashCode(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i) + (i + 1);
    }
    return hash;
  }
}

class Node {
  constructor(key, code, value) {
    this.code = code;
    this.key = key;
    this.value = value;
    this.right = undefined;
    this.left = undefined;
  }
}

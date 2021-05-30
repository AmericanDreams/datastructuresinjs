import * as Util from "../../../util/Util";

export default class AVLTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    this.root = this.insertNode(this.root, data);
    return data;
  }

  search(value) {
    return this.searchForNode(this.root, value);
  }

  remove(value) {
    if (this.isEmpty()) return undefined;

    // Checking if the root node is the node which we wanna remove

    if (this.root.value === value) {
      // Yes ! Troot node should be removed
      if (!this.root.right && !this.root.left) {
        // Root node does not have any children
        this.root = null;
      } else if (this.root.right && this.root.left) {
        // Root node has both children

        // Finding the successor
        let parentOfSuccessor = this.root;
        let parentSide = "right";
        let successor = this.root.right;
        while (successor.left) {
          parentSide = "left";
          parentOfSuccessor = successor;
          successor = successor.left;
        }
        const valueOfSuccessor = successor.value;

        // Swapping their values
        successor.value = this.root.value;
        this.root.value = valueOfSuccessor;

        // Now the value which we wanna remove is placed in the successor
        if (parentSide === "right") {
          parentOfSuccessor.right = successor.right;
        } else {
          parentOfSuccessor.left = successor.right;
        }
      } else if (this.root.right) {
        // Root has only right child
        this.root = this.root.right;
      } else {
        // Root has only left child
        this.root = this.root.left;
      }
      return value;
    }

    const result = [];
    this.removeNode(this.root, value, result);
    if (result.length > 0) {
      return result[0];
    }
    return undefined;
  }

  removeNode(node, value, result) {
    if (!node) return null; // Not found!

    if (value > node.value) {
      // Go to right subtree
      node.right = this.removeNode(node.right, value, result);
    } else if (value < node.value) {
      // Go to left subtree
      node.left = this.removeNode(node.left, value, result);
    } else {
      //value === node.value
      // The node is that which we wanna remove
      result.push(node.value);
      if (!node.right && !node.left) {
        // The node is the leaf
        return null;
      } else if (node.right && node.left) {
        // the node which we wanna remove has right and left children together

        // Finding the successor
        const successor = this.getSuccessorOf(node);
        const valueOfSuccessor = successor.value;

        // swap their values
        node.value = valueOfSuccessor;
        node.right = this.removeNode(node.right, valueOfSuccessor, []);
        // Now the value which we wanna remove is placed in the successor
      } else if (node.right) {
        // The node which we wanna remove has only right child
        // Just replace this node with its right node
        return node.right;
      } else {
        // The node which we wanna remove has only left child
        // Just replace this node with its left node
        return node.left;
      }
    }
    node.height =
      Math.max(this.getHeightOf(node.left), this.getHeightOf(node.right)) + 1;

    return this.fixBalancesDuringDeletion(node);
  }

  fixBalancesDuringDeletion(node) {
    const balance = this.getBalanceOf(node);

    if (balance > 1) {
      // Left heavy
      if (this.getBalanceOf(node.left) < -1) {
        // Left child is right heavy
        node.left = this.leftRotation(node.left);
      }
      return this.rightRotation(node);
    } else if (balance < -1) {
      // Right heavy
      if (this.getBalanceOf(node.right) > 1) {
        // Right child is left heavy
        node.right = this.rightRotation(node.right);
      }

      return this.leftRotation(node);
    } else {
      return node;
    }
  }

  fixBalances(node, value) {
    const balance = this.getBalanceOf(node);

    if (balance > 1 && value < node.left.value) {
      // Left heavy (left-left)
      return this.rightRotation(node);
    } else if (balance > 1 && value < node.left.value) {
      // Left heavy (left-right)
      node.left = this.leftRotation(node.left);
      return this.rightRotation(node);
    } else if (balance < -1 && value > node.right.value) {
      // Right heavy (right-right)
      return this.leftRotation(node);
    } else if (balance < -1 && value < node.right.value) {
      // Right heavy (right-left)
      node.right = this.rightRotation(node.right);
      return this.leftRotation(node);
    } else {
      return node;
    }
  }

  rightRotation(node) {
    Util.print("== RIGHT ROTATION HAPPENED ==");
    let leftOfRoot = node.left;
    let rightOfLeftOfRoot = leftOfRoot.right;

    node.left = rightOfLeftOfRoot;
    leftOfRoot.right = node;

    node.height =
      Math.max(this.getHeightOf(node.left), this.getHeightOf(node.right)) + 1;

    leftOfRoot.height =
      Math.max(
        this.getHeightOf(leftOfRoot.left),
        this.getHeightOf(leftOfRoot.right)
      ) + 1;

    return leftOfRoot;
  }

  leftRotation(node) {
    Util.print("== LEFT ROTATION HAPPENED ==");
    const leftOfRightOfRoot = node.right.left;
    const rightOfRoot = node.right;

    node.right = leftOfRightOfRoot;
    rightOfRoot.left = node;

    node.height =
      Math.max(this.getHeightOf(node.left), this.getHeightOf(node.right)) + 1;

    rightOfRoot.height =
      Math.max(
        this.getHeightOf(rightOfRoot.left),
        this.getHeightOf(rightOfRoot.right)
      ) + 1;

    return rightOfRoot;
  }

  searchForNode(node, value) {
    if (!node) return undefined; // Not Found!

    if (value === node.value) return node.value; // Found!

    // It  might be in the right subtree
    if (value >= node.value) return this.searchForNode(node.right, value);

    // It might be in the left subtree
    return this.searchForNode(node.left, value);
  }

  insertNode(node, data) {
    if (!node) return new Node(data);

    if (data >= node.value) {
      // it should go to right subtree
      node.right = this.insertNode(node.right, data);
    } else {
      // It should go to left subtree
      node.left = this.insertNode(node.left, data);
    }

    // Defining the height of the node
    node.height =
      Math.max(this.getHeightOf(node.left), this.getHeightOf(node.right)) + 1;

    return this.fixBalances(node, data);
  }
  getBalanceOf(node) {
    if (!node) return 0;

    return this.getHeightOf(node.left) - this.getHeightOf(node.right);
  }

  getHeightOf(node) {
    if (!node) return -1;
    return node.height;
  }

  traverse(type) {
    const result = [];
    switch (type) {
      case "in-order":
        this.inOrderTraverse(this.root, result);
        break;

      case "post-order":
        this.postOrderTraverse(this.root, result);
        break;

      case "pre-order":
        this.preOrderTraverse(this.root, result);
        break;

      default:
        this.inOrderTraverse(this.root, result);
        break;
    }

    Util.print(result);
  }

  inOrderTraverse(node, array) {
    if (node) {
      // First the left
      this.inOrderTraverse(node.left, array);

      // Second the root
      array.push(node.value);

      // Third the right
      this.inOrderTraverse(node.right, array);
    }
  }

  postOrderTraverse(node, array) {
    if (node) {
      // First the left
      this.inOrderTraverse(node.left, array);

      // Second the right
      this.inOrderTraverse(node.right, array);

      // Third the root
      array.push(node.value);
    }
  }

  preOrderTraverse(node, array) {
    if (node) {
      // Third the root
      array.push(node.value);

      // Second the left
      this.inOrderTraverse(node.left, array);

      // Third the right
      this.inOrderTraverse(node.right, array);
    }
  }

  getSuccessorOf(node) {
    let leftEst = node.right;
    while (leftEst.left) {
      leftEst = leftEst.left;
    }
    return leftEst;
  }

  isEmpty() {
    return this.root == null;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 0;
  }
}

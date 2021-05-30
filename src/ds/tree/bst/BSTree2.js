import * as Util from "../../../util/Util";

export class BSTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const node = new Node(data);
    if (this.isEmpty()) {
      // Insert as a root node
      this.root = node;
      return;
    }

    this.insertNode(this.root, node);
  }

  search(value) {
    return this.searchNode(this.root, data);
  }

  remove(value) {
    const result = this.removeNode(this.root, value);
    if (!result) return undefined;
    return result.value;
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

  removeNode(node, value) {
    if (!node) return undefined; // Not found in the tree

    if (node.value === value) {
      // Found!
      let tempNode = node;
      if (!node.right && !node.left) {
        // The node which we wanna remove is the leaf node
        // So we should just break this node from its parent and that is all
        if (node.parentSide === "right") {
          // So the node is the right child of its parent
          if (node.parent) {
            node.parent.right = null;
          } else {
            // The node is the root node
            this.root = null;
          }
        } else {
          // So the node is the left child of its parent
          if (node.parent) {
            node.parent.left = null;
          } else {
            // The node is the root node
            this.root = null;
          }
        }
      } else if (node.right && node.left) {
        // The node which we wanna remove has left and right children together

        // First getting the successor node of given node
        const successor = this.getSuccessorOf(node);

        // Swap their values
        const valueOfSuccessor = successor.value;
        successor.value = node.value;
        node.value = valueOfSuccessor;

        // Now the value which we wanna remove is placed in the successor
        if (successor.parentSide === "right") {
          successor.parent.right = successor.right;
        } else {
          successor.parent.left = successor.right;
        }
      } else if (node.right) {
        // It means the node which we wanna remove has only right child
        // So in this case we should just replace the node with its right child
        if (node.parentSide === "right") {
          // The node itself is the right child of its parent
          if (node.parent) {
            node.parent.right = node.right;
          } else {
            // The node is the root node
            this.root = node.right;
          }
        } else {
          // The node itself is the left child of its parent
          if (node.parent) {
            node.parent.left = node.right;
          } else {
            // The node is the root node
            this.root = node.right;
          }
        }
        node.right.parent = node.parent;
        node.right.parentSide = node.parentSide;
      } else if (node.left) {
        // It means the node which we wanna remove has only left child
        // So in this case we should just replace the node with its left child
        if (node.parentSide === "right") {
          // The node itself is the right child of its parent
          if (node.parent) {
            node.parent.right = node.left;
          } else {
            // The node is the root node
            this.root = node.left;
          }
        } else {
          // The node itself is the left child of its parent
          if (node.parent) {
            node.parent.left = node.left;
          } else {
            // The node is the root node
            this.root = node.left;
          }
        }
        node.left.parent = node.parent;
        node.left.parentSide = node.parentSide;
      }
      return tempNode;
    } else if (value >= node.value) {
      // It might be in the right subtree
      return this.removeNode(node.right, value);
    } else {
      // it might be in the left subtree
      return this.removeNode(node.left, value);
    }
  }

  getSuccessorOf(node) {
    let leftEst = node.right;
    while (leftEst.left) {
      leftEst = leftEst.left;
    }
    return leftEst;
  }

  searchNode(node, value) {
    if (!node) return undefined; // Not Found in the tree

    if (node.value === value) {
      // Found!
      return node.value;
    } else if (value >= node.value) {
      // It might be in the right side
      return this.searchNode(node.right, value);
    } else {
      // it might be in the left side
      return this.searchNode(node.left, value);
    }
  }

  insertNode(parent, node) {
    if (node.value >= parent.value) {
      if (parent.right) {
        // It hsould go to more right side
        this.insertNode(parent.right, node);
      } else {
        // it should be the right child
        node.parent = parent;
        node.parentSide = "right";
        parent.right = node;
      }
    } else {
      if (parent.left) {
        // it should go to more left side
        this.insertNode(parent.left, node);
      } else {
        // It should be the left side
        node.parent = parent;
        node.parentSide = "left";
        parent.left = node;
      }
    }
  }

  isEmpty() {
    return this.root == null;
  }
}

export class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.parentSide = null;
  }
}

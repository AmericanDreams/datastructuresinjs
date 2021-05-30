import * as Util from "../../../util/Util";

export default class BSTree {
  constructor() {
    this.root = undefined;
  }

  // Avarage O(log(N)) , the worst O(N)
  insert(data) {
    const node = new Node(data);
    if (this.isEmpty()) {
      // Insert as a root node
      this.root = node;
      return;
    }

    this.insertNode(this.root, node);
  }

  // Avarage O(log(N)) , the worst O(N)
  search(data) {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.searchNode(this.root, data);
  }

  // Avarage O(log(N)) , the worst O(N)
  delete(data) {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.deleteNode(null, this.root, data);
  }

  // Avarage O(log(N)) , the worst O(N)
  getMin() {
    if (this.isEmpty()) {
      return undefined;
    }

    // Lets find the leftest node in the thee
    let node = this.root;
    while (node.left) {
      node = node.left;
    }
    return node.value;
  }

  // Avarage O(log(N)) , the worst O(N)
  getMax() {
    if (this.isEmpty()) {
      return undefined;
    }

    // Lets find the rightest node in the thee
    let node = this.root;
    while (node.right) {
      node = node.right;
    }
    return node.value;
  }

  // O(N)
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

  deleteNode(parent, child, data) {
    if (!child) {
      return undefined;
    }

    if (child.value === data) {
      // Allright. This child node should be removed

      if (!child.right && !child.left) {
        // The node which we wanna remove is leaf node

        if (!parent) {
          // The node which we wanna remove is the root node
          this.root = undefined;
          return child.value;
        } else {
          // It is just a regular leaf node
          // So we should simple remove that node and that is all

          if (parent.right == child) {
            // The node which we wanna delete is the right child of its parent.
            // So easy! We should just remove right child of it parent
            parent.right = undefined;
            return child.value;
          } else {
            // parent.left == child
            // The node which we wanna delete is the left child of its parent.
            // So easy! We should just remove left child of it parent
            parent.left = undefined;
            return child.value;
          }
        }
      } else if (child.right && !child.left) {
        // The node which we wanna remove has only right child
        // In this case we should replace the node which we wanna delete with its right child

        if (!parent) {
          // The node which we wanna remove is the root node
          this.root = child.right;
          return child.value;
        } else {
          // The node is regular middle node

          if (parent.right == child) {
            // the node which we wanna delete is the right child of its parent
            // So replace its parent right child with its own right one
            parent.right = child.right;
            return child.value;
          } else {
            // the node which we wanna delete is the left child of its parent
            // So replace its parent left child with its own right one
            parent.left = child.right;
            return child.value;
          }
        }
      } else if (!child.right && child.left) {
        // The node which we wanna remove has only left child
        // In this case we should replace the node which we wanna delete with its left child

        if (!parent) {
          // The node which we wanna remove is the root node
          this.root = child.left;
          return child.value;
        } else {
          // The node is regular middle node

          if (parent.right == child) {
            // the node which we wanna delete is the right child of its parent
            // So replace its parent right child with its own left one
            parent.right = child.left;
            return child.value;
          } else {
            // the node which we wanna delete is the left child of its parent
            // So replace its parent left child with its own left one
            parent.left = child.left;
            return child.value;
          }
        }
      } else {
        // This is the case which node which we wanna delete has left and right children together
        // This is the case our ass get fucked :)

        // Let's find the smallest (leftest) node int the right subtree
        let parentOfSmallest = child;
        let smallest = child.right;

        while (smallest.left) {
          parentOfSmallest = smallest;
          smallest = smallest.left;
        }

        // Let's swap the values of the nodes
        const tempValue = child.value;
        child.value = smallest.value;
        smallest.value = tempValue;

        // Swapped! So right now we are sure that the node which we wanna remove is the child node of parentOfSmallest and
        // that node might have only right child which is easy case for us removing
        if (parentOfSmallest.left.value === smallest.value) {
          // So it is left child just remove the left child
          parentOfSmallest.left = smallest.right;
        } else {
          // So it is right child just remove the right child
          parentOfSmallest.right = smallest.right;
        }
        return tempValue;
      }
    } else if (data > child.value) {
      // Let's look for in the right side
      return this.deleteNode(child, child.right, data);
    } else {
      // data < child.value
      // Let's look for in the left side
      return this.deleteNode(child, child.left, data);
    }
  }

  searchNode(node, data) {
    if (node) {
      if (node.value === data) {
        // Found!
        return node.value;
      } else if (data > node.value) {
        // Hmm.. It might be in the right side
        return this.searchNode(node.right, data);
      } else {
        // data < node.value
        // Hmm.. It might be in the left side
        return this.searchNode(node.left, data);
      }
    } else {
      // Data does not exist inside the Tree
      return undefined;
    }
  }

  insertNode(parent, newNode) {
    if (newNode.value >= parent.value) {
      // it should be inserted to right side
      if (!parent.right) {
        // Great! Just insert as a right child
        parent.right = newNode;
        return;
      } else {
        // What a pitty :( So, let's look for avaliable place in the right subtree of the parent
        this.insertNode(parent.right, newNode);
      }
    } else {
      // it should be inserted to left side
      if (!parent.left) {
        // Great! Just insert as a left child
        parent.left = newNode;
        return;
      } else {
        // What a pitty :( So, let's look for avaliable place in the left subtree of the parent
        this.insertNode(parent.left, newNode);
      }
    }
  }

  isEmpty() {
    return this.root == undefined;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.right = undefined;
    this.left = undefined;
  }
}

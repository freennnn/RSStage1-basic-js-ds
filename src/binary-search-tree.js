const { NotImplementedError } = require('../extensions/index.js');

 const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  root() {
    console.log("root() message");
    console.log(this.rootNode);
    return this.rootNode;
  }

  add(data) {
    if (!this.rootNode) {
      this.rootNode = new Node(data);
    } else {
      this.addToNode(data, this.rootNode);
    }
    // remove line with error and write your code here
  }

  addToNode(data, node) {
    if (data < node.data) {
      if (node.left) {
        this.addToNode(data, node.left);
      } else {
        node.left = new Node(data);
      }
    } else if (data > node.data) {
      if (node.right) {
        this.addToNode(data, node.right);
      } else {
        node.right = new Node(data)
      }
    }
  }


  has(data) {
    return this.hasNode(this.rootNode, data);

  }

  hasNode(node, data) {
    if (!node) {
      return false;
    }
    if (node.data === data) {
      return true;
    } else if (node.left && node.data > data) {
      return this.hasNode(node.left, data);
    } else if (node.right && node.data < data) {
      return this.hasNode(node.right, data);
    } else {
      return false;
    }
  }

  find(data) {
    return this.findNode(this.rootNode, data);
  }

  findNode(node, data) {
    if (node.data === data) {
      return node;
    } else if (node.left && node.data > data) {
      return this.findNode(node.left, data);
    } else if (node.right && node.data < data) {
      return this.findNode(node.right, data);
    } else {
      return null;
    }
  }

  findParent(targetNode) {
    return this.findParentNode(this.rootNode, null, targetNode);
    // if (this.rootNode.data === targetNode.data) {
    //   return null;
    // } else if (targetNode.data < this.rootNode.data && this.rootNode.left) {
    //   return this.findParentNode(this.rootNode.left, this.rootNode, targetNode);
    // } else if (targetNode.data > this.rootNode.data && this.rootNode.right) {
    //   return this.findParentNodeNode(thor.rootNode.right, this.rootNode, targetNode);
    // } else {
    //   return null;
    // }
  }

  findParentNode(currentNode, previousNode, targetNode) {
    if (currentNode.data === targetNode.data) {
      return previousNode;
    } else if (targetNode.data < currentNode.data && currentNode.left) {
      return this.findParentNode(currentNode.left, currentNode, targetNode);
    } else if (targetNode.data > currentNode.data && currentNode.right) {
      return this.findParentNode(currentNode.right, currentNode, targetNode);
    } else {
      return null;
    }

  }

  nodeIsLeftChild(parentNode, node) {
    if (parentNode.left && parentNode.left.data === node.data) {
      return true;
    } else {
      return false;
    }
  }

  findSuccessorNode(node) {
    //we know for sure node.right exist - cause that's the reason why are we looking for successor node by definition
    if (node.right.left) {
      return this.mostLeftDescendant(node)
    } else {
      return node.right;
    }
  }

  mostLeftDescendant(node) {
    if (node.left) {
      return this.mostLeftDescendant(node.left);
    } else {
      return node;
    }
  }

  swap(nodeToRemove, newNode) {
    let parentNode = this.findParent(nodeToRemove);
    newNode.left = nodeToRemove.left;
    newNode.right = nodeToRemove.right;
    if (parentNode) {
      if (this.nodeIsLeftChild(parentNode, nodeToRemove)) {
        parentNode.left = newNode;
      } else {
        parentNode.right = newNode;
      }
    }

  }

  remove( data ) {
    //1) find node
    //2) if no childred - remove the node
    //3) if only one child - replace node with it's only child
    //4) if 2 kids - find successor node (smallest ones from bigger nodes: one step right and all left from there)
    //4) a) if successor has right child (can't be more left - by definition) - that right child is going one step up
    //      effectively replacing the successor node; and successor node replace the node being removed
    //   b) if successor has no children (aka right child) = successor node replace the node being removed
    
    let nodeToRemove = this.find(data);
    let parentNode = this.findParent(nodeToRemove);
    if (!nodeToRemove.left || !nodeToRemove.right) {   //not 2 children 
      if (nodeToRemove.left) { //only left child => nodeToRemove exchanged with that left child by replacing reference in parrent
        if (this.nodeIsLeftChild(parentNode, nodeToRemove)) {
          parentNode.left = nodeToRemove.left;
        } else {
          parentNode.right = nodeToRemove.left;
        }
      } else if (nodeToRemove.right) { //only right child => nodeToRemove exchanged with that right child by replacing reference in parrent
        if (this.nodeIsLeftChild(parentNode, nodeToRemove)) {
          parentNode.left = nodeToRemove.right;
        } else {
          parentNode.right = nodeToRemove.right;
        }
      } else { //no children at all
        if (this.nodeIsLeftChild(parentNode, nodeToRemove)) {
          parentNode.left = null;
        } else {
          parentNode.right = null;
        }
        // if (parentNode.left.data == nodeToRemove.data) {
        //   parentNode.left = null;
        // } else if (parentNode.right.data === nodeToRemove.data) {
        //   parentNode.right = null;
        // }
      }
      
    } else  { // 2 children
      let successorNode = this.findSuccessorNode(nodeToRemove);
      if (successorNode.right) {
        let parentNode = this.findParent(successorNode);
        parentNode.left = successorNode.right;
      }
      this.swap(nodeToRemove,successorNode);
      
    }
  
  }

  min() {
    return this.minNode(this.rootNode);
  }

  minNode(node) {
    if (node.left) {
      return this.minNode(node.left);
    } else {
      return node.data;
    }
  }

  max() {
    return this.maxNode(this.rootNode);
  }

  maxNode(node) {
    if (node.right) {
      return this.maxNode(node.right);
    } else {
      return node.data;
    }
  }


}

const tree = new BinarySearchTree();
tree.add(9);
tree.add(14);
tree.add(54);
tree.add(2);
tree.add(6);
tree.add(8);
tree.add(31);
tree.add(1);
console.log(tree);
console.log(tree.has(54));
// assert.strictEqual(tree.has(8), true);
// assert.strictEqual(tree.has(7), false);
// assert.strictEqual(tree.has(4), false);


module.exports = {
  BinarySearchTree
};
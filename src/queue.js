const { NotImplementedError } = require('../extensions/index.js');

 const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {

  getUnderlyingList() {
    return this.root;
  }

  enqueue(value) {
    let listNode = new ListNode(value);
    if (this.root) {
      let lastNode = this.root;
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
      lastNode.next = listNode;
    } else {
      this.root = listNode;
    }
    return listNode;
  }

  dequeue() {
    let dequeuedNode = this.root;
    this.root = this.root.next;
    return dequeuedNode.value;
  }
}

module.exports = {
  Queue
};

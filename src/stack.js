const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
class Stack {
  constructor () {
    this.internalArray = new Array();
  }

  push(element) {
    this.internalArray.push(element);
  }

  pop() {
    return this.internalArray.pop();
  }

  peek() {
    if (this.internalArray.length > 0) {
      return this.internalArray[this.internalArray.length -1];
    } else {
      return null;
    }
  }
}

let stack = new Stack();
stack.push(5);
stack.push(6);
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.peek());


module.exports = {
  Stack
};

import * as Util from "./util/Util";

import Stack from "./ds/stack/implwithlinkedlist/Stack";
import Queue from "./ds/queue/implwithsinglelinkedlist/Queue";

// const stack = new Stack();
// stack.push(1);
// stack.push(2);
// stack.push(3);
// stack.push(4);

// stack.print();

// Util.print("peek => " + stack.peek());
// Util.print("pop => " + stack.pop());
// Util.print("pop => " + stack.pop());

// stack.print();

// Util.print("pop => " + stack.pop());
// Util.print("pop => " + stack.pop());
// Util.print("pop => " + stack.pop());

// stack.print();

const queue = new Queue();
queue.enQueue(1);
queue.enQueue(2);
queue.enQueue(3);
queue.enQueue(4);

queue.print();

Util.print("peek() => " + queue.peek());
Util.print("size = " + queue.size());

Util.print("deQueue() => " + queue.deQueue());
Util.print("deQueue() => " + queue.deQueue());

queue.print();

Util.print("enQueue(5)");
queue.enQueue(5);

queue.print();

Util.print("enQueue(6)");
queue.enQueue(6);

queue.print();

class LinkedList {
    constructor() {
        this.head = null,
        this.tail = null,
        this.size = 0
    }
    append(value) {
        const newNode = new Node(value, null)
        if (this.size === 0) {
            this.head = newNode
        } else {
            this.tail.nextNode = newNode
        }

        this.tail = newNode
        this.size++
    }   
    prepend(value) {
        const newNode = new Node(value, this.head)
        if (this.size === 0) {
            this.tail = newNode
        }

        this.head = newNode
        this.size++
    }
    at(index) {
        if (index < 0 || index >= this.size) {
            return -1
        }

        let readPointer = this.head
        let readIndex = 0
        while (readIndex < index) {
            readPointer = readPointer.nextNode
            readIndex++
        }
        return readPointer
    }
    pop() {
        if (this.size === 0) {
            return null
        } else if (this.size === 1) {
            const removedNode = this.tail
            this.head = null
            this.tail = null
            
            this.size--
            return removedNode
        }

        let lastNode = this.head
        let previousNode = null
        while (lastNode.nextNode) {
            previousNode = lastNode
            lastNode = lastNode.nextNode
        }
        this.tail = previousNode
        this.tail.nextNode = null

        this.size--
        return lastNode
    }
    contains(value) {
        let readPointer = this.head
        while (readPointer) {
            if (readPointer.value === value) {
                return true
            }
            readPointer = readPointer.nextNode
        }
        return false
    }
    find(value) {
        let readPointer = this.head
        let index = 0
        while (readPointer) {
            if (readPointer.value === value) {
                return index
            }
            readPointer = readPointer.nextNode
            index++
        }
        return -1
    }
    toString() {
        let readPointer = this.head
        let nodeStr = ''
        while (readPointer) {
            nodeStr +=`${readPointer.value} -> `
            readPointer = readPointer.nextNode
        }
        nodeStr += 'null'

        return nodeStr
    }
    insertAt(value, index) {
        if (index < 0 || index > this.size) {
            return null
        } else if (index === 0) {
            return this.prepend(value)
        } else if (index === this.size) {
            return this.append(value)
        }

        let nodeBeforeIndex = this.at(index - 1)
        const newNode = new Node(value, nodeBeforeIndex.nextNode)
        nodeBeforeIndex.nextNode = newNode

        this.size++
    }
    removeAt(index) {
        if (index < 0 || index >= this.size) {
            return null
        } else if (index === this.size - 1) {
            return this.pop()
        }

        let nodeBeforeIndex = this.at(index - 1)
        const removedNode = nodeBeforeIndex.nextNode
        nodeBeforeIndex.nextNode = removedNode.nextNode

        this.size--
        return removedNode
    }
}

class Node {
    constructor(value, nextNode) {
        this.value = value,
        this.nextNode = nextNode
    }
}

const ll = new LinkedList();

ll.append(10);
ll.append(20);
ll.append(30);
console.log(ll.toString()); // Expected output: "10 -> 20 -> 30 -> null"

ll.prepend(5);
ll.prepend(2);
console.log(ll.toString()); // Expected output: "2 -> 5 -> 10 -> 20 -> 30 -> null"

console.log(ll.at(2).value); // Expected output: 10

ll.pop();
console.log(ll.toString()); // Expected output: "2 -> 5 -> 10 -> 20 -> null"

console.log(ll.contains(10)); // Expected output: true
console.log(ll.contains(25)); // Expected output: false

console.log(ll.find(5)); // Expected output: 1
console.log(ll.find(20)); // Expected output: 3
console.log(ll.find(25)); // Expected output: -1

ll.insertAt(15, 3);
console.log(ll.toString()); // Expected output: "2 -> 5 -> 10 -> 15 -> 20 -> null"

ll.removeAt(2);
console.log(ll.toString()); // Expected output: "2 -> 5 -> 15 -> 20 -> null"
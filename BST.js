class BTSFromSorted {
    constructor(array) {
        this.root = this._buildTree(array)
    }
    _buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) {
            return null
        }

        let middleIndex = Math.floor((start + end) / 2)
        let root = new Node(array[middleIndex])
        root.left = this._buildTree(array, start, middleIndex - 1)
        root.right = this._buildTree(array, middleIndex + 1, end)

        return root
    }
    print(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return
        }
        if (node.right !== null) {
          this.print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`)
        if (node.left !== null) {
          this.print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
        }
    }
    insert(value) {
        this.root = insertNode(this.root, value)
    }
    delete(value) {
        this.root = deleteNode(this.root, value)
    }
    find(value) {
        let readP = this.root
        while (readP) {
            if (readP.value === value) {
                return readP
            } else if (readP.value > value) {
                readP = readP.left
            } else {
                readP = readP.right
            }
        }
        return null
    }
    levelOrder(fn) {
        return levelOrderTraverse(this.root, fn)
    }
    levelOrderRec(fn) {
        return levelOrderTraverseRec(this.root, fn)
    }
    inorder() {
    }
    preorder() {
    }
    postorder() {

    }
    height() {
        return calculateHeight(this.root)
    }
    depth(node) {
        return calculateDepth(this.root, node)
    }
    isBalanced() {
        return checkBalanced(this.root)
    }
    rebalance() {

    }
}

class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

function insertNode(root, value) {
    if (root === null) {
        return new Node(value)
    }

    if (value < root.value) {
        root.left = insertNode(root.left, value)
    } else if (value > root.value) {
        root.right = insertNode(root.right, value)
    }
    return root
}
function deleteNode(root, value) {
    if (root === null) {
        return root
    }
    if (value < root.value) {
        root.left = deleteNode(root.left, value)
        return root
    } else if (value > root.value) {
        root.right = deleteNode(root.right, value)
        return root
    }
    
    if (root.left === null) {
        let tempP = root.right
        delete root
        return tempP
      } else if (root.right === null) {
        let tempP = root.left
        delete root
        return tempP
    } else {
        let successorParent = root
        let successor = root.right
        while (successor.left !== null) {
            successorParent = successor
            successor = successor.left
        }

        if (successorParent !== root) {
            successorParent.left = successor.right
        } else {
            successorParent.right = successor.right
        }

        root.value = successor.value
        delete successor
        return root
    }
}
function levelOrderTraverse(root, fn) {
    const queue = []
    if (root) {
        queue.push(root)
    }
    while (queue.length) {
        const currentNode = queue.shift()
        fn(currentNode)
        if (currentNode.left) {
            queue.push(currentNode.left)
        }
        if (currentNode.right) {
            queue.push(currentNode.right)
        }
    }
}
function levelOrderTraverseRec(root, fn) {
    if (root === null) {
        return
    }

    fn(root)
    if (root.left) {
        fn(root.left)
    }
    if (root.right) {
        fn(root.right)
    }
    levelOrderTraverseRec(root.left, fn)
    levelOrderTraverseRec(root.right, fn)
}

function calculateHeight(root, maxHeight = -1) {
    if (root === null) {
        return maxHeight
    }

    if (maxHeight < 0) {
        maxHeight = 0
    }
    return Math.max(calculateHeight(root.left, maxHeight), calculateHeight(root.right, maxHeight)) + 1;
}
function calculateDepth(root, node, depth = -1) {
    if (root === null) {
        return -1
    }

    if (depth < 0) {
        depth = 0
    }
    depth++

    if (root === node) {
        return depth
    }

    const leftDepth = calculateDepth(root.left, node, depth)
    if (leftDepth !== -1) {
        return leftDepth
    }
    const rightDepth = calculateDepth(root.right, node, depth)
    return rightDepth
}
function checkBalanced(root) {
    return Math.abs(calculateHeight(root.left) - calculateHeight(root.right)) <= 1 && 
            checkBalanced(root.left) && 
            checkBalanced(root.right)
}

const array = []
const BTS = new BTSFromSorted(array)
BTS.print()
BTS.insert(10)
BTS.insert(5)
BTS.insert(3)
BTS.print()
console.log(BTS.height())
console.log(BTS.depth(BTS.find(3)))
console.log(BTS.isBalanced())

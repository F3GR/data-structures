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
    inorder(fn) {
        return inOrderTraverse(this.root, fn)
    }
    preorder(fn) {
        return preOrderTraverse(this.root, fn)
    }
    postorder(fn) {
        return postOrderTraverse(this.root, fn)
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
        const arr = this.inorder()
        this.root = this._buildTree(arr)
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
function inOrderTraverse(root, fn) {
    const arr = []
    if (!fn) {
        fn = (node) => arr.push(node.value)
    }

    function traverse(node) {
        if (node === null) {
            return
        }

        traverse(node.left)
        fn(node)
        traverse(node.right)
    }
    traverse(root)
    if (arr.length) {
        return arr
    }
}
function preOrderTraverse(root, fn) {
    const arr = []
    if (!fn) {
        fn = (node) => arr.push(node.value)
    }

    function traverse(node) {
        if (node === null) {
            return
        }

        fn(node)
        traverse(node.left)
        traverse(node.right)
    }
    traverse(root)
    if (arr.length) {
        return arr
    }
}
function postOrderTraverse(root, fn) {
    const arr = []
    if (!fn) {
        fn = (node) => arr.push(node.value)
    }

    function traverse(node) {
        if (node === null) {
            return
        }

        traverse(node.left)
        traverse(node.right)
        fn(node)
    }
    traverse(root)
    if (arr.length) {
        return arr
    }
}
function calculateHeight(root) {
    if (root === null) {
        return -1
    }

    const leftHeight = calculateHeight(root.left)
    const rightHeight = calculateHeight(root.right)
    return Math.max(leftHeight, rightHeight) + 1
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
    if (root === null) {
        return true
    }
    return Math.abs(calculateHeight(root.left) - calculateHeight(root.right)) <= 1 && 
            checkBalanced(root.left) && 
            checkBalanced(root.right)
}

const array = []
for (let i = 0; i < 10; i++) {
    array.push(Math.floor(Math.random() * 100))
}
array.sort((a, b) => a - b)
const BTS = new BTSFromSorted(array)
BTS.print()
console.log(BTS.isBalanced())
console.log('Inorder before pushing items > 100')
BTS.inorder(((node) => console.log(node.value)))
console.log('Preorder before pushing items > 100')
BTS.preorder(((node) => console.log(node.value)))
console.log('Postorder before pushing items > 100')
BTS.postorder(((node) => console.log(node.value)))
BTS.insert(150)
BTS.insert(160)
BTS.insert(200)
BTS.print()
console.log(BTS.isBalanced())
BTS.rebalance()
console.log(BTS.isBalanced())
BTS.print()
console.log('Inorder after pushing items > 100')
BTS.inorder(((node) => console.log(node.value)))
console.log('Preorder after pushing items > 100')
BTS.preorder(((node) => console.log(node.value)))
console.log('Postorder after pushing items > 100')
BTS.postorder(((node) => console.log(node.value)))
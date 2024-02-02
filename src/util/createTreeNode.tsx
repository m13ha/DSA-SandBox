import { v4 as uuidv4 } from 'uuid';

class TreeNode {
  posX: number;
  posY: number;
  height: number;
  width: number;
  value: number;
  id: string;
  id2: string;
  left: TreeNode | null;
  right: TreeNode | null;
  ref: any;

  constructor(posX: number, posY: number, value: number) {
    this.posX = posX;
    this.posY = posY;
    this.height = 40;
    this.width = 40;
    this.value = value;
    this.id = uuidv4();
    this.id2 = uuidv4();
    this.left = null;
    this.right = null;
    this.ref = null;
  }
}

class TreeBST {
  root: TreeNode | null;
  size: number;

  constructor() {
    this.root = null;
    this.size = 500; // Initial size
  }

  addNode(value: number) {
    if (!this.root) {
      this.root = new TreeNode(window.innerWidth, 100, value);
    } else {
      this.addNodeRecursive(this.root, value, 1);
    }
  }

  addNodeRecursive(node: TreeNode, value: number, depth: number) {
    if (value < node.value) {
      if (node.left) {
        this.addNodeRecursive(node.left, value, depth + 1);
      } else {
        const newPosX = node.posX - (this.size / Math.pow(2, depth));
        const newPosY = node.posY + 100;
        node.left = new TreeNode(newPosX, newPosY, value);
      }
    } else if (value > node.value) {
      if (node.right) {
        this.addNodeRecursive(node.right, value, depth + 1);
      } else {
        const newPosX = node.posX + (this.size / Math.pow(2, depth));
        const newPosY = node.posY + 100;
        node.right = new TreeNode(newPosX, newPosY, value);
      }
    }
  }



  deleteNode(value: number) {
    if (!this.root) {
      // do nothing
    } else {
      this.root = this.deleteNodeRecursive(value, this.root);
    }
  }

  deleteNodeRecursive(value: number, node: TreeNode | null): TreeNode | null {
    if (!node) {
      return null;
    }

    if (value > node.value) {
      node.right = this.deleteNodeRecursive(value, node.right);
    } else if (value < node.value) {
      node.left = this.deleteNodeRecursive(value, node.left);
    } else {
      if (!node.left) {
        if (node.right) { node.right.posX = node.posX; node.right.posY = node.posY }
        return node.right;
      } else if (!node.right) {
        if (node.left) { node.left.posX = node.posX; node.left.posY = node.posY }
        return node.left;
      } else {
        let cur = node.right;
        while (cur.left) {
          cur = cur.left;
        }

        node.value = cur.value;
        node.right = this.deleteNodeRecursive(cur.value, node.right);
      }
      this.highlight(node, false)
    }
    return node;
  }

  searchNode(value: number) {
    if (!this.root) {
      // do nothing
    } else {
      return this.searchNodeRecursive(value, this.root);
    }
  }

  searchNodeRecursive(value: number, node: TreeNode) {
    this.highlight(node, false)
    if (node.value === value) {
      this.highlight(node, "green");
      return false
    } else if (node.left && node.value > value) { this.searchNodeRecursive(value, node.left) }
    else if (node.right && node.value < value) { this.searchNodeRecursive(value, node.right) }
    else return false
  }

  highlight(node: TreeNode, color: any) {
    node.ref.to({
      stroke: color ? color : "black",
      strokeWidth: color ? 10 : 1,
      duration: 1,
    })
  }

}


export { TreeBST, TreeNode };

import { v4 as uuidv4 } from 'uuid';

class GraphNode {
    posX: number;
    posY: number;
    height: number;
    width: number;
    value: string;
    id: string;
    id2: string;
    children: Array<string>;
    parent: Array<string>;
    ref: any;

    constructor(posX: number, posY: number, value: string) {
        this.posX = posX;
        this.posY = posY;
        this.height = 50;
        this.width = 50;
        this.value = value;
        this.id = uuidv4();
        this.id2 = uuidv4();
        this.children = [];
        this.parent = [];
        this.ref = null;
    }
}

class Vertice {
    posX1: number;
    posY1: number;
    posX2: number;
    posY2: number;
    id: string;
    ref: any;

    constructor(posX1: number, posY1: number, posX2: number, posY2: number) {
        this.posX1 = posX1;
        this.posY1 = posY1;
        this.posX2 = posX2;
        this.posY2 = posY2;
        this.id = uuidv4();
        this.ref = null;
    }
}

class Graph {
    nodes: Map<string, GraphNode>;
    edge: Map<string, Vertice>;
    size: number;
    axis: Array<number>
    links: number

    constructor() {
        this.nodes = new Map();
        this.edge = new Map(); // Initial size
        this.size = 0;
        this.axis = [window.innerWidth / 2, (window.innerHeight / 2)]
        this.links = 0;
    }

    addNode(value: string) {
        this.nodes.set(value, new GraphNode(this.axis[0], this.axis[1], value));
        this.size++;
        this.updateNextPos()
    }

    updateNextPos() {
        const radius = 10;
        const angleIncrement = Math.PI / 4; // Adjust the angle increment as needed
        const spiralStep = 5; // Adjust the step between spiral layers

        // Calculate the new position based on the size
        const spiralX = radius * this.size * Math.cos(angleIncrement * this.size);
        const spiralY = radius * this.size * Math.sin(angleIncrement * this.size);

        // Add a spiral effect by adjusting the position based on the size
        const spiralEffectX = spiralStep * this.size * Math.cos(angleIncrement * this.size);
        const spiralEffectY = spiralStep * this.size * Math.sin(angleIncrement * this.size);

        // Update the axis values
        this.axis[0] = this.axis[0] + spiralX + spiralEffectX;
        this.axis[1] = this.axis[1] + spiralY + spiralEffectY;
    }



    deleteNode(value: number) {
    }

    highlight(node: GraphNode, color: string) {
        node.ref.to({
            stroke: color ? color : "black",
            strokeWidth: color ? 10 : 1,
            duration: 1,
        })
    }


}


export { Graph, GraphNode, Vertice };
